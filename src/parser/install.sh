#!/bin/bash

arch -x86_64 /usr/bin/python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install requests
pip install beautifulsoup4
pip3 install urllib3==1.26.15
pip install selenium
pip install lxml
pip install mysql-connector-python
pip freeze > requirements.txt
