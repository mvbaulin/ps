import argparse
import requests  # type: ignore
import datetime
from pathlib import Path
import logging
from enum import Enum
import sys
import time
from selenium import webdriver  # type: ignore
from selenium.webdriver.common.by import By  # type: ignore
from selenium.webdriver.support.ui import WebDriverWait  # type: ignore
from selenium.webdriver.support import (  # type: ignore
    expected_conditions as EC
)
from notificator import send_notification


Path("./logs/").mkdir(parents=True, exist_ok=True)
Path("pages").mkdir(parents=True, exist_ok=True)


arg_parser = argparse.ArgumentParser(description='Get title via URL')
arg_parser.add_argument('--f', type=int, default=1, help='Star page')
arg_parser.add_argument('--t', type=int, default=1, help='Finish page')
args = arg_parser.parse_args()


stdout_handler = logging.StreamHandler(stream=sys.stdout)
file_handler = logging.FileHandler(
    filename=f"./logs/service_{datetime.date.today().isoformat()}.log"
)

handlers = [file_handler, stdout_handler]

logging.basicConfig(
    format="[%(asctime)s] [%(levelname)s] Catalog downloader: %(message)s",
    level=logging.INFO,
    handlers=handlers
)


class Region(Enum):
    TR = 'en-tr'


class InvalidRange(Exception):
    pass


def check_args(f: int, t: int):
    if f <= 0 or t <= 0 or f > t:
        raise InvalidRange


store = {
    'name': Region.TR.value + " - Browse",
    'currency': 'USD',
    'url': f'https://store.playstation.com/{Region.TR.value}/pages/browse',
    'output_file': f'../catalogs/{Region.TR.value}_browse.json'
}

button_node_filter = "button[data-qa='ems-sdk-grid-sort-filter-btn-mobile']"
button_node_sort = "button[data-qa='ems-sdk-collapsible-menu--sort']"
old_to_new_node = "(//label[contains(@class, 'psw-text-list-radio')])[5]"
button_next_node = (
    "button[data-qa='ems-sdk-grid#ems-sdk-top-paginator-root#next']"
)


def get_pages(url: str):
    try:
        response = requests.get(f"{url}/1")
        logging.info(f"Connect to {url}/1 "
                     f"response status {response.status_code}")

        driver = webdriver.Chrome()
        driver.get(f"{url}")
        wait = WebDriverWait(driver, 10)

        button_mobile = wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, button_node_filter)))
        button_mobile.click()

        time.sleep(10)

        button_sort = wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, button_node_sort)))
        button_sort.click()

        time.sleep(10)

        button_choise = wait.until(EC.visibility_of_element_located(
            (By.XPATH, old_to_new_node)))
        button_choise.click()

        cur_page = args.f

        for p in range(args.t - args.f + 1):
            logging.info(f"Downloading page {url}/{cur_page}")
            time.sleep(10)
            driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(5)
            button_next = wait.until(EC.visibility_of_element_located(
                (By.CSS_SELECTOR, button_next_node)))

            with open(f"pages/page_{cur_page}.html",
                      "w", encoding="utf-8") as file:
                file.write(driver.page_source)

            button_next.click()

            logging.info(f"Page downloaded {url}/{cur_page}")
            cur_page += 1

        driver.quit()
    except requests.exceptions.RequestException as e:
        logging.error(e)


def main(store: object):
    time.sleep(5)

    try:
        check_args(args.f, args.t)
        logging.info(f"Service started for pages "
                     f"(from: {args.f}, to: {args.t})")
        try:
            get_pages(store['url'])
            send_notification('[INFO] Catalog downloader has finished working')
        except KeyboardInterrupt as e:
            logging.error(f'Canceled by user {e}')
        logging.info("The service has finished working")
    except InvalidRange:
        logging.error(f"Invalid arguments (from: {args.f}, to: {args.t}) "
                      f"for getting pages")
    except Exception as e:
        logging.error(f'Catalog downloader error {e}')
        send_notification('[ERROR] Catalog downloader error')


main(store)
