#!/bin/bash

echo "Creating cron job for certbot renewal..."

sudo tee /etc/cron.d/certbot_renew <<EOF
0 0,12 * * * root /usr/bin/certbot renew --quiet --nginx --post-hook "sudo systemctl reload nginx"
EOF

sudo chmod 644 /etc/cron.d/certbot_renew

sudo tee /etc/cron.hourly/certbot_renew_check <<EOF
#!/bin/bash
/usr/bin/certbot renew --quiet --nginx --post-hook "sudo systemctl reload nginx"
EOF

sudo chmod 755 /etc/cron.hourly/certbot_renew_check

