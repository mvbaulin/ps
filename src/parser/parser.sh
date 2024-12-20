#!/bin/bash

START_INDEX=$1
END_INDEX=$2

readonly API_TOKEN="7004508488:AAEcfQoIzlEK7BSLB1WlqPhnk7U-hzqdEyE"
readonly USER_IDS=("191584056" "477554373")
readonly URL="https://api.telegram.org/bot$API_TOKEN/sendMessage"

current_date=$(date '+%Y-%m-%d')
LOG_FILE="./logs/service_${current_date}.log"

if [ $# -ne 2 ]; then
    echo "Use: $0 <from> <to>"
    exit 1
fi

log_message() {
    local log_time
    log_time=$(date '+%Y-%m-%d %H:%M:%S')$(printf ",%03d" "$(echo $(( $(date +%N) / 1000000 )) | sed 's/^0*//')")
    echo "[$log_time] [INFO] $1" >> "$LOG_FILE"
}

send_message() {
    local text="$1"
    for USER_ID in "${USER_IDS[@]}"; do
        curl -s -d "chat_id=$USER_ID&disable_web_page_preview=1&text=$text" $URL > /dev/null
    done
}

process_url() {
    url="$1"
    $"./title.sh" -u "$url"
    sleep 1
}

wg_tunnels=("./vpn/VPN_1.conf")

declare -i i=1

urls=()
while IFS= read -r line; do
    urls+=("$line")
done < <(jq -r '.[].title_url' "concepts.json" | sed -n "${START_INDEX},${END_INDEX}p")

log_message "Title parser: Start"
send_message "[INFO] Parser start"

for url in "${urls[@]}"; do
    if (( i % (${#wg_tunnels[@]} + 1) == 0 )); then
        log_message "VPN connection: Processing URL without VPN connection"
        process_url "$url"
        send_message "[INFO] $i/$END_INDEX done via no VPN"
    else
        tunnel_index=$(( (i - 1) % ${#wg_tunnels[@]} ))
        tunnel_config="${wg_tunnels[$tunnel_index]}"

        log_message "VPN connection: Connecting to VPN using tunnel: $tunnel_config"

        if wg-quick up "$tunnel_config"; then
            log_message "VPN connection: Successfully connected to VPN using tunnel: $tunnel_config"
        else
            log_message "VPN connection: Failed to connect to VPN using tunnel: $tunnel_config"
            exit 1
        fi

        process_url "$url"

        log_message "VPN connection: Disconnecting VPN using tunnel: $tunnel_config"

        if wg-quick down "$tunnel_config"; then
            log_message "VPN connection: Successfully disconnected from VPN using tunnel: $tunnel_config"
        else
            log_message "VPN connection: Failed to disconnect from VPN using tunnel: $tunnel_config"
            exit 1
        fi

        send_message "[INFO] $i/$END_INDEX done via $tunnel_config"
    fi

    ((i++))
done

log_message "Title parser: Done"
send_message "[INFO] Parser done"
