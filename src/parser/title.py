import argparse
from bs4 import BeautifulSoup  # type: ignore
import requests  # type: ignore
import json
from datetime import datetime
import logging
import sys
from pathlib import Path
import time
import re
import mysql.connector  # type: ignore
from db import DB_test as DB
from notificator import send_notification


arg_parser = argparse.ArgumentParser(description='Get title via URL')
arg_parser.add_argument('-u', type=str, default=1, help='Title URL')
args = arg_parser.parse_args()


current_date = datetime.now().date()
stdout_handler = logging.StreamHandler(stream=sys.stdout)
file_handler = logging.FileHandler(
   filename=f"./logs/service_{current_date.isoformat()}.log"
)

handlers = [file_handler, stdout_handler]

logging.basicConfig(
    format="[%(asctime)s] [%(levelname)s] Title parser: %(message)s",
    level=logging.INFO,
    handlers=handlers
)

timeout = 5


class NoMatchesFound(Exception):
    pass


def get_title(concept: object):
    logging.info(f"Trying to get title '{concept['title_name']}'")
    res = {}
    try:
        title_response = requests.get(concept['title_url'])
        title_soup = BeautifulSoup(title_response.text, 'lxml')

        hero_node = title_soup.find('img', attrs={'data-qa':
                                    'gameBackgroundImage#heroImage#preview'})

        title_add_data = {
            'type': 'title',
            'cover_url': concept['title_cover'],
            'background_url': get_background(hero_node)
        }
        title = get_data_from_page(
            concept, concept["title_url"], title_add_data)

        logging.info("Trying to get dlc")
        dlc_list = []
        dlc = []
        dlc_node = title_soup.find('ul', attrs={'data-qa': 'add-ons'})
        if dlc_node:
            for i in dlc_node.find_all('li'):
                dlc_cover = i.find('img', class_='psw-l-fit-cover')
                item = {
                    'type': 'dlc',
                    'url': i.find('a')['href'],
                    'cover_url': clean_image_url(dlc_cover['src'])
                }
                dlc_list.append(item)

        for d in dlc_list:
            item = get_data_from_page(concept, d['url'], d)
            dlc.append(item)

        logging.info("Trying to get editions")
        editions_list = []
        editions = []
        editions_node = title_soup.find('div', attrs={'data-qa': 'mfeUpsell'})
        if editions_node:
            for ed in editions_node.find_all('article'):
                tmd = get_telemetry_meta_data(ed)
                product_id = tmd.get('productId', None)
                bg_node = 'img[data-qa^="gameBackgroundImage#heroImage#image"]'

                if product_id:
                    content = ''
                    content_node = ed.find('ul', class_='psw-t-list')
                    for c in content_node.find_all('li'):
                        content += f"{c.text};"
                    content.replace(';;', ';')
                    if content == '':
                        content = None

                    item = {
                        'type': 'edition',
                        'url': f"https://store.playstation.com/en-tr/product/"
                                f"{product_id}",
                        'cover_url':
                            get_cover(ed.select(
                                    'img[data-qa^="mfeUpsell#productEdition"]'
                                    )),
                        'background_url': get_background(ed.select(bg_node)),
                        'content': content
                    }
                    editions_list.append(item)

        for e in editions_list:
            item = get_data_from_page(concept, e['url'], e)
            editions.append(item)

        res = {
            'concept': concept,
            'title': title,
            'dlc': dlc,
            'editions': editions
        }

        return res
    except Exception:
        logging.error("Error title parsing", exc_info=True)
        send_notification("[ERROR] Error title parsing")


def get_data_from_page(concept: object, url: str, add_data: object):
    logging.info(f"Request to {url}")
    logging.info(f"Waiting timeout {timeout} seconds")
    time.sleep(timeout)
    res = {}
    try:
        page_response = requests.get(url)
        soup = BeautifulSoup(page_response.text, 'lxml')

        general_info = get_general_info(soup)
        background = get_background(
            soup.find('img', attrs={'data-qa':
                                    'gameBackgroundImage#heroImage#preview'}))
        telemetry_meta_data = get_telemetry_meta_data(soup.find(
                'div', class_='pdp-cta'))
        rating = get_rating(soup.find(
            'div', class_='pdp-star-rating'))
        description = get_description(soup.find(
            'p', attrs={'data-qa': 'mfe-game-overview#description'}))
        game_info = get_game_info(soup.find(
            'div', attrs={'data-qa': 'gameInfo'}))

        sale_details = get_sale_datails(telemetry_meta_data)
        legal = get_legal(soup.find('div',
                                    attrs={'data-qa': 'mfe-legal-text#text'}))

        res = {
            'url': f"https://store.playstation.com/en-tr/product/"
            f"{telemetry_meta_data.get('productId', None)}",
            'cover_url': add_data['cover_url'],
            'background_url': background,
            'general_info': general_info,
            'rating': rating,
            'description': description,
            'game_info': game_info,
            'content': add_data.get('content', None),
            'sale_details': sale_details,
            'legal': legal,
        }

        logging.info(f"Page {url} done")
    except Exception:
        logging.error("Error {type} parsing", exc_info=True)
        send_notification(
            f"[ERROR] Error {type} parsing")
    return res


