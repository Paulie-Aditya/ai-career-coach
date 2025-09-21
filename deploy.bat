@echo off
REM AI Career Coach - GCP Deployment Script for Windows
REM This script deploys the AI Career Coach to Google Cloud Platform

setlocal enabledelayedexpansion

echo 🚀 AI Career Coach - GCP Deployment Script
echo ==================================================

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ gcloud CLI is not installed. Please install it first.
    echo Visit: https://cloud.google.com/sdk/docs/install
    exit /b 1
)

REM Check if docker is installed
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install it first.
    echo Visit: https://docs.docker.com/get-docker/
    exit /b 1
)

REM Get project ID
set /p PROJECT_ID="📝 Enter your Google Cloud Project ID: "
if "%PROJECT_ID%"=="" (
    echo ❌ Project ID is required
    exit /b 1
)

set IMAGE_NAME=gcr.io/%PROJECT_ID%/ai-career-coach

REM Set the project
echo 🔧 Setting project to %PROJECT_ID%
gcloud config set project %PROJECT_ID%

REM Enable required APIs
echo 🔧 Enabling required APIs...
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

REM Check if GEMINI_API_KEY is set
if "%GEMINI_API_KEY%"=="" (
    echo ⚠️  GEMINI_API_KEY environment variable is not set.
    echo Please set it before running the deployment:
    echo set GEMINI_API_KEY=your_api_key_here
    exit /b 1
)

REM Build the Docker image
echo 🔨 Building Docker image...
docker build -t %IMAGE_NAME% .

REM Push the image to Container Registry
echo 📤 Pushing image to Container Registry...
docker push %IMAGE_NAME%

REM Deploy to Cloud Run
echo 🚀 Deploying to Cloud Run...
gcloud run deploy ai-career-coach ^
    --image %IMAGE_NAME% ^
    --region us-central1 ^
    --platform managed ^
    --allow-unauthenticated ^
    --port 80 ^
    --memory 2Gi ^
    --cpu 2 ^
    --max-instances 10 ^
    --set-env-vars GEMINI_API_KEY=%GEMINI_API_KEY%

REM Get the service URL
for /f "tokens=*" %%i in ('gcloud run services describe ai-career-coach --region=us-central1 --format="value(status.url)"') do set SERVICE_URL=%%i

echo ✅ Deployment completed successfully!
echo 🌐 Service URL: %SERVICE_URL%
echo 📊 Monitor your service at: https://console.cloud.google.com/run

REM Test the deployment
echo 🧪 Testing deployment...
curl -f "%SERVICE_URL%/health" >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Health check passed!
) else (
    echo ⚠️  Health check failed. Please check the logs.
    echo View logs: gcloud run logs tail ai-career-coach --region=us-central1
)

echo 🎉 AI Career Coach is now live at: %SERVICE_URL%
pause
