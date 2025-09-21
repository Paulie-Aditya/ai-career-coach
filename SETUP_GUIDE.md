# 🚀 AI Career Coach - Setup Guide

## Quick Start (5 minutes)

### Prerequisites

- Node.js 18+ installed
- Python 3.8+ installed
- Google Cloud account with Gemini API access

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd ai-career-coach

# Install all dependencies
npm run install-all
```

### 2. Backend Setup

```bash
cd backend

# Copy environment file
cp env_example.txt .env

# Edit .env with your API keys
# GEMINI_API_KEY=your_gemini_api_key_here

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python main.py
```

### 3. Frontend Setup

```bash
cd frontend

# Copy environment file
cp env_example.txt .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start the frontend server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 🔑 API Keys Setup

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### Additional Setup (Optional)

For advanced features and production deployment:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable additional APIs as needed
4. Configure production environment variables

## 🏗️ Development Commands

### Backend Commands

```bash
cd backend

# Run development server
python main.py

# Run with auto-reload
uvicorn main:app --reload --port 8000

# Install new dependencies
pip install package_name
pip freeze > requirements.txt
```

### Frontend Commands

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Full Stack Commands

```bash
# Run both frontend and backend
npm run dev

# Install all dependencies
npm run install-all
```

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'google'`
**Solution**:

```bash
pip install google-generativeai
```

**Problem**: `API key not found`
**Solution**:

- Check your `.env` file exists
- Verify `GEMINI_API_KEY` is set correctly
- Restart the backend server

**Problem**: `CORS error`
**Solution**:

- Check frontend URL is in CORS origins
- Verify backend is running on port 8000

#### Frontend Issues

**Problem**: `Cannot connect to backend`
**Solution**:

- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check network connectivity

**Problem**: `Build errors`
**Solution**:

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Problem**: `TypeScript errors`
**Solution**:

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Environment Variables

#### Backend (.env)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
ai-career-coach/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── env_example.txt        # Environment variables template
│   └── README.md              # Backend documentation
├── frontend/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── CareerForm.tsx     # Input form component
│   │   ├── CareerResults.tsx  # Results display
│   │   ├── LoadingSpinner.tsx # Loading component
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── lib/
│   │   └── api.ts             # API client functions
│   ├── package.json           # Node.js dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── next.config.js         # Next.js configuration
├── package.json               # Root package.json
├── PROPOSAL.md               # Project proposal
└── SETUP_GUIDE.md           # This file
```

## 🚀 Deployment

### Backend Deployment (Google Cloud Run)

```bash
# Build and deploy
gcloud run deploy career-coach-backend \
  --source backend \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Environment Variables for Production

- Set `GEMINI_API_KEY` in your deployment platform
- Update `NEXT_PUBLIC_API_URL` to your production backend URL
- Configure CORS origins for your production domain

## 📊 Monitoring & Logs

### Backend Logs

```bash
# View logs in development
python main.py

# View logs in production (Google Cloud Run)
gcloud logs read --service=career-coach-backend
```

### Frontend Logs

```bash
# View build logs
npm run build

# View runtime logs in browser console
# Check Network tab for API calls
```

## 🔧 Configuration

### Backend Configuration

- **Port**: 8000 (configurable in main.py)
- **CORS**: Configured for localhost:3000
- **API Rate Limiting**: None (add if needed)
- **Logging**: Basic Python logging

### Frontend Configuration

- **Port**: 3000 (Next.js default)
- **API Timeout**: 30 seconds
- **Error Handling**: Global error boundary
- **Loading States**: Custom loading components

## 📝 Development Tips

### Backend Development

- Use `uvicorn main:app --reload` for auto-reload
- Check API docs at http://localhost:8000/docs
- Test endpoints with Postman or curl
- Use Python type hints for better development experience

### Frontend Development

- Use `npm run dev` for hot reload
- Check browser console for errors
- Use React DevTools for debugging
- Test on different screen sizes

### Full Stack Development

- Start backend first, then frontend
- Use `npm run dev` to run both simultaneously
- Check both console logs for errors
- Test API integration thoroughly

## 🆘 Getting Help

### Common Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API Documentation](https://ai.google.dev/docs)

### Debugging Steps

1. Check all environment variables are set
2. Verify all services are running
3. Check console logs for errors
4. Test API endpoints individually
5. Verify network connectivity

### Support

- Check the GitHub issues page
- Review the troubleshooting section above
- Ensure all dependencies are installed correctly
- Verify API keys are valid and active

---

**Happy coding! 🎉**
