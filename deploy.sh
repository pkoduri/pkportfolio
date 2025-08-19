#!/bin/bash

# P.K. Koduri Portfolio Website - Deployment Script
# This script automates the deployment process for self-hosting

set -e

echo "🚀 Starting deployment of P.K. Koduri Portfolio Website..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v) ✓"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    cat > .env << EOF
NODE_ENV=production
PORT=5000
EOF
    print_warning "Please review and update the .env file with your specific configuration."
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Build the application
print_status "Building the application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed! dist directory not found."
    exit 1
fi

print_status "Build completed successfully!"

# Create systemd service file (optional)
read -p "Would you like to create a systemd service for auto-start? (y/n): " create_service

if [ "$create_service" = "y" ] || [ "$create_service" = "Y" ]; then
    read -p "Enter the username to run the service as (default: current user): " service_user
    service_user=${service_user:-$(whoami)}
    
    CURRENT_DIR=$(pwd)
    
    cat > portfolio.service << EOF
[Unit]
Description=P.K. Koduri Portfolio Website
After=network.target

[Service]
Type=simple
User=$service_user
WorkingDirectory=$CURRENT_DIR
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOF

    print_status "Systemd service file created: portfolio.service"
    print_warning "To install the service, run:"
    echo "  sudo cp portfolio.service /etc/systemd/system/"
    echo "  sudo systemctl daemon-reload"
    echo "  sudo systemctl enable portfolio"
    echo "  sudo systemctl start portfolio"
fi

# Check if PM2 is available for process management
if command -v pm2 &> /dev/null; then
    read -p "Would you like to start the application with PM2? (y/n): " use_pm2
    
    if [ "$use_pm2" = "y" ] || [ "$use_pm2" = "Y" ]; then
        print_status "Starting application with PM2..."
        pm2 start dist/index.js --name portfolio
        pm2 save
        print_status "Application started with PM2!"
        echo ""
        echo "PM2 commands:"
        echo "  pm2 status          - Check application status"
        echo "  pm2 logs portfolio  - View logs"
        echo "  pm2 restart portfolio - Restart application"
        echo "  pm2 stop portfolio  - Stop application"
    fi
else
    print_warning "PM2 not found. You can install it with: npm install -g pm2"
    read -p "Would you like to start the application directly? (y/n): " start_direct
    
    if [ "$start_direct" = "y" ] || [ "$start_direct" = "Y" ]; then
        print_status "Starting application..."
        nohup npm start > application.log 2>&1 &
        echo $! > app.pid
        print_status "Application started! PID: $(cat app.pid)"
        print_warning "Logs are being written to: application.log"
        print_warning "To stop the application: kill $(cat app.pid)"
    fi
fi

echo ""
print_status "Deployment completed successfully! 🎉"
echo ""
echo "Next steps:"
echo "1. Configure your web server (nginx/apache) as a reverse proxy"
echo "2. Set up SSL certificate (recommended: Let's Encrypt)"
echo "3. Configure your domain DNS to point to this server"
echo "4. Test the application at http://your-server-ip:5000"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"