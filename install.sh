#!/bin/bash

# Exit on error
set -e

# ==========================================
# Delhi Metro PWA - Production Install Script
# ==========================================

# 1. Root Check
if [ "$EUID" -ne 0 ]; then
  echo "❌ Error: Please run this script with sudo or as root."
  echo "Usage: sudo ./install.sh"
  exit 1
fi

echo "🚇 Delhi Metro PWA Installation Script"
echo "======================================"

# 2. Interactive Prompts with Validation
while true; do
    read -r -p "Enter the target domain name (e.g., metro.example.com): " DOMAIN
    # Basic validation for domain (prevent command injection & ensure basic structure)
    if [[ "$DOMAIN" =~ ^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        break
    else
        echo "❌ Invalid domain format. Please enter a valid domain (e.g., metro.example.com)."
    fi
done

while true; do
    read -r -p "Enter your email address (for Let's Encrypt recovery): " EMAIL
    # Basic validation for email
    if [[ "$EMAIL" =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        break
    else
        echo "❌ Invalid email format. Please enter a valid email address."
    fi
done

echo ""
echo "🚀 Starting installation for $DOMAIN..."
echo ""

# 3. Dependency Installation
echo "📦 Updating packages and installing dependencies (nginx, certbot)..."
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx

# 4. App Deployment
APP_DIR="/var/www/$DOMAIN"
echo "📂 Creating application directory at $APP_DIR..."

if [ -d "$APP_DIR" ]; then
    echo "⚠️ Directory $APP_DIR already exists. It will be overwritten."
    rm -rf "$APP_DIR"
fi

mkdir -p "$APP_DIR"

echo "📋 Copying files to $APP_DIR..."
# Copy only necessary files (ignore .git, install scripts, etc.)
cp -r index.html sw.js manifest.json icons "$APP_DIR/"

echo "🔐 Setting ownership to www-data..."
chown -R www-data:www-data "$APP_DIR"
# Secure permissions
find "$APP_DIR" -type d -exec chmod 755 {} \;
find "$APP_DIR" -type f -exec chmod 644 {} \;

# 5. Nginx Configuration
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
echo "⚙️ Configuring Nginx..."

# Create Nginx server block
cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;
    root $APP_DIR;
    index index.html;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;" always;

    location / {
        try_files \$uri \$uri/ /index.html;
        
        # Cache control for static assets (optional but good for PWA)
        location ~* \.(?:ico|css|js|gif|jpe?g|png|json)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }

    # Disable logging for favicon and robots.txt
    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { log_not_found off; access_log off; }

    # Deny access to hidden files (e.g., .git)
    location ~ /\. {
        deny all;
    }
}
EOF

echo "🔗 Enabling Nginx site..."
if [ -L "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    rm "/etc/nginx/sites-enabled/$DOMAIN"
fi
ln -s "$NGINX_CONF" "/etc/nginx/sites-enabled/"

# Ensure default site is disabled if it conflicts, or just leave it if domains don't clash.
# (Usually safe to leave if server_names are distinct)

echo "🔍 Testing Nginx configuration..."
nginx -t

echo "🔄 Reloading Nginx..."
systemctl reload nginx

# 6. HTTPS Setup
echo "🔒 Setting up HTTPS with Let's Encrypt..."
# The --non-interactive flag prevents it from asking questions during script execution
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect

# 7. Success Message
echo ""
echo "======================================"
echo "✅ Installation Complete!"
echo "======================================"
echo "Your Delhi Metro PWA is now live and secure."
echo "Visit: https://$DOMAIN"
echo ""
echo "Note: The files are served from $APP_DIR"
echo "======================================"
