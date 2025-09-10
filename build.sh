#!/bin/bash

echo "Starting build process..."

# Install dependencies
echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd apps/backend
npm install

echo "Building backend..."
npm run vercel-build

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Building frontend..."
npm run build

echo "Build completed successfully!"
