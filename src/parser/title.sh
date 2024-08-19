#!/bin/bash

# shellcheck disable=SC1091
source venv/bin/activate
# shellcheck disable=SC2086
python3 ./title.py $1 $2
