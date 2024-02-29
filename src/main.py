from bs4 import BeautifulSoup
import requests
import json

url = 'https://store.playstation.com/en-us/pages/browse'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

games = []

game_list = soup.find('ul', class_='psw-grid-list')
for game in game_list.find_all('li', class_="psw-l-w-1/2@mobile-s"):
    title = game.find('span', class_='psw-t-body').text

    game_data = {
        'title': title,
    }
    games.append(game_data)

with open('games.json', 'w', encoding='utf-8') as file:
    json.dump(games, file, ensure_ascii=False, indent=2)
