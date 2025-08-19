# P.K. Koduri Portfolio - Production Deployment Guide
## Customized for Ubuntu + Nginx + PM2 + pkoduri.com

This guide is specifically tailored for your server configuration:
- Ubuntu Linux
- Nginx with React/Node optimization
- Let's Encrypt SSL for pkoduri.com
- Node.js v20.19.4
- PM2 process manager

## Quick Deployment Steps

### 1. Upload Files to Server

Upload your project files to your server. Recommended location: `/var/www/pkoduri.com`

```bash
# Create directory (if not exists)
sudo mkdir -p /var/www/pkoduri.com
sudo chown $USER:$USER /var/www/pkoduri.com

# Upload files (using scp, rsync, or git)
scp -r ./* user@your-server:/var/www/pkoduri.com/
```

### 2. Run Automated Deployment

The `deploy-pkoduri.sh` script handles everything:

```bash
cd /var/www/pkoduri.com
sudo ./deploy-pkoduri.sh
```

This script will:
- ✅ Install dependencies and build the application
- ✅ Configure PM2 with the provided ecosystem.config.js
- ✅ Set up nginx configuration for pkoduri.com
- ✅ Configure log rotation
- ✅ Perform health checks

### 3. Manual Steps (if needed)

If you prefer manual deployment:

```bash
# 1. Install and build
npm ci --only=production
npm run build

# 2. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd

# 3. Configure nginx
sudo cp pkoduri-nginx.conf /etc/nginx/sites-available/pkoduri.com
sudo ln -s /etc/nginx/sites-available/pkoduri.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Nginx Configuration Details

The provided `pkoduri-nginx.conf` includes:
- **SSL/HTTPS**: Configured for your Let's Encrypt certificates
- **HTTP to HTTPS redirect**: All HTTP traffic redirected to HTTPS
- **Static file caching**: 1-year cache for assets, 1-hour for HTML
- **API rate limiting**: 10 requests/second for API endpoints
- **Security headers**: HSTS, CSP, X-Frame-Options, etc.
- **Gzip compression**: Optimized for your existing setup
- **React Router support**: Fallback handling for client-side routing

## PM2 Configuration

The `ecosystem.config.js` provides:
- **Single instance**: Appropriate for portfolio site traffic
- **Auto-restart**: Restarts on crashes with limits
- **Log management**: Structured logging to `/var/log/pm2/`
- **Memory limits**: 512MB memory restart threshold
- **Health monitoring**: Grace periods and restart conditions

## SSL Certificate Management

Your Let's Encrypt certificates are automatically configured:
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates (auto-renewal should be configured)
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

## Monitoring and Maintenance

### PM2 Commands
```bash
pm2 status                    # Check application status
pm2 logs pkoduri-portfolio   # View logs
pm2 restart pkoduri-portfolio # Restart app
pm2 monit                    # Real-time monitoring
pm2 reload pkoduri-portfolio # Zero-downtime reload
```

### Nginx Commands
```bash
sudo nginx -t               # Test configuration
sudo systemctl reload nginx # Reload configuration
sudo systemctl status nginx # Check nginx status
tail -f /var/log/nginx/access.log # Monitor access logs
```

### System Monitoring
```bash
# Check application response
curl -I https://pkoduri.com

# Monitor system resources
htop
df -h
free -h

# Check SSL certificate
openssl x509 -in /etc/letsencrypt/live/pkoduri.com/cert.pem -text -noout
```

## Updating the Application

For future updates:

```bash
# 1. Upload new files
cd /var/www/pkoduri.com

# 2. Install dependencies (if package.json changed)
npm ci --only=production

# 3. Build new version
npm run build

# 4. Restart application
pm2 restart pkoduri-portfolio

# 5. Clear nginx cache (if needed)
sudo nginx -s reload
```

## Security Considerations

The configuration includes:
- ✅ **HTTPS enforcement** with HSTS headers
- ✅ **Rate limiting** to prevent abuse
- ✅ **Security headers** for XSS and clickjacking protection
- ✅ **File access restrictions** for sensitive files
- ✅ **Non-root process execution** via PM2
- ✅ **Log rotation** to prevent disk space issues

## Troubleshooting

### Application Not Starting
```bash
# Check PM2 logs
pm2 logs pkoduri-portfolio

# Check if port 5000 is available
sudo lsof -i :5000

# Restart PM2 daemon
pm2 kill
pm2 resurrect
```

### Nginx Issues
```bash
# Test configuration
sudo nginx -t

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify SSL certificates
sudo certbot certificates
```

### SSL Certificate Issues
```bash
# Renew certificates
sudo certbot renew --nginx

# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/pkoduri.com/cert.pem -noout -dates
```

## Performance Optimization

Your configuration already includes:
- **Static file caching** with proper expires headers
- **Gzip compression** for text-based assets
- **HTTP/2 support** for faster loading
- **Keep-alive connections** for reduced latency
- **Optimized SSL configuration** for performance

## Backup Strategy

Recommended backup locations:
- **Application files**: `/var/www/pkoduri.com`
- **Nginx configuration**: `/etc/nginx/sites-available/pkoduri.com`
- **SSL certificates**: `/etc/letsencrypt/`
- **PM2 configuration**: `~/.pm2/`
- **Application logs**: `/var/log/pm2/`

## Contact Form Data

The application uses in-memory storage by default. For persistent contact form data, consider setting up PostgreSQL and updating the environment variables:

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createdb pkoduri_portfolio
sudo -u postgres createuser pkoduri_user

# Update .env file
echo "DATABASE_URL=postgresql://pkoduri_user:password@localhost:5432/pkoduri_portfolio" >> .env

# Restart application
pm2 restart pkoduri-portfolio
```

---

Your P.K. Koduri portfolio website is now optimized for your specific server configuration and ready for production deployment at https://pkoduri.com!