from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
import httpx
from datetime import datetime

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Career Coach API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

# Pydantic models
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

class Resource(BaseModel):
    title: str
    type: str  # "course", "book", "tutorial", "certification"
    url: str
    cost: str
    duration: str
    rating: Optional[float] = None

class SkillRoadmap(BaseModel):
    skill: Skill
    resources: List[Resource]

class CareerResponse(BaseModel):
    career_paths: List[CareerPath]
    skill_roadmap: List[SkillRoadmap]
    overall_recommendations: List[str]

@app.get("/")
async def root():
    return {"message": "AI Career Coach API is running!"}

@app.post("/career-advisor", response_model=CareerResponse)
async def get_career_advice(request: CareerRequest):
    try:
        # Create the prompt for Gemini
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
            "career_paths": [
                {{
                    "title": "Job Title",
                    "description": "Brief description of the role",
                    "why_fits": "Why this career fits the student's profile",
                    "salary_range": "Expected salary range in INR",
                    "growth_prospects": "Career growth potential and opportunities"
                }}
            ],
            "skill_roadmap": [
                {{
                    "skill": {{
                        "name": "Skill Name",
                        "category": "Technical/Soft/Industry-specific",
                        "priority": "short-term or long-term",
                        "difficulty": "Beginner/Intermediate/Advanced",
                        "time_to_learn": "Estimated time to learn"
                    }},
                    "resources": [
                        {{
                            "title": "Resource Title",
                            "type": "course/book/tutorial/certification",
                            "url": "https://example.com",
                            "cost": "Free/Paid amount",
                            "duration": "Time to complete",
                            "rating": 4.5
                        }}
                    ]
                }}
            ],
            "overall_recommendations": [
                "General advice and next steps"
            ]
        }}

        Focus on:
        1. 3 diverse career paths that match their profile
        2. 8-10 essential skills with learning resources
        3. Mix of short-term (3-6 months) and long-term (1-2 years) skills
        4. Include both free and paid resources
        5. Consider the Indian job market and emerging fields like AI, data science, green tech
        6. Provide practical, actionable advice

        Return only valid JSON without any markdown formatting.
        """

        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        # Parse the JSON response
        try:
            result = json.loads(response.text)
        except json.JSONDecodeError:
            # If JSON parsing fails, create a fallback response
            result = {
                "career_paths": [
                    {
                        "title": "Software Developer",
                        "description": "Develop applications and software solutions",
                        "why_fits": "Matches your technical interests and skills",
                        "salary_range": "₹4-12 LPA",
                        "growth_prospects": "High demand with excellent growth opportunities"
                    }
                ],
                "skill_roadmap": [
                    {
                        "skill": {
                            "name": "Programming Fundamentals",
                            "category": "Technical",
                            "priority": "short-term",
                            "difficulty": "Beginner",
                            "time_to_learn": "2-3 months"
                        },
                        "resources": [
                            {
                                "title": "Python for Beginners",
                                "type": "course",
                                "url": "https://www.coursera.org/learn/python",
                                "cost": "Free",
                                "duration": "4 weeks",
                                "rating": 4.5
                            }
                        ]
                    }
                ],
                "overall_recommendations": [
                    "Focus on building a strong foundation in programming",
                    "Create projects to showcase your skills",
                    "Network with professionals in your chosen field"
                ]
            }

        return CareerResponse(**result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating career advice: {str(e)}")


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
