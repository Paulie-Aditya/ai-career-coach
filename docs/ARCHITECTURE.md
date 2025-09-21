# 🏗️ AI Career Coach - Technical Architecture

## System Overview

The AI Career Coach is built as a modern, scalable web application with a clear separation between frontend and backend services. The architecture follows microservices principles and is designed for cloud deployment.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (Gemini AI)   │
│   Port: 3000    │    │   Port: 8000    │    │   Google Cloud  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface│    │   API Gateway   │    │   AI Processing │
│   - Forms       │    │   - REST APIs   │    │   - Career      │
│   - Results     │    │   - CORS        │    │     Analysis    │
│   - Navigation  │    │   - Validation  │    │   - Skill       │
└─────────────────┘    └─────────────────┘    │     Mapping     │
                                               │   - Resource    │
                                               │     Curation    │
                                               └─────────────────┘
```

## Frontend Architecture (Next.js)

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Component Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page with routing logic
│   └── api/                 # API route handlers
├── components/
│   ├── CareerForm.tsx       # Input form component
│   ├── CareerResults.tsx    # Results display component
│   ├── LoadingSpinner.tsx   # Loading state component
│   ├── ErrorBoundary.tsx    # Error handling component
│   └── Toast.tsx            # Notification component
├── lib/
│   └── api.ts               # API client functions
└── public/                  # Static assets
```

### Key Features

- **Server-Side Rendering**: Improved SEO and performance
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Global error boundary and toast notifications
- **Loading States**: Smooth user experience during API calls

## Backend Architecture (FastAPI)

### Technology Stack

- **Framework**: FastAPI
- **Language**: Python 3.8+
- **AI Integration**: Google Gemini Pro
- **Data Validation**: Pydantic
- **HTTP Client**: httpx
- **Environment**: python-dotenv

### API Structure

```
backend/
├── main.py                  # FastAPI application entry point
├── requirements.txt         # Python dependencies
├── env_example.txt         # Environment variables template
└── README.md               # Backend documentation
```

### API Endpoints

```python
# Career Analysis
POST /career-advisor
- Input: CareerRequest (skills, interests, education, etc.)
- Output: CareerResponse (career paths, skill roadmap, resources)

# Time Management
POST /time-management
- Input: Skill roadmap data
- Output: Learning timeline and milestones

# Health Check
GET /health
- Output: System status and timestamp
```

### Data Models

```python
class CareerRequest(BaseModel):
    skills: List[str]
    interests: List[str]
    education: str
    experience_level: Optional[str] = "beginner"
    location: Optional[str] = "India"

class CareerPath(BaseModel):
    title: str
    description: str
    why_fits: str
    salary_range: str
    growth_prospects: str

class Skill(BaseModel):
    name: str
    category: str
    priority: str  # "short-term" or "long-term"
    difficulty: str
    time_to_learn: str
```

## AI Integration (Google Gemini)

### AI Processing Flow

1. **Input Processing**: User profile data is structured
2. **Prompt Engineering**: Sophisticated prompts for Gemini AI
3. **AI Analysis**: Gemini processes the input and generates recommendations
4. **Response Parsing**: JSON response is parsed and validated
5. **Fallback Handling**: Graceful degradation if AI fails

### Prompt Engineering

```python
prompt = f"""
You are an expert career counselor specializing in the Indian job market.
Analyze the following student profile and provide personalized career guidance:

Student Profile:
- Skills: {', '.join(request.skills)}
- Interests: {', '.join(request.interests)}
- Education: {request.education}
- Experience Level: {request.experience_level}
- Location: {request.location}

Please provide a comprehensive career analysis in the following JSON format:
{{
    "career_paths": [...],
    "skill_roadmap": [...],
    "overall_recommendations": [...]
}}
"""
```

## Data Flow

### 1. User Input

```
User fills form → Form validation → Data structuring → API call
```

### 2. AI Processing

```
API receives data → Prompt generation → Gemini AI analysis → Response parsing
```

### 3. Results Display

```
Structured data → Frontend rendering → Interactive UI → User actions
```

### 4. Time Management

```
Skill roadmap → Timeline generation → Milestone tracking → Progress monitoring
```

## Security Considerations

### API Security

- **CORS Configuration**: Restricted to frontend domains
- **Input Validation**: Pydantic models for data validation
- **Error Handling**: Graceful error responses without sensitive data
- **Rate Limiting**: (To be implemented) Prevent abuse

### Data Privacy

- **No Data Storage**: User data is not persisted
- **API Key Security**: Environment variables for sensitive data
- **HTTPS Only**: Secure communication in production
- **Input Sanitization**: Prevent injection attacks

## Performance Optimization

### Frontend Optimizations

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js image optimization
- **Caching**: Browser caching for static assets
- **Lazy Loading**: Components loaded on demand

### Backend Optimizations

- **Async Processing**: FastAPI async/await
- **Connection Pooling**: HTTP client connection reuse
- **Response Caching**: (To be implemented) Cache AI responses
- **Load Balancing**: (To be implemented) Multiple instances

## Scalability Design

### Horizontal Scaling

- **Stateless Backend**: No session storage
- **Load Balancer Ready**: Multiple backend instances
- **Database Free**: No database dependencies
- **Cloud Native**: Designed for cloud deployment

### Vertical Scaling

- **Resource Monitoring**: CPU and memory usage tracking
- **Auto Scaling**: (To be implemented) Based on demand
- **Performance Metrics**: Response time monitoring
- **Error Tracking**: Comprehensive logging

## Deployment Architecture

### Development Environment

```
Local Machine:
├── Frontend (localhost:3000)
├── Backend (localhost:8000)
└── Environment Variables (.env files)
```

### Production Environment

```
Google Cloud Platform:
├── Frontend (Vercel/Netlify)
├── Backend (Google Cloud Run)
├── AI Services (Google Gemini API)
└── CDN (Global content delivery)
```

## Monitoring and Logging

### Application Monitoring

- **Health Checks**: `/health` endpoint
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time tracking
- **Usage Analytics**: (To be implemented) User behavior tracking

### Logging Strategy

- **Structured Logging**: JSON format for easy parsing
- **Log Levels**: DEBUG, INFO, WARNING, ERROR
- **Centralized Logging**: (To be implemented) Cloud logging
- **Alert System**: (To be implemented) Error notifications

## Future Enhancements

### Phase 2 Architecture

- **Database Integration**: PostgreSQL for user data
- **Authentication**: JWT-based user authentication
- **Caching Layer**: Redis for response caching
- **Message Queue**: Celery for background tasks

### Phase 3 Architecture

- **Microservices**: Split into multiple services
- **API Gateway**: Kong or similar for API management
- **Service Mesh**: Istio for service communication
- **Event Streaming**: Apache Kafka for real-time updates

## Development Workflow

### Local Development

1. **Backend First**: Start FastAPI server
2. **Frontend Second**: Start Next.js development server
3. **API Testing**: Use Swagger UI at `/docs`
4. **Integration Testing**: Full stack testing

### CI/CD Pipeline

1. **Code Quality**: Linting and type checking
2. **Testing**: Unit and integration tests
3. **Building**: Docker containerization
4. **Deployment**: Automated deployment to cloud

---

_This architecture is designed for scalability, maintainability, and performance while keeping the initial implementation simple and focused._
