#!/bin/bash

# Konfigurasi
WEBHOOK_URL="https://discord.com/api/webhooks/1468975223905845423/y2sF8U7PaQzOiHDSfZVHn8ytngQjAk_vr-RLvyOdWkEDmAxPxD57XWQDbkWNzeTpg0HJ"
PROJECT_NAME="Codeverta"

echo "Deploying $PROJECT_NAME..."

# Jalankan docker compose
# Kita tidak pakai -d agar bisa mendeteksi kapan proses benar-benar selesai
docker-compose up -d --build codeverta

# Cek status exit code dari perintah sebelumnya
if [ $? -eq 0 ]; then
    MESSAGE="$PROJECT_NAME berhasil dideploy!"
    COLOR=3066993 # Hijau
else
    MESSAGE="$PROJECT_NAME gagal dideploy! Cek log server."
    COLOR=15158332 # Merah
fi

# Kirim ke Discord
curl -H "Content-Type: application/json" \
     -X POST \
     -d "{\"embeds\": [{\"title\": \"Deployment Status\", \"description\": \"$MESSAGE\", \"color\": $COLOR}]}" \
     $WEBHOOK_URL

echo "Selesai."
