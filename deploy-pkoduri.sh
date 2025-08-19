#!/bin/bash

# P.K. Koduri Portfolio Website - Production Deployment Script
# Customized for Ubuntu server with nginx, PM2, and pkoduri.com domain

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="pkoduri.com"
APP_NAME="pkoduri-portfolio"
APP_DIR="/var/www/pkoduri.com"
NGINX_CONFIG="/etc/nginx/sites-available/pkoduri.com"
USER="www-data" # Change this to your preferred user

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_header "P.K. Koduri Portfolio Deployment"
echo "Domain: $DOMAIN"
echo "App Directory: $APP_DIR"
echo ""

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root or with sudo"
   exit 1
fi

# Verify Node.js and npm versions
print_status "Checking system requirements..."
if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js 20+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js 20+ required. Current: $(node -v)"
    exit 1
fi

if ! command -v pm2 &> /dev/null; then
    print_error "PM2 not found. Installing PM2..."
    npm install -g pm2
fi

print_status "Node.js: $(node -v) ✓"
print_status "npm: $(npm -v) ✓"
print_status "PM2: $(pm2 -v) ✓"

# Create application directory
print_status "Setting up application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Check if this is an update or fresh install
if [ -f "package.json" ]; then
    print_status "Existing installation detected. Performing update..."
    
    # Stop existing PM2 process
    if pm2 list | grep -q $APP_NAME; then
        print_status "Stopping existing application..."
        pm2 stop $APP_NAME
    fi
    
    # Backup current version
    if [ -d "dist" ]; then
        print_status "Backing up current version..."
        mv dist dist.backup.$(date +%Y%m%d_%H%M%S)
    fi
else
    print_status "Fresh installation detected..."
fi

# Copy application files (assumes you've uploaded them to a temp directory)
print_status "Copying application files..."
# You would typically copy from your source directory here
# cp -r /path/to/your/source/* $APP_DIR/

# Set proper ownership
chown -R $USER:$USER $APP_DIR

# Install dependencies and build
print_status "Installing dependencies..."
sudo -u $USER npm ci --only=production

print_status "Building application..."
sudo -u $USER npm run build

# Verify build
if [ ! -d "dist" ]; then
    print_error "Build failed! dist directory not found."
    exit 1
fi

print_status "Build completed successfully!"

# Set up environment file
if [ ! -f ".env" ]; then
    print_status "Creating production environment file..."
    cat > .env << EOF
NODE_ENV=production
PORT=5000
EOF
    chown $USER:$USER .env
    chmod 600 .env
fi

# Create PM2 log directory
mkdir -p /var/log/pm2
chown $USER:$USER /var/log/pm2

# Update PM2 ecosystem config with correct path
print_status "Configuring PM2..."
sed -i "s|cwd: '/var/www/pkoduri.com'|cwd: '$APP_DIR'|g" ecosystem.config.js

# Start/restart application with PM2
print_status "Starting application with PM2..."
sudo -u $USER pm2 start ecosystem.config.js

# Save PM2 configuration
sudo -u $USER pm2 save

# Set up PM2 startup script
print_status "Setting up PM2 startup script..."
sudo -u $USER pm2 startup systemd -u $USER --hp /home/$USER
# Note: You'll need to run the command that PM2 outputs

# Configure nginx
print_status "Configuring nginx..."
if [ ! -f "$NGINX_CONFIG" ]; then
    cp pkoduri-nginx.conf $NGINX_CONFIG
    
    # Enable the site
    ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
    
    # Test nginx configuration
    nginx -t
    
    if [ $? -eq 0 ]; then
        print_status "Nginx configuration is valid"
        systemctl reload nginx
    else
        print_error "Nginx configuration error!"
        exit 1
    fi
else
    print_warning "Nginx configuration already exists. Please review manually."
fi

# Verify Let's Encrypt certificates
print_status "Checking SSL certificates..."
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    print_status "SSL certificates found ✓"
else
    print_warning "SSL certificates not found. Run: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
fi

# Set up log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/pkoduri-portfolio << EOF
/var/log/pm2/pkoduri-portfolio*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        sudo -u $USER pm2 reloadLogs
    endscript
}
EOF

# Final status check
print_status "Performing health checks..."
sleep 5

# Check PM2 status
if sudo -u $USER pm2 list | grep -q $APP_NAME; then
    APP_STATUS=$(sudo -u $USER pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .pm2_env.status")
    if [ "$APP_STATUS" = "online" ]; then
        print_status "Application is running ✓"
    else
        print_error "Application status: $APP_STATUS"
    fi
else
    print_error "Application not found in PM2"
fi

# Check nginx status
if systemctl is-active --quiet nginx; then
    print_status "Nginx is running ✓"
else
    print_error "Nginx is not running"
fi

# Test application response
print_status "Testing application response..."
if curl -f -s http://localhost:5000/ > /dev/null; then
    print_status "Application responding on port 5000 ✓"
else
    print_warning "Application not responding on port 5000"
fi

print_header "Deployment Summary"
echo "Application: $APP_NAME"
echo "Directory: $APP_DIR"
echo "Domain: $DOMAIN"
echo "Status: $(sudo -u $USER pm2 jlist | jq -r \".[] | select(.name==\\\"$APP_NAME\\\") | .pm2_env.status\")"
echo ""
echo "Useful commands:"
echo "  pm2 status              - Check application status"
echo "  pm2 logs $APP_NAME      - View application logs"
echo "  pm2 restart $APP_NAME   - Restart application"
echo "  pm2 monit              - Monitor application"
echo "  nginx -t               - Test nginx configuration"
echo "  systemctl reload nginx - Reload nginx"
echo ""

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "🎉 Deployment completed successfully!"
    echo "Your portfolio is available at: https://$DOMAIN"
else
    echo "⚠️  Deployment completed, but SSL setup is needed:"
    echo "Run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo "Then visit: https://$DOMAIN"
fi