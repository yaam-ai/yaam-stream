#!/bin/bash

# YAAM Stream - Starter Script
# Automatically sets up and starts the website

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BOLD}${CYAN}"
echo "════════════════════════════════════════"
echo "   🚀 YAAM Stream Website Starter"
echo "════════════════════════════════════════"
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo -e "${YELLOW}Please install Node.js 16+ from https://nodejs.org${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}✗ Node.js version 16+ is required${NC}"
    echo -e "${YELLOW}Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v) detected${NC}\n"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}\n"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}\n"
fi

# Build the project if dist folder doesn't exist or is outdated
if [ ! -d "dist" ] || [ ! -f "dist/index.js" ]; then
    echo -e "${YELLOW}🔨 Building project...${NC}"
    npm run build
    echo -e "${GREEN}✓ Build completed successfully${NC}\n"
else
    # Check if source files are newer than dist
    if [ "src" -nt "dist" ]; then
        echo -e "${YELLOW}🔨 Source files changed, rebuilding...${NC}"
        npm run build
        echo -e "${GREEN}✓ Build completed successfully${NC}\n"
    else
        echo -e "${GREEN}✓ Build is up to date${NC}\n"
    fi
fi

# Start the demo server
echo -e "${CYAN}🌐 Starting website...${NC}"
echo -e "${BOLD}─────────────────────────────────────────${NC}"
echo -e "${GREEN}"
echo "   Website will be available at:"
echo -e "   ${BOLD}http://localhost:3000${NC}"
echo -e "${BOLD}─────────────────────────────────────────${NC}\n"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}\n"

# Run the demo server
node demo-server.js