def get_general_info(general_node: str):
    logging.info("Trying to get general info")
    res = {}
    if general_node:
        try:
            title_node = general_node.find(
                'h1', attrs={'data-qa': 'mfe-game-title#name'})
            title_id = general_node.find(
                'button', attrs={'data-qa': 'wishlistToggle'})

            res = {
                'title_id': json.loads(
                    title_id['data-telemetry-meta'])['productId']
                if title_id else None,
                'title': title_node.text if title_node else None
            }

            logging.info('General info done')
        except Exception:
            logging.error('Error getting general info', exc_info=True)
            send_notification('[ERROR] Error getting general info')
    else:
        logging.warning('General info node not found')
    return res


def get_telemetry_meta_data(item_node: str):
    logging.info("Trying to get meta data")
    res = {}
    if item_node:
        try:
            buy_node = item_node.find_all('button')

            if buy_node:
                res = json.loads(buy_node[0]['data-telemetry-meta'])

            logging.info('Meta data done')
        except Exception:
            logging.error('Error getting meta data', exc_info=True)
            send_notification('[ERROR] Error getting meta data')
    else:
        logging.warning("Telemetry data node not found")
    return res


def get_cover(cover_node: str, type: int = 1):
    logging.info("Trying to get cover")
    res = None
    try:
        res = cover_node[type].get('src') if cover_node else None

        logging.info('Cover done')
    except Exception:
        logging.error('Error getting cover', exc_info=True)
        send_notification('[ERROR] Error getting cover')
    return res


def get_background(background_node: str):
    logging.info("Trying to get cover")
    res = None
    try:
        if (background_node):
            res = clean_image_url(background_node.get('src'))

        logging.info('Background done')
    except Exception:
        logging.error('Error getting background', exc_info=True)
        send_notification('[ERROR] Error getting background')
    return res


def get_rating(rating_node: str):
    logging.info("Trying to get rating")
    res = {}
    if rating_node:
        try:
            global_rating = rating_node.find(
                'span',
                attrs={'data-qa':
                       'mfe-star-rating#overall-rating#average-rating'})
            users_count = rating_node.find(
                'span',
                attrs={'data-qa':
                       'mfe-star-rating#overall-rating#total-ratings'})

            if users_count and users_count.text == 'No ratings':
                users_count = 0

            res = {
                'global': float(global_rating.text) if global_rating else None,
                'users_count': int("".join(filter(
                    str.isdigit, users_count.text))) if users_count else None
            }

            logging.info("Rating done")
        except Exception:
            logging.error('Error getting rating', exc_info=True)
            send_notification('[ERROR] Error getting rating')
    else:
        logging.info('Rating node not found')
    return res


def get_description(description_node: str):
    logging.info("Trying to get description")
    res = None
    if description_node:
        try:
            res = description_node.text

            logging.info("Description done")
        except Exception:
            logging.error('Error getting description', exc_info=True)
            send_notification('[ERROR] Error getting description')
    else:
        logging.warning('Description node not found')
    return res


def get_game_info(game_info_node: str):
    logging.info("Trying to get game info")
    res = {}
    if game_info_node:
        try:
            release_platforms = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#platform-value'})
            release_date = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#releaseDate-value'})
            publisher = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#publisher-value'})
            genres = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#genre-value'})
            voice = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#voice-value'})
            screen_languages = game_info_node.find(
                'dd', attrs={'data-qa':
                             'gameInfo#releaseInformation#subtitles-value'})

            res = {
                'release_platforms':
                    release_platforms.text if release_platforms else None,
                'release_date':
                    convert_date(release_date.text) if release_date else None,
                'publisher': publisher.text if publisher else None,
                'genres': genres.text if genres else None,
                'voice': voice.text if voice else None,
                'screen_languages':
                    screen_languages.text if screen_languages else None
            }

            logging.info("Game info done")
        except Exception:
            logging.error('Error getting game info', exc_info=True)
            send_notification('[ERROR] Error getting game info')
    else:
        logging.warning('Game info node not found')
    return res


