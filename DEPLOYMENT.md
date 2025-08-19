# P.K. Koduri Portfolio Website - Self-Hosting Deployment Guide

## Overview

This guide will help you deploy P.K. Koduri's portfolio website on your own server. The application is a full-stack React/Node.js application with Express backend.

## Prerequisites

- Node.js 18+ installed on your server
- npm or yarn package manager
- A domain name (optional but recommended)
- SSL certificate (recommended for production)

## Server Requirements

- **RAM**: Minimum 1GB, recommended 2GB+
- **Storage**: 2GB+ available space
- **Network**: Port 80 and 443 (for SSL) accessible
- **OS**: Linux (Ubuntu/Debian recommended), macOS, or Windows Server

## Quick Deployment Steps

### 1. Clone/Upload Your Project

Upload your project files to your server. You can use:
- Git clone (if using version control)
- SCP/SFTP file transfer
- FTP upload

### 2. Install Dependencies

```bash
cd your-project-directory
npm install
```

### 3. Build the Application

```bash
npm run build
```

This creates:
- `dist/public/` - Built frontend assets
- `dist/index.js` - Built backend server

### 4. Set Environment Variables

Create a `.env` file in your project root:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# Optional: If using external database
# DATABASE_URL=your_database_url_here
```

### 5. Start the Application

```bash
npm start
```

The application will be available at `http://your-server-ip:5000`

## Production Deployment Options

### Option 1: Direct Server Deployment

1. **Install Node.js on your server**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # CentOS/RHEL
   curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
   sudo yum install -y nodejs
   ```

2. **Create a system user** (recommended):
   ```bash
   sudo useradd -m -s /bin/bash portfolio
   sudo su - portfolio
   ```

3. **Upload and build your application**:
   ```bash
   # Upload files to /home/portfolio/app
   cd /home/portfolio/app
   npm install
   npm run build
   ```

4. **Create a systemd service** (recommended for auto-restart):
   ```bash
   sudo nano /etc/systemd/system/portfolio.service
   ```

   Add this content:
   ```ini
   [Unit]
   Description=P.K. Koduri Portfolio Website
   After=network.target

   [Service]
   Type=simple
   User=portfolio
   WorkingDirectory=/home/portfolio/app
   ExecStart=/usr/bin/node dist/index.js
   Restart=on-failure
   Environment=NODE_ENV=production
   Environment=PORT=5000

   [Install]
   WantedBy=multi-user.target
   ```

5. **Start and enable the service**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable portfolio
   sudo systemctl start portfolio
   ```

### Option 2: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pk-portfolio .
docker run -d -p 5000:5000 --name portfolio pk-portfolio
```

### Option 3: Nginx Reverse Proxy (Recommended)

1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/portfolio
   ```

   Add this content:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## SSL Certificate Setup (Recommended)

### Using Let's Encrypt (Free SSL)

1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get SSL certificate**:
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renewal** (Certbot usually sets this up automatically):
   ```bash
   sudo crontab -e
   # Add this line:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Database Configuration (Optional)

The application uses in-memory storage by default. For production with persistent data:

1. **Set up PostgreSQL**:
   ```bash
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres createdb portfolio_db
   sudo -u postgres createuser portfolio_user
   ```

2. **Update environment variables**:
   ```bash
   DATABASE_URL=postgresql://portfolio_user:password@localhost:5432/portfolio_db
   ```

3. **Run migrations**:
   ```bash
   npm run db:push
   ```

## Security Considerations

1. **Firewall Configuration**:
   ```bash
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

2. **Regular Updates**:
   ```bash
   sudo apt update && sudo apt upgrade
   npm audit fix
   ```

3. **Environment Variables**: Never commit sensitive data to version control

4. **Process Manager**: Use PM2 or systemd for process management

## Monitoring and Maintenance

### Using PM2 (Alternative to systemd)

1. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

2. **Start application**:
   ```bash
   pm2 start dist/index.js --name portfolio
   pm2 startup
   pm2 save
   ```

3. **Monitor**:
   ```bash
   pm2 status
   pm2 logs portfolio
   ```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **Permission denied**:
   ```bash
   sudo chown -R portfolio:portfolio /home/portfolio/app
   ```

3. **Build failures**:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

### Log Files

- Application logs: `pm2 logs` or `journalctl -u portfolio`
- Nginx logs: `/var/log/nginx/error.log`
- System logs: `journalctl -xe`

## Performance Optimization

1. **Enable gzip compression** in Nginx
2. **Set up CDN** for static assets
3. **Database optimization** if using PostgreSQL
4. **Caching headers** for static content

## Backup Strategy

1. **Application files**: Regular backups of your project directory
2. **Database**: `pg_dump` if using PostgreSQL
3. **SSL certificates**: Backup `/etc/letsencrypt/`

## Support

For deployment issues specific to this application, check:
- Application logs for error messages
- Ensure all environment variables are set correctly
- Verify Node.js version compatibility (18+)
- Check network connectivity and firewall settings

---

This deployment guide provides multiple options for hosting P.K. Koduri's portfolio website on your own infrastructure. Choose the method that best fits your technical requirements and server setup.