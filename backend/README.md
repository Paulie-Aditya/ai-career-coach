# AI Career Coach Backend

FastAPI backend for the AI-Powered Career & Skills Advisor.

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

```bash
cp env_example.txt .env
# Edit .env with your actual API keys
```

3. Run the server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /career-advisor` - Get personalized career advice
- `GET /health` - Health check
- `GET /docs` - API documentation (Swagger UI)

## Environment Variables

- `GEMINI_API_KEY` - Google Gemini API key
