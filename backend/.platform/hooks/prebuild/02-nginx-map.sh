#!/bin/bash

# Create NGINX map config to prevent redirect loops
cat << 'EOF' > /etc/nginx/conf.d/01_map.conf
map $http_x_forwarded_proto $should_redirect {
    default        1;
    https          0;
}
EOF

# Add conditional redirect logic
cat << 'EOF' > /etc/nginx/conf.d/02_force_https.conf
server {
    listen 80;
    server_name forum-backend-env.eba-rkkugpwy.ap-southeast-2.elasticbeanstalk.com;

    location /.well-known/acme-challenge/ {
        root /usr/share/nginx/html;
        allow all;
    }

    if ($should_redirect) {
        return 301 https://$host$request_uri;
    }
}
EOF
