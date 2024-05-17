#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo 'Catalog downloader has been connected to VPN'
  shortcuts run "Connect PS_VPN"
  source venv/bin/activate
  python3 ./catalog_download.py
elif [[ $# -eq 4 ]]; then
  echo 'Catalog downloader has been connected to VPN'
  shortcuts run "Connect PS_VPN"
  source venv/bin/activate
  python3 ./catalog_download.py "$1" "$2" "$3" "$4"
else
  echo Catalog downloader running error
fi

# echo 'Disconnect VPN'
# shortcuts run "Disconnect VPN"
