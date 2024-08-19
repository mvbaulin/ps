#!/bin/bash

if [[ $# -eq 0 ]]; then
  # shellcheck disable=SC1091
  source venv/bin/activate
  python3 ./catalog_download.py
elif [[ $# -eq 4 ]]; then
  # shellcheck disable=SC1091
  source venv/bin/activate
  python3 ./catalog_download.py "$1" "$2" "$3" "$4"
else
  echo Catalog downloader running error
fi
