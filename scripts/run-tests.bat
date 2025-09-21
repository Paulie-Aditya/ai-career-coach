@echo off
REM AI Career Coach - Complete Testing Script for Windows
REM Runs all tests for both frontend and backend

echo 🚀 AI Career Coach - Complete Testing Suite
echo ==============================================

REM Check if Python is installed
echo 🔍 Checking Python installation...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found
) else (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Check if Node.js is installed
echo 🔍 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js found
) else (
    echo ❌ Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

REM Check if npm is installed
echo 🔍 Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm found
) else (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)

REM Install Python dependencies
echo 🔍 Installing Python dependencies...
cd backend
pip install -r requirements.txt >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python dependencies installed
) else (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
cd ..

REM Install Node.js dependencies
echo 🔍 Installing Node.js dependencies...
cd frontend
npm install >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js dependencies installed
) else (
    echo ❌ Failed to install Node.js dependencies
    pause
    exit /b 1
)
cd ..

REM Check environment files
echo 🔍 Checking environment configuration...
if exist "backend\.env" (
    echo ✅ Backend .env file found
) else (
    echo ⚠️  Backend .env file not found. Please copy env_example.txt to .env and configure it
)

if exist "frontend\.env.local" (
    echo ✅ Frontend .env.local file found
) else (
    echo ⚠️  Frontend .env.local file not found. Please copy env_example.txt to .env.local and configure it
)

REM Start backend in background
echo 🔍 Starting backend server...
cd backend
start /B python main.py
cd ..

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Check if backend is running
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend server is running
) else (
    echo ❌ Backend server failed to start
    pause
    exit /b 1
)

REM Run backend tests
echo 🔍 Running backend tests...
python scripts/test-backend.py
if %errorlevel% equ 0 (
    echo ✅ Backend tests passed
) else (
    echo ❌ Backend tests failed
    pause
    exit /b 1
)

REM Start frontend in background
echo 🔍 Starting frontend server...
cd frontend
start /B npm run dev
cd ..

REM Wait for frontend to start
echo ⏳ Waiting for frontend to start...
timeout /t 10 /nobreak >nul

REM Check if frontend is running
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend server is running
) else (
    echo ❌ Frontend server failed to start
    pause
    exit /b 1
)

REM Run frontend tests
echo 🔍 Running frontend tests...
node scripts/test-frontend.js
if %errorlevel% equ 0 (
    echo ✅ Frontend tests passed
) else (
    echo ❌ Frontend tests failed
    pause
    exit /b 1
)

REM Final results
echo.
echo ==============================================
echo 🎉 All tests passed! AI Career Coach is ready for production.
echo.
echo To start the application:
echo 1. Backend: cd backend ^&^& python main.py
echo 2. Frontend: cd frontend ^&^& npm run dev
echo 3. Visit: http://localhost:3000
echo.
echo For more information, see:
echo - README.md - Project overview
echo - SETUP_GUIDE.md - Detailed setup instructions
echo - PROPOSAL.md - Project proposal and impact
echo.
pause
