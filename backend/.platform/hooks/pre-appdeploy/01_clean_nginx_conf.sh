#!/bin/bash
# This script cleans up any existing Nginx custom config before deployment.

set -x # Enable verbose debugging
LOG_FILE="/tmp/nginx_setup_debug.log"

echo "Running pre-appdeploy cleanup script. Output redirected to $LOG_FILE" >> "$LOG_FILE" 2>&1
echo "Attempting to remove existing Nginx config file..." >> "$LOG_FILE" 2>&1

NGINX_CONFIG_FILE="/etc/nginx/conf.d/elasticbeanstalk-nginx-http-https.conf"

if [ -f "$NGINX_CONFIG_FILE" ]; then
  echo "Found existing config file: $NGINX_CONFIG_FILE. Deleting it..." >> "$LOG_FILE" 2>&1
  sudo rm "$NGINX_CONFIG_FILE" >> "$LOG_FILE" 2>&1 || echo "Failed to delete existing config file!" >> "$LOG_FILE" 2>&1
  echo "Deletion attempt finished." >> "$LOG_FILE" 2>&1
else
  echo "No existing config file found at $NGINX_CONFIG_FILE. Skipping deletion." >> "$LOG_FILE" 2>&1
fi

echo "Pre-appdeploy cleanup finished." >> "$LOG_FILE" 2>&1
