#!/bin/bash

# Build script for Speedex website - Generates platform-specific versions
# Author: Speedex Team
# Date: 2025-11-02

set -e  # Exit on error

echo "🚀 Building Speedex Website for Multiple Platforms..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URLs for different platforms
CLOUDFLARE_URL="https://extincteurspeedex.ca"
GITHUB_URL="https://salahkhalfi.github.io/Speedex-website"

# Directories
SOURCE_DIR="."
DIST_DIR="dist"
GITHUB_DIR="docs"

# ========================================
# FUNCTION: Build for Platform
# ========================================
build_for_platform() {
    local platform=$1
    local base_url=$2
    local output_dir=$3
    
    echo -e "${BLUE}📦 Building for ${platform}...${NC}"
    
    # Create output directory
    mkdir -p "${output_dir}"
    
    # Copy all files except build artifacts
    echo "  ├─ Copying files..."
    
    # Copy static files
    cp -r css js images "${output_dir}/" 2>/dev/null || true
    cp index.html index-en.html "${output_dir}/" 2>/dev/null || true
    cp *.png *.jpg *.ico "${output_dir}/" 2>/dev/null || true
    
    # Replace URLs in HTML files
    echo "  ├─ Updating URLs to ${base_url}..."
    
    # For index.html (French)
    sed -i "s|https://extincteurspeedex\.ca/|${base_url}/|g" "${output_dir}/index.html"
    sed -i "s|https://salahkhalfi\.github\.io/Speedex-website/|${base_url}/|g" "${output_dir}/index.html"
    
    # For index-en.html (English)
    sed -i "s|https://extincteurspeedex\.ca/|${base_url}/|g" "${output_dir}/index-en.html"
    sed -i "s|https://salahkhalfi\.github\.io/Speedex-website/|${base_url}/|g" "${output_dir}/index-en.html"
    
    echo -e "  └─ ${GREEN}✓ Build complete for ${platform}${NC}"
    echo ""
}

# ========================================
# MAIN BUILD PROCESS
# ========================================

echo -e "${YELLOW}🧹 Cleaning old builds...${NC}"
rm -rf "${DIST_DIR}" "${GITHUB_DIR}"
echo ""

# Build for Cloudflare Pages
build_for_platform "Cloudflare Pages" "${CLOUDFLARE_URL}" "${DIST_DIR}"

# Build for GitHub Pages
build_for_platform "GitHub Pages" "${GITHUB_URL}" "${GITHUB_DIR}"

# ========================================
# SUMMARY
# ========================================
echo ""
echo -e "${GREEN}✅ Build Summary:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "📁 ${BLUE}dist/${NC}   → Cloudflare Pages (${CLOUDFLARE_URL})"
echo -e "📁 ${BLUE}docs/${NC} → GitHub Pages (${GITHUB_URL})"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Deploy to Cloudflare: npx wrangler pages deploy dist --project-name speedex"
echo "  2. Deploy to GitHub: git add docs/ && git commit -m 'Update GitHub Pages' && git push"
echo ""