def get_sale_datails(tmd: object):
    logging.info("Trying to get sale datails")
    res = {}
    if tmd:
        try:
            price_details = tmd['productDetail'][0]['productPriceDetail']

            offer_none = {}
            ea_access = {}
            ps_plus = {}
            ubisoft_plus = {}
            gta_plus = {}

            has_offer_none = False
            has_ps_plus = False
            has_ea_access = False
            has_ubisoft_plus = False
            has_gta_plus = False

            for item in price_details:
                item['original_price'] = convert_money(
                    item['originalPriceValue'])
                item['discount_price'] = convert_money(
                    item['discountPriceValue'])

                if item['offerBranding'] == "NONE":
                    offer_none = item
                    has_offer_none = True
                if item['offerBranding'] == "PS_PLUS":
                    ps_plus = item
                    has_ps_plus = True
                if item['offerBranding'] == "EA_ACCESS":
                    ea_access = item
                    has_ea_access = True
                if item['offerBranding'] == "UBISOFT_PLUS":
                    ubisoft_plus = item
                    has_ubisoft_plus = True
                if item['offerBranding'] == "GTA_PLUS":
                    gta_plus = item
                    has_gta_plus = True

            res = {
                'common_data': {
                    'title_id': tmd['titleId'],
                    'purchase_type': tmd['ctaType'],
                    'product_type': tmd['skuDetail'][0]['skuName'],
                    'has_offer_none': has_offer_none,
                    'has_ps_plus': has_ps_plus,
                    'has_ea_access': has_ea_access,
                    'has_ubisoft_plus': has_ubisoft_plus,
                    'has_gta_plus': has_gta_plus
                },
                'offer_none': offer_none,
                'ps_plus': ps_plus,
                'ubisoft_plus': ubisoft_plus,
                'ea_access': ea_access,
                'gta_plus': gta_plus
            }

            logging.info('Sale details done')
        except Exception:
            logging.error('Error getting sale details', exc_info=True)
            send_notification('[ERROR] Error getting sale details')
    return res


def get_legal(legal_node: str):
    logging.info("Trying to get legal info")
    res = None
    if legal_node:
        try:
            res = legal_node.text

            logging.info("Legal done")
        except Exception:
            logging.error('Error getting legal', exc_info=True)
            send_notification('[ERROR] Error getting legal')
    else:
        logging.warning('Legal node not found')
    return res


def convert_money(input: int):
    res = ''
    money_value = float(input) / 100
    res = "{:.2f}".format(money_value)
    return res


def convert_date(input: str):
    if not input or input == '':
        return None
    date_obj = datetime.strptime(input, '%d/%m/%Y')
    return date_obj.strftime('%Y-%m-%d %H:%M:%S')


def clean_image_url(url: str):
    return re.sub(r'\?.*$', '', url)


