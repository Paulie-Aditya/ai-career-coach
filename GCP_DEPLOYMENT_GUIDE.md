# 🚀 GCP Deployment Guide - AI Career Coach

This guide will help you deploy the AI Career Coach application to Google Cloud Platform using Docker containers.

## 📋 Prerequisites

### 1. Google Cloud Platform Account

- Create a [Google Cloud Platform account](https://cloud.google.com/)
- Enable billing for your project
- Create a new project or select an existing one

### 2. Required Tools

- **Google Cloud SDK**: [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)
- **Docker**: [Install Docker Desktop](https://docs.docker.com/get-docker/)
- **Git**: [Install Git](https://git-scm.com/downloads)

### 3. API Keys

- **Google Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🏗️ Deployment Options

### Option 1: Cloud Run (Recommended)

**Best for**: Serverless deployment, automatic scaling, pay-per-use

### Option 2: App Engine

**Best for**: Traditional web applications, managed platform

### Option 3: Compute Engine

**Best for**: Full control, custom configurations

## 🚀 Quick Deployment (Cloud Run)

### Step 1: Clone and Setup

```bash
git clone <your-repo-url>
cd ai-career-coach
```

### Step 2: Set Environment Variables

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Set your Gemini API key
export GEMINI_API_KEY="your-gemini-api-key"
```

### Step 3: Deploy

```bash
# For Linux/Mac
./deploy.sh

# For Windows
deploy.bat
```

## 🔧 Manual Deployment Steps

### 1. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Build and Push Docker Image

```bash
# Build the image
docker build -t gcr.io/$PROJECT_ID/ai-career-coach .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/ai-career-coach
```

### 3. Deploy to Cloud Run

```bash
gcloud run deploy ai-career-coach \
    --image gcr.io/$PROJECT_ID/ai-career-coach \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 80 \
    --memory 2Gi \
    --cpu 2 \
    --max-instances 10 \
    --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
```

## 🐳 Docker Configuration

### Multi-Stage Build

The Dockerfile uses a multi-stage build process:

1. **Frontend Builder**: Builds the Next.js application
2. **Backend Builder**: Installs Python dependencies
3. **Production Image**: Combines everything with Nginx

### Key Features

- **Nginx Reverse Proxy**: Routes requests between frontend and backend
- **Supervisor Process Manager**: Manages both Nginx and FastAPI processes
- **Health Checks**: Built-in health monitoring
- **Optimized Size**: Multi-stage build reduces final image size

## 📊 Monitoring and Logs

### View Logs

```bash
# Cloud Run logs
gcloud run logs tail ai-career-coach --region=us-central1

# Specific service logs
gcloud run logs tail ai-career-coach --region=us-central1 --service=ai-career-coach
```

### Monitor Performance

- **Cloud Console**: [Cloud Run Console](https://console.cloud.google.com/run)
- **Cloud Monitoring**: Built-in metrics and alerts
- **Cloud Logging**: Centralized log management

## 🔒 Security Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
NEXT_PUBLIC_API_URL=https://your-service-url.run.app
```

### IAM Permissions

```bash
# Grant Cloud Run Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:your-email@example.com" \
    --role="roles/run.admin"

# Grant Cloud Build Editor role
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="user:your-email@example.com" \
    --role="roles/cloudbuild.builds.editor"
```

## 💰 Cost Optimization

### Cloud Run Pricing

- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GB-second
- **Requests**: $0.40 per million requests

### Optimization Tips

1. **Set Memory Limits**: Use appropriate memory allocation
2. **Configure Scaling**: Set min/max instances based on usage
3. **Use Preemptible Instances**: For development/testing
4. **Monitor Usage**: Use Cloud Monitoring to track costs

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Check build logs
gcloud builds log --stream

# Verify Dockerfile syntax
docker build --no-cache -t test-image .
```

#### 2. Runtime Errors

```bash
# Check service logs
gcloud run logs tail ai-career-coach --region=us-central1

# Verify environment variables
gcloud run services describe ai-career-coach --region=us-central1
```

#### 3. Health Check Failures

```bash
# Test health endpoint
curl https://your-service-url.run.app/health

# Check service status
gcloud run services describe ai-career-coach --region=us-central1
```

### Debug Commands

```bash
# Test locally
docker run -p 80:80 -e GEMINI_API_KEY=$GEMINI_API_KEY gcr.io/$PROJECT_ID/ai-career-coach

# Check container logs
docker logs <container-id>

# Inspect container
docker exec -it <container-id> /bin/bash
```

## 🔄 CI/CD Pipeline

### Using Cloud Build

```bash
# Trigger build
gcloud builds submit --config cloudbuild.yaml

# View build history
gcloud builds list
```

### GitHub Actions (Optional)

```yaml
name: Deploy to GCP
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v0
        with:
          service: ai-career-coach
          image: gcr.io/${{ secrets.PROJECT_ID }}/ai-career-coach
          region: us-central1
```

## 📈 Scaling Configuration

### Automatic Scaling

```bash
gcloud run services update ai-career-coach \
    --region=us-central1 \
    --min-instances=1 \
    --max-instances=10 \
    --cpu-throttling
```

### Manual Scaling

```bash
# Scale to specific number of instances
gcloud run services update ai-career-coach \
    --region=us-central1 \
    --concurrency=1000 \
    --max-instances=5
```

## 🎯 Production Checklist

- [ ] ✅ Set up monitoring and alerting
- [ ] ✅ Configure custom domain (optional)
- [ ] ✅ Set up SSL certificates
- [ ] ✅ Configure backup strategies
- [ ] ✅ Set up log aggregation
- [ ] ✅ Configure security policies
- [ ] ✅ Test disaster recovery
- [ ] ✅ Set up cost monitoring
- [ ] ✅ Configure performance monitoring
- [ ] ✅ Set up automated deployments

## 📞 Support

### Resources

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

### Getting Help

- **Google Cloud Support**: [Cloud Support](https://cloud.google.com/support)
- **Community Forums**: [Google Cloud Community](https://cloud.google.com/community)
- **Stack Overflow**: Tag questions with `google-cloud-platform`

---

## 🎉 Success!

Once deployed, your AI Career Coach will be available at:
`https://your-service-name-xxxxx-uc.a.run.app`

Monitor your deployment and enjoy your AI-powered career guidance platform! 🚀
