# P.K. Koduri Portfolio - Production Deployment Checklist

## Pre-Deployment Checklist

### Server Requirements ✅
- [x] Ubuntu Linux server
- [x] Node.js v20.19.4 (latest LTS)
- [x] npm v11.5.2 (latest)
- [x] PM2 process manager installed
- [x] Nginx configured and running
- [x] UFW firewall (ports 22, 80, 443 open)
- [x] Let's Encrypt SSL for pkoduri.com

### Domain Configuration ✅
- [x] pkoduri.com DNS pointing to server
- [x] www.pkoduri.com DNS pointing to server
- [x] SSL certificates installed and valid

## Deployment Steps

### 1. Upload Files to Server
```bash
# Create deployment directory
sudo mkdir -p /var/www/pkoduri.com
sudo chown $USER:$USER /var/www/pkoduri.com

# Upload all project files
scp -r ./* user@your-server:/var/www/pkoduri.com/
```

### 2. Run Automated Deployment
```bash
cd /var/www/pkoduri.com
sudo ./deploy-pkoduri.sh
```

### 3. Verify Deployment
```bash
# Check PM2 status
pm2 status

# Check nginx status
sudo systemctl status nginx

# Test application response
curl -I https://pkoduri.com

# Check SSL certificate
openssl s_client -connect pkoduri.com:443 -servername pkoduri.com
```

## Post-Deployment Verification

### Application Health
- [ ] PM2 shows "online" status for pkoduri-portfolio
- [ ] Application responds on port 5000
- [ ] All pages load correctly
- [ ] Contact form functionality works
- [ ] Resume download works
- [ ] Theme switching works between Professional and Innovation Catalyst

### Web Server
- [ ] Nginx configuration valid (`sudo nginx -t`)
- [ ] HTTPS redirect working (http:// -> https://)
- [ ] SSL certificate valid and trusted
- [ ] Security headers present in response
- [ ] Static files loading with proper caching headers

### Performance
- [ ] Page load times under 3 seconds
- [ ] Lighthouse score > 90 for Performance
- [ ] Images optimized and loading quickly
- [ ] Gzip compression working for text assets

### SEO and Accessibility
- [ ] Meta descriptions present on all pages
- [ ] Proper heading structure (h1, h2, h3)
- [ ] Alt text on images
- [ ] Mobile responsiveness verified
- [ ] Social media preview working (Open Graph tags)

## Monitoring Setup

### Log Monitoring
```bash
# PM2 application logs
pm2 logs pkoduri-portfolio

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
journalctl -f
```

### Performance Monitoring
```bash
# Real-time PM2 monitoring
pm2 monit

# System resources
htop
df -h
free -h

# Network connections
ss -tuln
```

## Maintenance Commands

### Application Management
```bash
# Restart application
pm2 restart pkoduri-portfolio

# View application status
pm2 status

# View detailed info
pm2 show pkoduri-portfolio

# Save PM2 configuration
pm2 save
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx
```

### SSL Certificate Management
```bash
# Check certificate status
sudo certbot certificates

# Test auto-renewal
sudo certbot renew --dry-run

# Manual renewal (if needed)
sudo certbot renew --nginx
```

## Backup Procedures

### Before Major Updates
```bash
# Backup application directory
sudo tar -czf /backup/pkoduri-$(date +%Y%m%d).tar.gz /var/www/pkoduri.com

# Backup nginx configuration
sudo cp /etc/nginx/sites-available/pkoduri.com /backup/nginx-pkoduri-$(date +%Y%m%d).conf

# Backup SSL certificates
sudo tar -czf /backup/ssl-$(date +%Y%m%d).tar.gz /etc/letsencrypt
```

## Troubleshooting Guide

### Application Issues
```bash
# If application won't start
pm2 logs pkoduri-portfolio --lines 50
pm2 restart pkoduri-portfolio

# If port 5000 is busy
sudo lsof -i :5000
sudo kill -9 <PID>

# If build fails
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

### SSL Issues
```bash
# If SSL certificate expired
sudo certbot renew --nginx

# If certificate chain issues
sudo certbot certificates
sudo nginx -t
```

### Performance Issues
```bash
# Check system resources
top
df -h
free -h

# Check application memory usage
pm2 monit

# Restart if high memory usage
pm2 restart pkoduri-portfolio
```

## Security Checklist

- [x] HTTPS enforced with HSTS headers
- [x] Security headers configured (CSP, X-Frame-Options, etc.)
- [x] Rate limiting enabled for API endpoints
- [x] Firewall configured (UFW)
- [x] Non-root user for application process
- [x] Log rotation configured
- [x] SSL certificate auto-renewal enabled

## Success Criteria

✅ **Portfolio is live at https://pkoduri.com**
✅ **All functionality working correctly**
✅ **SSL certificate valid and trusted**
✅ **Performance optimized for fast loading**
✅ **Monitoring and logging in place**
✅ **Automated restart on failure**
✅ **Security best practices implemented**

---

## Emergency Contacts

- Server Provider: [Your hosting provider support]
- Domain Registrar: [Your domain registrar support]
- SSL Certificate: Let's Encrypt (automatic renewal)

## Next Steps After Deployment

1. Set up monitoring alerts (optional)
2. Configure automated backups
3. Set up analytics (Google Analytics, etc.)
4. Submit to search engines for indexing
5. Monitor performance and optimize as needed

Your P.K. Koduri portfolio website is ready for production deployment!