def mapping(data: object):
    logging.info('Start preparing data for database')
    items = []
    prepared_data = []

    concept = data.get('concept', None)
    title = data.get('title', None)
    dlc = data.get('dlc', None)
    editions = data.get('editions', None)

    try:
        if dlc and len(dlc):
            for d in dlc:
                items.append(d)
        if editions and len(editions):
            for ed in editions:
                items.append(ed)
        else:
            items.append(title)

        for i in items:
            if i.get('general_info', {}).get('title_id', None):
                item = {
                    'id': i.get('general_info', {}).get('title_id', None),
                    'title': i.get('general_info', {}).get('title', None),

                    'concept_id': concept.get('concept_id', None),

                    'url': i.get('url', None),
                    'cover': i.get('cover_url', None),
                    'background': i.get('background_url', None),

                    'rating': i.get('rating', {}).get('global', None),
                    'description': i.get('description', None),
                    'legal': i.get('legal', None),
                    'users': i.get('rating', {}).get('users_count', None),

                    'platforms': i.get(
                        'game_info', {}).get('release_platforms', None),
                    'release_date': i.get(
                        'game_info', {}).get('release_date', None),
                    'publisher': i.get('game_info', {}).get('publisher', None),
                    'genres': i.get('game_info', {}).get('genres', None),
                    'voice': i.get('game_info', {}).get('voice', None),
                    'screen_languages':
                        i.get('game_info', {}).get('screen_languages', None),

                    'content': i.get('content'),

                    'short_id': i.get('sale_details', {}).get(
                        'common_data', {}).get('title_id', None),
                    'product_type': i.get('sale_details', {}).get(
                        'common_data', {}).get('product_type', None),

                    'has_offer_none': i.get('sale_details', {}).get(
                        'common_data', {}).get('has_offer_none', None),
                    'has_ps_plus': i.get('sale_details', {}).get(
                        'common_data', {}).get('has_ps_plus', None),
                    'has_ea_access': i.get('sale_details', {}).get(
                        'common_data', {}).get('has_ea_access', None),
                    'has_ubisoft_plus': i.get('sale_details', {}).get(
                        'common_data', {}).get('has_ubisoft_plus', None),
                    'has_gta_plus': i.get('sale_details', {}).get(
                        'common_data', {}).get('has_gta_plus', None),

                    'offer_none_original_price':
                        i.get('sale_details', {}).get('offer_none', {})
                        .get('original_price', None),
                    'offer_none_discount_price':
                        i.get('sale_details', {}).get('offer_none', {})
                        .get('discount_price', None),

                    'ps_plus_original_price':
                        i.get('sale_details', {}).get('ps_plus', {})
                        .get('original_price', None),
                    'ps_plus_discount_price':
                        i.get('sale_details', {}).get('ps_plus', {})
                        .get('discount_price', None),

                    'ubisoft_plus_original_price':
                        i.get('sale_details', {}).get('ubisoft_plus', {})
                        .get('original_price', None),
                    'ubisoft_plus_discount_price':
                        i.get('sale_details', {}).get('ubisoft_plus', {})
                        .get('discount_price', None),

                    'ea_access_original_price':
                        i.get('sale_details', {}).get('ea_access', {})
                        .get('original_price', None),
                    'ea_access_discount_price':
                        i.get('sale_details', {}).get('ea_access', {})
                        .get('discount_price', None),

                    'gta_plus_original_price':
                        i.get('sale_details', {}).get('gta_plus', {})
                        .get('original_price', None),
                    'gta_plus_discount_price':
                        i.get('sale_details', {}).get('gta_plus', {})
                        .get('discount_price', None),

                    'on_sale': True
                }

                prepared_data.append(item)

        logging.info('Data preparing done')
    except Exception:
        logging.error('Error preparing data', exc_info=True)
        send_notification('[ERROR] Error preparing data')
    return prepared_data


