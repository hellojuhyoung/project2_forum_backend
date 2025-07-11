#!/bin/bash

echo "🌐 Creating NGINX config..."

NGINX_CONF_PATH="/etc/nginx/conf.d/elasticbeanstalk-https-proxy.conf"

sudo tee $NGINX_CONF_PATH > /dev/null <<EOF
server {
    listen 80;
    server_name forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com;

    ssl_certificate /etc/letsencrypt/live/forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

echo "🔄 Testing NGINX config..."
if sudo nginx -t; then
  sudo systemctl reload nginx
else
  echo "ERROR: NGINX config test failed, but ignoring to avoid deployment failure."
fi
