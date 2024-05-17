#!/bin/bash

echo 'Title parser has been connected to VPN'
shortcuts run "Connect PS_VPN"

source venv/bin/activate
python3 ./title.py $1 $2

# echo 'Disconnect VPN'
# shortcuts run "Disconnect VPN"