def put_data(data: object):
    try:
        with mysql.connector.connect(
            host=DB.host,
            user=DB.user,
            passwd=DB.password,
            database=DB.database,
            port=DB.port
        ) as db:
            cur = db.cursor()
            cur.execute("SELECT id FROM titles WHERE id = %s", (data['id'],))
            existing_record = cur.fetchone()

            if existing_record:
                logging.info(f"Updating {data['id']}")
                cur.execute(
                    """
                    UPDATE titles
                    SET
                        title = %s,
                        concept_id = %s,
                        url = %s,
                        cover = %s,
                        background = %s,
                        rating = %s,
                        description = %s,
                        legal = %s,
                        users = %s,
                        platforms = %s,
                        release_date = %s,
                        publisher = %s,
                        genres = %s,
                        voice = %s,
                        screen_languages = %s,
                        content = %s,
                        short_id = %s,
                        product_type = %s,
                        has_offer_none = %s,
                        has_ps_plus = %s,
                        has_ea_access = %s,
                        has_ubisoft_plus = %s,
                        has_gta_plus = %s,
                        offer_none_original_price = %s,
                        offer_none_discount_price = %s,
                        ps_plus_original_price = %s,
                        ps_plus_discount_price = %s,
                        ubisoft_plus_original_price = %s,
                        ubisoft_plus_discount_price = %s,
                        ea_access_original_price = %s,
                        ea_access_discount_price = %s,
                        gta_plus_original_price = %s,
                        gta_plus_discount_price = %s
                    WHERE
                        id = %s;
                    """,
                    (
                        data['title'],
                        data['concept_id'],
                        data['url'],
                        data['cover'],
                        data['background'],
                        data['rating'],
                        data['description'],
                        data['legal'],
                        data['users'],
                        data['platforms'],
                        data['release_date'],
                        data['publisher'],
                        data['genres'],
                        data['voice'],
                        data['screen_languages'],
                        data['content'],
                        data['short_id'],
                        data['product_type'],
                        data['has_offer_none'],
                        data['has_ps_plus'],
                        data['has_ea_access'],
                        data['has_ubisoft_plus'],
                        data['has_gta_plus'],
                        data['offer_none_original_price'],
                        data['offer_none_discount_price'],
                        data['ps_plus_original_price'],
                        data['ps_plus_discount_price'],
                        data['ubisoft_plus_original_price'],
                        data['ubisoft_plus_discount_price'],
                        data['ea_access_original_price'],
                        data['ea_access_discount_price'],
                        data['gta_plus_original_price'],
                        data['gta_plus_discount_price'],
                        data['id'],
                    )
                )
            else:
                logging.info(f"Inserting {data['id']}")
                cur.execute(
                    """
                    INSERT INTO titles(
                        id,
                        title,
                        concept_id,
                        url,
                        cover,
                        background,
                        rating,
                        description,
                        legal,
                        users,
                        platforms,
                        release_date,
                        publisher,
                        genres,
                        voice,
                        screen_languages,
                        content,
                        short_id,
                        product_type,
                        has_offer_none,
                        has_ps_plus,
                        has_ea_access,
                        has_ubisoft_plus,
                        has_gta_plus,
                        offer_none_original_price,
                        offer_none_discount_price,
                        ps_plus_original_price,
                        ps_plus_discount_price,
                        ubisoft_plus_original_price,
                        ubisoft_plus_discount_price,
                        ea_access_original_price,
                        ea_access_discount_price,
                        gta_plus_original_price,
                        gta_plus_discount_price)
                    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        data['id'],
                        data['title'],
                        data['concept_id'],
                        data['url'],
                        data['cover'],
                        data['background'],
                        data['rating'],
                        data['description'],
                        data['legal'],
                        data['users'],
                        data['platforms'],
                        data['release_date'],
                        data['publisher'],
                        data['genres'],
                        data['voice'],
                        data['screen_languages'],
                        data['content'],
                        data['short_id'],
                        data['product_type'],
                        data['has_offer_none'],
                        data['has_ps_plus'],
                        data['has_ea_access'],
                        data['has_ubisoft_plus'],
                        data['has_gta_plus'],
                        data['offer_none_original_price'],
                        data['offer_none_discount_price'],
                        data['ps_plus_original_price'],
                        data['ps_plus_discount_price'],
                        data['ubisoft_plus_original_price'],
                        data['ubisoft_plus_discount_price'],
                        data['ea_access_original_price'],
                        data['ea_access_discount_price'],
                        data['gta_plus_original_price'],
                        data['gta_plus_discount_price'],
                    )
                )
            db.commit()
    except KeyboardInterrupt:
        logging.error('Cancelled by user', exc_info=True)
        send_notification('[ERROR] Cancelled by user')
    except Exception as e:
        logging.error(f"Error executing SQL query: {e}", exc_info=True)
        send_notification(f"[ERROR] Error executing SQL query: {e}")


def parser(url: str):
    logging.info("Parser started")
    try:
        logging.info("Trying open file contains concepts")
        found = False
        found_concept = {}

        with open('concepts.json', 'r') as file:
            data = json.load(file)
            try:
                for concept in data:
                    if concept['title_url'] == url:
                        found = True
                        found_concept = concept
                        break

                if not found:
                    raise NoMatchesFound

                try:
                    logging.info(f"Waiting timeout {timeout} seconds")
                    time.sleep(timeout)

                    res = get_title(found_concept)

                    Path("output").mkdir(parents=True, exist_ok=True)
                    with open('output/title.json', 'w') as f:
                        json.dump(res, f, indent=2)
                    logging.info(
                        f"Concept {res['concept']['concept_id']} done")
                    logging.info("The parser has finished working")
                except KeyboardInterrupt:
                    logging.error('Cancelled by user', exc_info=True)
                    send_notification('[ERROR] Cancelled by user')

            except NoMatchesFound:
                logging.error('No matches found in concepts', exc_info=True)
                send_notification('[ERROR] No matches found in concepts')
    except FileNotFoundError:
        logging.error('File not found', exc_info=True)
        send_notification('[ERROR] File not found')


def main():
    try:
        parser(args.u)

        with open('./output/title.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            items = mapping(data)
            for item in items:
                put_data(item)
    except KeyboardInterrupt:
        logging.error('Cancelled by user', exc_info=True)
        send_notification('[ERROR] Cancelled by user')
    except Exception as e:
        logging.error(f"{e}", exc_info=True)
        send_notification(f"[ERROR] {e}")


if __name__ == "__main__":
    main()
