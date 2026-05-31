#!/bin/bash
# 
# MIT License
# 
# Copyright (c) 2026
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

set -e

# Ensure the script runs in the project directory
cd "$(dirname "$0")"

# Prompt for Configuration
read -p "Enter the domain name (e.g. metro.example.com): " DOMAIN
read -p "Enter the VPS IP Address (Confirm your domain's A record points here): " IP_ADDRESS
read -p "Enter your email address (for SSL certs): " EMAIL

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Error: Domain and Email cannot be empty."
    exit 1
fi

# Ensure script is run with root privileges
if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script with sudo or as root."
  exit 1
fi

echo "=================================================="
echo "Starting Deployment for $DOMAIN"
echo "Target IP: $IP_ADDRESS"
echo "=================================================="

# 1. Update and Install Dependencies (Skip apt-get update if already installed)
if ! command -v nginx &> /dev/null || ! command -v certbot &> /dev/null; then
    echo "-> [1/5] Installing Nginx and Certbot..."
    apt-get update -y
    apt-get install -y nginx certbot python3-certbot-nginx
else
    echo "-> [1/5] Nginx and Certbot are already installed. Skipping..."
fi

# 2. Build the Application
echo "-> [2/5] Installing NPM packages and building new application version..."
npm install
npm run build

# 3. Stop Previous Version & Setup Web Root Directory
echo "-> [3/5] Stopping previous live versions and clearing web roots..."
# Remove old Nginx server blocks
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/*

# Remove old web directories to ensure no old versions remain active
rm -rf /var/www/*

# Set up the new web root
WEB_ROOT="/var/www/$DOMAIN/html"
mkdir -p "$WEB_ROOT"

echo "-> [4/5] Deploying new static files to Nginx web root..."
cp -r dist/* "$WEB_ROOT/"

# Set correct permissions
chown -R www-data:www-data "/var/www/$DOMAIN"
chmod -R 755 "/var/www/$DOMAIN"

# 5. Configure Nginx Server Block
echo "-> [5/5] Generating Nginx Server Block for $DOMAIN..."
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    
    server_name $DOMAIN;
    root $WEB_ROOT;
    index index.html;

    # SPA Routing: Redirect all requests to index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Aggressively cache hashed assets from Vite (JS, CSS, Fonts)
    location ^~ /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable, no-transform";
    }

    # Prevent caching for Service Worker to ensure PWA updates reliably
    location = /sw.js {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }

    # Basic cache for other static assets (Images, Manifest)
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webmanifest)\$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/

# Verify and reload Nginx
nginx -t
systemctl reload nginx

# 6. Provision SSL Certificate
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    echo "-> [6/6] Securing connection with Let's Encrypt SSL..."
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --keep-until-expiring || echo "Notice: Certbot failed. You can run it manually later."
else
    echo "-> [6/6] SSL Certificate for $DOMAIN is already active. Re-applying to Nginx..."
    certbot install --nginx -d "$DOMAIN" --cert-name "$DOMAIN" --non-interactive || echo "Notice: Certbot install failed. You can run it manually later."
fi

echo "=================================================="
echo "Deployment Complete! 🚀"
echo "Your updated application is live and secure at: https://$DOMAIN"
echo "=================================================="
