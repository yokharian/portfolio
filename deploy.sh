#!/bin/bash

# Portfolio Deployment Script
# This script builds the site and prepares it for deployment

set -e

echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the site
echo "🔨 Building the site..."
npm run build

# Copy assets to dist (fix for Astro not copying public assets)
echo "📁 Copying public assets..."
cp -r src/public/assets dist/ 2>/dev/null || true

# Verify build
echo "✅ Verifying build..."
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed: index.html not found"
    exit 1
fi

echo "✅ Build successful!"
echo "📊 Build statistics:"
echo "   - Pages: $(find dist -name "*.html" | wc -l)"
echo "   - Total size: $(du -sh dist | cut -f1)"

echo ""
echo "🎉 Ready for deployment!"
echo "   - Upload the 'dist' directory to your hosting provider"
echo "   - Or use: npm run preview to test locally"
