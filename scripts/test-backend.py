#!/usr/bin/env python3
"""
Backend Testing Script for AI Career Coach
Tests all API endpoints and validates responses
"""

import requests
import json
import time
import sys
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost:8000"
TEST_DATA = {
    "skills": ["Python", "Communication", "Data Analysis"],
    "interests": ["Technology", "Healthcare", "Finance"],
    "education": "Bachelor's Degree",
    "experience_level": "beginner",
    "location": "India"
}

def test_health_endpoint() -> bool:
    """Test the health check endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['status']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_career_advisor_endpoint() -> bool:
    """Test the career advisor endpoint"""
    print("🔍 Testing career advisor endpoint...")
    try:
        response = requests.post(
            f"{BASE_URL}/career-advisor",
            json=TEST_DATA,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            
            # Validate response structure
            required_fields = ["career_paths", "skill_roadmap", "overall_recommendations"]
            for field in required_fields:
                if field not in data:
                    print(f"❌ Missing required field: {field}")
                    return False
            
            # Validate career paths
            if not isinstance(data["career_paths"], list) or len(data["career_paths"]) == 0:
                print("❌ Invalid career_paths format")
                return False
            
            # Validate skill roadmap
            if not isinstance(data["skill_roadmap"], list) or len(data["skill_roadmap"]) == 0:
                print("❌ Invalid skill_roadmap format")
                return False
            
            print(f"✅ Career advisor test passed")
            print(f"   - Career paths: {len(data['career_paths'])}")
            print(f"   - Skills: {len(data['skill_roadmap'])}")
            print(f"   - Recommendations: {len(data['overall_recommendations'])}")
            return True
        else:
            print(f"❌ Career advisor failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Career advisor error: {e}")
        return False


def test_cors_headers() -> bool:
    """Test CORS headers"""
    print("🔍 Testing CORS headers...")
    try:
        response = requests.options(f"{BASE_URL}/career-advisor", timeout=10)
        cors_headers = [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Headers"
        ]
        
        for header in cors_headers:
            if header not in response.headers:
                print(f"❌ Missing CORS header: {header}")
                return False
        
        print("✅ CORS headers test passed")
        return True
    except Exception as e:
        print(f"❌ CORS headers error: {e}")
        return False

def run_performance_test() -> bool:
    """Run a basic performance test"""
    print("🔍 Running performance test...")
    try:
        start_time = time.time()
        response = requests.post(
            f"{BASE_URL}/career-advisor",
            json=TEST_DATA,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        end_time = time.time()
        
        response_time = end_time - start_time
        
        if response.status_code == 200:
            print(f"✅ Performance test passed: {response_time:.2f}s")
            if response_time > 30:
                print("⚠️  Warning: Response time is slow (>30s)")
            return True
        else:
            print(f"❌ Performance test failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Performance test error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting AI Career Coach Backend Tests")
    print("=" * 50)
    
    tests = [
        ("Health Check", test_health_endpoint),
        ("Career Advisor", test_career_advisor_endpoint),
        ("CORS Headers", test_cors_headers),
        ("Performance", run_performance_test)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}")
        print("-" * 30)
        if test_func():
            passed += 1
        else:
            print(f"❌ {test_name} failed")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is ready for production.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
