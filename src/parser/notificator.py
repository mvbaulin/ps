import subprocess


TOKEN = '7004508488:AAEcfQoIzlEK7BSLB1WlqPhnk7U-hzqdEyE'
USER_IDS = ['191584056', '108734085', '477554373']


def send_notification(message):
    curl_commands = []
    for user_id in USER_IDS:
        curl_command = [
            'curl',
            '-X',
            'POST',
            'https://api.telegram.org/bot{}/sendMessage'.format(TOKEN),
            '-d',
            'chat_id={}&text={}'.format(user_id, message)
        ]
        curl_commands.append(curl_command)

    for curl_command in curl_commands:
        subprocess.run(curl_command)
