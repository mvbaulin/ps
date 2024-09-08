from bs4 import BeautifulSoup  # type: ignore
import json
from datetime import datetime
import re
import logging
import sys
import os
import psycopg2  # type: ignore
from db import DB_test as DB

current_date = datetime.now().date()
stdout_handler = logging.StreamHandler(stream=sys.stdout)
file_handler = logging.FileHandler(
    filename=f"./logs/service_{current_date.isoformat()}.log"
)

handlers = [file_handler, stdout_handler]

logging.basicConfig(
    format="[%(asctime)s] [%(levelname)s] Catalog mapping: %(message)s",
    level=logging.INFO,
    handlers=handlers
)

PAGE_FOLDER = "./pages/"
files_and_folders = os.listdir(PAGE_FOLDER)
files = [file for file in files_and_folders
         if os.path.isfile(os.path.join(PAGE_FOLDER, file))]
pages = len(files)


def mapping(filepath, existing_titles):
    try:
        with open(f"{filepath}", "r", encoding="utf-8") as html:
            response = html.read()
            soup = BeautifulSoup(response, "html.parser")

            items = soup.find('ul', class_='psw-grid-list')

            for item in items.find_all('li',
                                       class_='psw-l-w-1/2@mobile-s'):
                title_section = item.find('section',
                                          class_='psw-product-tile__details')
                title_node = title_section.find('span', class_='psw-c-t-1')
                title_name = title_node.text if title_node else ''

                concept_name = item.find('a',
                                         class_='psw-content-link')['href']

                cover_node = item.select('img[data-qa^='
                                         '"ems-sdk-grid#productTile"]')
                src = cover_node[0].get('src')
                cleaned_url = re.sub(r'\?.*$', '', src)

                title_url = f"https://store.playstation.com{concept_name}"
                title_url = re.sub(r'(https://[^/]*)//', r'\1/', title_url)

                telemetry = item.select_one('a[data-telemetry-meta]')
                telemetry_meta = json.loads(telemetry['data-telemetry-meta'])
                id_value = telemetry_meta.get('id')

                concept_date = datetime.now().strftime(
                    '%Y-%m-%d %H:%M:%S')

                concept = {
                    "concept_id": id_value,
                    "title_name": title_name,
                    "concept_name": concept_name,
                    "concept_date": concept_date,
                    "title_url": title_url,
                    "title_cover": cleaned_url
                }

                if title_name not in existing_titles:
                    existing_titles.add(title_name)
                    yield concept
    except FileNotFoundError as e:
        logging.error(f"{e} File {filepath} not found. Skipping...",
                      exc_info=True)
        return


def main(output: str, last_page: int):
    logging.info(output)

    existing_titles = set()

    try:
        with open(output, 'r', encoding='utf-8') as file:
            existing_data = json.load(file)
            existing_titles.update(item["title_name"]
                                   for item in existing_data)
    except (json.JSONDecodeError, FileNotFoundError):
        logging.error(f"Output file {output} for catalog not found",
                      exc_info=True)
        existing_data = []

    concepts = []

    for i in range(1, last_page + 1):
        filepath = f"pages/page_{i}.html"

        logging.info(f"Open file {filepath}")
        for concept in mapping(filepath, existing_titles):
            concepts.append(concept)

        logging.info(f"Complete {filepath}")

    existing_data.extend(concepts)

    with open(output, 'w', encoding='utf-8') as file:
        json.dump(existing_data, file, ensure_ascii=False, indent=2)

    logging.info("The service has finished working")
    logging.info(f"Result contains in '{output}' file")


try:
    main("concepts.json", pages)

    conn = psycopg2.connect(
        host=DB.host,
        user=DB.user,
        password=DB.password,
        dbname=DB.database,
        port=DB.port
    )

    cur = conn.cursor()

    with open('./concepts.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

        for item in data:
            try:
                cur.execute("SELECT id FROM concepts WHERE id = %s",
                            (item['concept_id'],))
                existing_record = cur.fetchone()

                if existing_record:
                    logging.info(f"Updating "
                                 f"{item['concept_id']} - "
                                 f"{item['title_name']}")
                    cur.execute(
                        """
                        UPDATE concepts
                        SET
                            title_name = %s,
                            concept_name = %s,
                            concept_date = %s,
                            title_url = %s,
                            cover_url = %s
                        WHERE
                            id = %s;
                        """,
                        (
                            item['title_name'],
                            item['concept_name'],
                            item['concept_date'],
                            item['title_url'],
                            item['title_cover'],
                            item['concept_id']
                        )
                    )
                else:
                    logging.info(f"Inserting "
                                 f"{item['concept_id']} - "
                                 f"{item['title_name']}")
                    cur.execute(
                        """
                        INSERT INTO concepts(
                            id,
                            title_name,
                            concept_name,
                            concept_date,
                            title_url,
                            cover_url)
                        VALUES(%s, %s, %s, %s, %s, %s);
                        """,
                        (
                            item['concept_id'],
                            item['title_name'],
                            item['concept_name'],
                            item['concept_date'],
                            item['title_url'],
                            item['title_cover']
                        )
                    )
            except Exception as e:
                logging.error(f"Error executing SQL query: {e}", exc_info=True)
    conn.commit()
except Exception as e:
    logging.error(f"{e}", exc_info=True)
except KeyboardInterrupt as e:
    logging.error(f"Cancelled by user {e}", exc_info=True)
finally:
    if 'conn' in locals():
        conn.close()
