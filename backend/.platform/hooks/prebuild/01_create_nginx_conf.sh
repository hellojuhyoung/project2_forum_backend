#!/bin/bash
# This script creates the custom Nginx configuration file for SSL termination.
# It runs during the prebuild hook phase of Elastic Beanstalk deployment.

echo "Creating custom Nginx configuration file..."

# Use 'cat <<EOF' to write the multi-line Nginx configuration directly to the file.
# Using 'sudo tee' ensures it's written with root privileges.
cat <<EOF | sudo tee /etc/nginx/conf.d/elasticbeanstalk-nginx-http-https.conf > /dev/null
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
  ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA';
  ssl_prefer_server_ciphers on;

  # Proxy requests to your Node.js application
  location / {
    # Your Node.js app is listening on PORT 5001
    proxy_pass http://127.0.0.1:5001; # Proxy to your Node.js app
    # Temporarily remove all proxy_set_header directives to isolate the error
    # proxy_set_header Host $host;
    # proxy_set_header X-Real-IP $remote_addr;
    # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto $scheme;
    # proxy_set_header Upgrade $http_upgrade;
    # The problematic 'proxy_set_header Connection "upgrade";' line is correctly removed here.
  }
}
EOF

echo "Nginx configuration file created."
