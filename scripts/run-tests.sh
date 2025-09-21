#!/bin/bash

# AI Career Coach - Complete Testing Script
# Runs all tests for both frontend and backend

set -e  # Exit on any error

echo "🚀 AI Career Coach - Complete Testing Suite"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

# Check if Python is installed
echo "🔍 Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1)
    print_status "Python found: $PYTHON_VERSION" 0
else
    print_status "Python not found. Please install Python 3.8+" 1
    exit 1
fi

# Check if Node.js is installed
echo "🔍 Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version 2>&1)
    print_status "Node.js found: $NODE_VERSION" 0
else
    print_status "Node.js not found. Please install Node.js 18+" 1
    exit 1
fi

# Check if npm is installed
echo "🔍 Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version 2>&1)
    print_status "npm found: $NPM_VERSION" 0
else
    print_status "npm not found. Please install npm" 1
    exit 1
fi

# Check if pip is installed
echo "🔍 Checking pip installation..."
if command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version 2>&1)
    print_status "pip found: $PIP_VERSION" 0
else
    print_status "pip not found. Please install pip" 1
    exit 1
fi

# Install Python dependencies
echo "🔍 Installing Python dependencies..."
cd backend
if pip3 install -r requirements.txt &> /dev/null; then
    print_status "Python dependencies installed" 0
else
    print_status "Failed to install Python dependencies" 1
    exit 1
fi
cd ..

# Install Node.js dependencies
echo "🔍 Installing Node.js dependencies..."
cd frontend
if npm install &> /dev/null; then
    print_status "Node.js dependencies installed" 0
else
    print_status "Failed to install Node.js dependencies" 1
    exit 1
fi
cd ..

# Check environment files
echo "🔍 Checking environment configuration..."
if [ -f "backend/.env" ]; then
    print_status "Backend .env file found" 0
else
    echo -e "${YELLOW}⚠️  Backend .env file not found. Please copy env_example.txt to .env and configure it${NC}"
fi

if [ -f "frontend/.env.local" ]; then
    print_status "Frontend .env.local file found" 0
else
    echo -e "${YELLOW}⚠️  Frontend .env.local file not found. Please copy env_example.txt to .env.local and configure it${NC}"
fi

# Start backend in background
echo "🔍 Starting backend server..."
cd backend
python3 main.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if curl -s http://localhost:8000/health &> /dev/null; then
    print_status "Backend server is running" 0
else
    print_status "Backend server failed to start" 1
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Run backend tests
echo "🔍 Running backend tests..."
if python3 scripts/test-backend.py; then
    print_status "Backend tests passed" 0
else
    print_status "Backend tests failed" 1
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Start frontend in background
echo "🔍 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 10

# Check if frontend is running
if curl -s http://localhost:3000 &> /dev/null; then
    print_status "Frontend server is running" 0
else
    print_status "Frontend server failed to start" 1
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 1
fi

# Run frontend tests
echo "🔍 Running frontend tests..."
if node scripts/test-frontend.js; then
    print_status "Frontend tests passed" 0
else
    print_status "Frontend tests failed" 1
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 1
fi

# Cleanup
echo "🔍 Cleaning up..."
kill $BACKEND_PID 2>/dev/null || true
kill $FRONTEND_PID 2>/dev/null || true

# Final results
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 All tests passed! AI Career Coach is ready for production.${NC}"
echo ""
echo "To start the application:"
echo "1. Backend: cd backend && python3 main.py"
echo "2. Frontend: cd frontend && npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "For more information, see:"
echo "- README.md - Project overview"
echo "- SETUP_GUIDE.md - Detailed setup instructions"
echo "- PROPOSAL.md - Project proposal and impact"
echo ""
