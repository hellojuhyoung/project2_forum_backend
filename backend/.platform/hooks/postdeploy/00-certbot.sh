#!/bin/bash

DOMAIN="forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com"
EMAIL="juhyoung.leee@gmail.com"
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"

if [ ! -d "$CERT_PATH" ]; then
  echo "Certificate not found. Stopping Nginx for Certbot..."
  sudo systemctl stop nginx || true
  echo "Running Certbot..."
  sudo certbot certonly --standalone --non-interactive --agree-tos -m $EMAIL -d $DOMAIN
  echo "Certbot finished."
else
  echo "Certificate already exists. Skipping."
fi
