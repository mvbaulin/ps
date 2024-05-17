#!/bin/bash

PYTHON_SCRIPT="./title.sh"

JSON_FILE="concepts.json"

START_INDEX=$1
END_INDEX=$2

readonly API_TOKEN="7004508488:AAEcfQoIzlEK7BSLB1WlqPhnk7U-hzqdEyE"
readonly USER_ID="191584056"
readonly URL="https://api.telegram.org/bot$API_TOKEN/sendMessage"

if [ $# -ne 2 ]; then
    echo "Use: $0 <from> <to>"
    exit 1
fi

process_url() {
    url="$1"
    $PYTHON_SCRIPT -u "$url"
    sleep 5
}

declare -i i=1
urls=($(jq -r '.[].title_url' "$JSON_FILE" | sed -n "${START_INDEX},${END_INDEX}p"))
for url in "${urls[@]}"; do
    process_url "$url"
    curl -s -d "chat_id=$USER_ID&disable_web_page_preview=1&text=[INFO] $i/$END_INDEX done" $URL > /dev/null
    ((i++))
done

curl -s -d "chat_id=$USER_ID&disable_web_page_preview=1&text=[INFO] Parser done" $URL > /dev/null
