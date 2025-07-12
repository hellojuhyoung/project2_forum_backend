#!/bin/bash
# This script creates the custom Nginx configuration file and restarts Nginx.
# It runs during the postdeploy hook phase, after the application and proxy are set up.

set -x # Enable verbose debugging

echo "Starting postdeploy Nginx configuration and restart..."

# Define the target Nginx config file path
NGINX_TARGET_DIR="/etc/nginx/conf.d"
FINAL_CONFIG_FILE="$NGINX_TARGET_DIR/elasticbeanstalk-nginx-http-https.conf"

echo "Checking if Nginx config directory $NGINX_TARGET_DIR exists..."
if [ ! -d "$NGINX_TARGET_DIR" ]; then
  echo "Directory $NGINX_TARGET_DIR does not exist. Creating it..."
  sudo mkdir -p "$NGINX_TARGET_DIR" || { echo "Failed to create directory $NGINX_TARGET_DIR!"; exit 1; }
  echo "Directory $NGINX_TARGET_DIR created."
else
  echo "Directory $NGINX_TARGET_DIR already exists."
fi
ls -ld "$NGINX_TARGET_DIR" # Show permissions of the target directory

echo "Attempting to write Nginx config directly to $FINAL_CONFIG_FILE..."
# Use sudo sh -c to write the content directly to the file with root privileges
sudo sh -c "cat <<'EOF_INNER' > '$FINAL_CONFIG_FILE'
# Redirect all HTTP traffic on port 80 to HTTPS on port 443
server {
  listen 80;
  server_name  _ ; # Catches all hostnames

  # Allow Certbot to access the ACME challenge files on port 80
  location /.well-known/acme-challenge/ {
    root /usr/share/nginx/html; # Standard Nginx webroot
    allow all;
  }

  return 301 https://$host$request_uri; # Permanent redirect for everything else
}

# Server block for HTTPS traffic on port 443
server {
  listen 443 ssl;
  server_name  _ ; # Catches all hostnames

  # Add healthd application log for port 443
  access_log /var/log/nginx/healthd/application.log;

  # SSL certificate paths (Certbot will create these)
  # Using your exact Elastic Beanstalk environment URL.
  ssl_certificate /etc/letsencrypt/live/forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com/privkey.pem;

  # Standard SSL settings for security
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_session_tickets off;
  ssl_protocols TLSv1.2 TLSv1.3;
  # Updated ssl_ciphers to a more broadly compatible and secure list
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA';
  ssl_prefer_server_ciphers on;

  # Proxy requests to your Node.js application
  location / {
    # Your Node.js app is listening on PORT 5001
    proxy_pass http://127.0.0.1:5001; # Proxy to your Node.js app
    proxy_set_header Host $host; # Re-enabled
    proxy_set_header X-Real-IP $remote_addr; # Re-enabled
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # Re-enabled
    proxy_set_header X-Forwarded-Proto $scheme; # Re-enabled
    proxy_set_header Upgrade $http_upgrade; # Re-enabled
    proxy_set_header Connection "upgrade"; # Re-enabled
  }
}
EOF_INNER" >> "$LOG_FILE" 2>&1 || { echo "Failed to write config content to $FINAL_CONFIG_FILE!" >> "$LOG_FILE" 2>&1; exit 1; }
echo "Direct write command executed. Verifying final target file..." >> "$LOG_FILE" 2>&1

if [ -f "$FINAL_CONFIG_FILE" ]; then
  echo "Nginx config file $FINAL_CONFIG_FILE successfully created/copied." >> "$LOG_FILE" 2>&1
  ls -l "$FINAL_CONFIG_FILE" >> "$LOG_FILE" 2>&1 # List details of the created file
  sudo nginx -t >> "$LOG_FILE" 2>&1 # Test Nginx configuration syntax
  if [ $? -eq 0 ]; then
    echo "Nginx configuration syntax is OK. Attempting to restart Nginx..." >> "$LOG_FILE" 2>&1
    sudo service nginx restart >> "$LOG_FILE" 2>&1 # Restart Nginx to load the new configuration
    if [ $? -eq 0 ]; then
      echo "Nginx service restarted successfully." >> "$LOG_FILE" 2>&1
    else
      echo "ERROR: Nginx service failed to restart after config copy. Check /var/log/nginx/error.log." >> "$LOG_FILE" 2>&1
      exit 1 # Fail if Nginx restart fails
    fi
  else
    echo "ERROR: Nginx configuration syntax check failed after copy. Check /var/log/nginx/error.log." >> "$LOG_FILE" 2>&1
    exit 1 # Fail if Nginx syntax is bad
  fi
else
  echo "ERROR: Nginx config file $FINAL_CONFIG_FILE WAS NOT created/copied. This is the problem!" >> "$LOG_FILE" 2>&1
  exit 1 # Fail if the file isn't there
fi
echo "Nginx config activation finished." >> "$LOG_FILE" 2>&1
