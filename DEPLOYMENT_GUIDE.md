# Task Manager - Vercel Deployment Guide

This guide will help you deploy the full-stack Task Manager application to Vercel with proper frontend-backend integration.

## Prerequisites

1. A Vercel account
2. A PostgreSQL database (we recommend Neon, Supabase, or PlanetScale)
3. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables Setup

### Backend Environment Variables
Set these in your Vercel dashboard under Environment Variables:

```bash
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
REFRESH_JWT_SECRET=your_super_secret_refresh_jwt_key_here
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=604800
JWT_TOKEN_AUDIENCE=https://your-vercel-app.vercel.app
JWT_TOKEN_ISSUER=https://your-vercel-app.vercel.app

# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require&pgbouncer=true&connection_limit=10&pool_timeout=20
DIRECT_URL=postgresql://username:password@host:port/database?sslmode=require

# Application Configuration
PORT=4001
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Obtaining Database URLs

#### Option 1: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection strings:
   - Use the "Pooled connection" URL for `DATABASE_URL`
   - Use the "Direct connection" URL for `DIRECT_URL`

#### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string and modify it for both URLs

## Deployment Steps

### Step 1: Prepare Your Repository
1. Ensure all changes are committed and pushed to your Git repository
2. Make sure the `vercel.json` configuration is in the root of your project

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (handled by vercel.json)

### Step 3: Configure Environment Variables
1. In your Vercel project dashboard, go to "Settings" > "Environment Variables"
2. Add all the backend environment variables listed above
3. Make sure to replace placeholder values with your actual values
4. Set the environment for each variable to "Production", "Preview", and "Development"

### Step 4: Database Setup
1. After setting up your database, you need to run migrations
2. In your Vercel project, go to "Settings" > "Functions"
3. You can either:
   - Run migrations locally with your production database URL, or
   - Set up a deployment script that runs migrations

### Step 5: Update Frontend URLs (if needed)
The frontend is configured to automatically use the correct URLs in production. However, if you need to override them:

1. Create a `.env.production` file in `apps/frontend/` (not committed to git)
2. Set the environment variables:
```bash
VITE_API_URL=https://your-vercel-app.vercel.app/api
VITE_API_REGISTER=https://your-vercel-app.vercel.app/api/auth/register
# ... etc
```

## Testing the Deployment

1. Wait for the deployment to complete
2. Visit your Vercel app URL
3. Test the following functionality:
   - User registration
   - User login
   - Creating workspaces
   - Creating boards
   - Adding lists and cards
   - All CRUD operations

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your DATABASE_URL and DIRECT_URL are correct
   - Ensure your database allows connections from Vercel's IP ranges

2. **JWT Token Issues**
   - Verify JWT_SECRET and REFRESH_JWT_SECRET are set
   - Check that JWT_TOKEN_AUDIENCE and JWT_TOKEN_ISSUER match your domain

3. **CORS Errors**
   - The backend is pre-configured to allow Vercel domains
   - If you have custom domains, add them to the CORS configuration

4. **Build Failures**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are properly listed in package.json files

### Migration Commands

To run database migrations manually:

```bash
# Install dependencies
npm install

# Run migrations
cd apps/backend
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Production Checklist

- [ ] Environment variables are set correctly
- [ ] Database is set up and accessible
- [ ] Migrations have been run
- [ ] JWT secrets are secure and unique
- [ ] Domain URLs are updated in environment variables
- [ ] All features are tested in production
- [ ] HTTPS is enabled (automatic with Vercel)

## Support

If you encounter any issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are set
3. Test database connectivity
4. Check browser console for frontend errors

Your Task Manager application should now be fully deployed and functional on Vercel!
