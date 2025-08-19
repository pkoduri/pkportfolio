# P.K. Koduri Portfolio Website

## Overview

This is a choice-driven portfolio website for P.K. Koduri, a medical device marketing professional. The application presents visitors with two distinct narrative paths - "Clinical Excellence" (professional theme) and "Innovation Catalyst" (disruptor theme) - allowing them to experience the portfolio through their preferred lens. Built as a full-stack React application with a Node.js/Express backend, it features a modern UI design system, contact form functionality, and resume download capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern component-based architecture using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds
- **Routing**: Wouter for lightweight client-side routing with custom state management for theme switching
- **State Management**: React's built-in state management with Context API for theme provider
- **UI Framework**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS styling
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Data Fetching**: TanStack Query for server state management and API interactions

### Styling and Design System
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Theme System**: Dual-theme architecture supporting "professional" (blue) and "disruptor" (dark/pink) variants
- **Design Tokens**: CSS custom properties for consistent color schemes, typography, and spacing
- **Component Library**: Comprehensive UI component system with variants and consistent styling patterns

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging, error handling, and request parsing
- **Storage Layer**: Abstract storage interface with in-memory implementation (MemStorage)
- **API Endpoints**: Contact form submission, contact retrieval, and resume download functionality
- **Development Integration**: Vite middleware integration for seamless development experience

### Data Layer
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions for users and contacts
- **Type Safety**: Full type safety from database to frontend using Drizzle's type inference
- **Validation**: Zod schemas for runtime validation of API requests and form data
- **Database Configuration**: Configured for PostgreSQL with Neon database integration

### Build and Development
- **Development Mode**: Hot module replacement with Vite dev server integration
- **Production Build**: Client-side assets built with Vite, server bundled with esbuild
- **TypeScript Configuration**: Strict type checking with path mapping for clean imports
- **Asset Handling**: Static asset serving with proper caching headers

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with functional components, React Hook Form, TanStack Query
- **Build Tools**: Vite for frontend bundling, esbuild for server bundling, TypeScript compiler
- **UI Libraries**: Radix UI primitives, Lucide React icons, class-variance-authority for component variants

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL provider via @neondatabase/serverless
- **Database Migration**: Drizzle Kit for schema management and migrations

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **CSS Processing**: Autoprefixer for browser compatibility
- **Font Integration**: Google Fonts (Inter, DM Sans, Geist Mono) for typography

### Development Tools
- **Replit Integration**: Replit-specific plugins for development environment integration
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Date Handling**: date-fns for date manipulation and formatting
- **Utility Libraries**: clsx and tailwind-merge for conditional class composition

## Deployment Configuration

### Self-Hosting Readiness
The application is fully configured for deployment on any server infrastructure:

- **Production Build**: Optimized builds with `npm run build` creating client assets in `dist/public/` and server bundle in `dist/index.js`
- **Docker Support**: Complete Dockerfile and docker-compose.yml for containerized deployment
- **Nginx Configuration**: Production-ready reverse proxy configuration with SSL, gzip compression, and security headers
- **Process Management**: Systemd service files and PM2 configuration for production process management
- **Environment Configuration**: Production environment variables and configuration management
- **Deployment Automation**: Shell script (`deploy.sh`) for automated deployment process

### Deployment Options
1. **Direct Server Deployment**: Traditional server setup with Node.js, systemd service, and nginx reverse proxy
2. **Docker Deployment**: Containerized deployment with Docker and docker-compose
3. **Nginx Reverse Proxy**: Production-grade web server configuration with SSL termination
4. **Process Management**: Multiple options including systemd, PM2, and Docker for application lifecycle management

### Security Features
- SSL/TLS configuration with modern cipher suites
- Security headers (X-Frame-Options, CSP, etc.)
- Rate limiting and request throttling
- Non-root container user for Docker deployments
- Environment variable security practices

## Production Deployment Status

### Deployment Ready for pkoduri.com
The portfolio website is fully prepared for production deployment on Ubuntu server infrastructure:

- **Custom Configuration Files**: nginx config for pkoduri.com domain with Let's Encrypt SSL integration
- **Process Management**: PM2 ecosystem configuration optimized for Node.js v20.19.4
- **Automated Deployment**: Complete deployment script (`deploy-pkoduri.sh`) for one-command setup
- **Monitoring Setup**: Structured logging, health checks, and performance monitoring
- **Security Implementation**: HTTPS enforcement, rate limiting, security headers, and firewall configuration
- **Maintenance Documentation**: Comprehensive guides for updates, troubleshooting, and monitoring

### Production Features Implemented
- **Performance Optimization**: Static file caching (1-year assets, 1-hour HTML), gzip compression, HTTP/2
- **Security Hardening**: HSTS headers, CSP, rate limiting (10 req/s API, 50 req/s static), SSL/TLS best practices  
- **Reliability**: Auto-restart on failure, memory limits, health monitoring, log rotation
- **Scalability**: Optimized for portfolio traffic patterns with appropriate resource allocation

The website is ready for immediate deployment to https://pkoduri.com with professional-grade infrastructure.