// PM2 ecosystem configuration for P.K. Koduri Portfolio
// Run with: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'pkoduri-portfolio',
    script: './dist/index.js',
    cwd: '/var/www/pkoduri.com', // Update this path to your deployment directory
    
    // Environment variables
    env: {
      NODE_ENV: 'production',
      PORT: 5000,
    },
    
    // Process management
    instances: 1, // Single instance since it's a portfolio site
    exec_mode: 'fork', // Use fork mode for single instance
    
    // Auto-restart configuration
    autorestart: true,
    watch: false, // Don't watch files in production
    max_memory_restart: '512M',
    
    // Logging
    log_file: '/var/log/pm2/pkoduri-portfolio.log',
    out_file: '/var/log/pm2/pkoduri-portfolio-out.log',
    error_file: '/var/log/pm2/pkoduri-portfolio-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Advanced PM2 features
    listen_timeout: 10000,
    kill_timeout: 5000,
    
    // Health monitoring
    health_check_grace_period: 10000,
    
    // Process restart conditions
    min_uptime: '10s',
    max_restarts: 10,
    
    // Environment-specific settings
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000,
    }
  }]
};