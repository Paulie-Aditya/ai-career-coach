#!/usr/bin/env node
/**
 * Frontend Testing Script for AI Career Coach
 * Tests frontend functionality and API integration
 */

const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const TEST_TIMEOUT = 30000;

// Test data
const testData = {
  skills: ['Python', 'Communication', 'Data Analysis'],
  interests: ['Technology', 'Healthcare', 'Finance'],
  education: 'Bachelor\'s Degree',
  experience_level: 'beginner',
  location: 'India'
};

/**
 * Test if frontend is running
 */
async function testFrontendRunning() {
  console.log('🔍 Testing if frontend is running...');
  try {
    const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
    if (response.status === 200) {
      console.log('✅ Frontend is running');
      return true;
    }
  } catch (error) {
    console.log('❌ Frontend is not running');
    console.log('   Please start the frontend with: npm run dev');
    return false;
  }
}

/**
 * Test if backend is running
 */
async function testBackendRunning() {
  console.log('🔍 Testing if backend is running...');
  try {
    const response = await axios.get(`${BACKEND_URL}/health`, { timeout: 5000 });
    if (response.status === 200) {
      console.log('✅ Backend is running');
      return true;
    }
  } catch (error) {
    console.log('❌ Backend is not running');
    console.log('   Please start the backend with: python main.py');
    return false;
  }
}

/**
 * Test API integration
 */
async function testAPIIntegration() {
  console.log('🔍 Testing API integration...');
  try {
    const response = await axios.post(
      `${BACKEND_URL}/career-advisor`,
      testData,
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: TEST_TIMEOUT
      }
    );
    
    if (response.status === 200) {
      const data = response.data;
      
      // Validate response structure
      const requiredFields = ['career_paths', 'skill_roadmap', 'overall_recommendations'];
      for (const field of requiredFields) {
        if (!(field in data)) {
          console.log(`❌ Missing required field: ${field}`);
          return false;
        }
      }
      
      console.log('✅ API integration test passed');
      console.log(`   - Career paths: ${data.career_paths.length}`);
      console.log(`   - Skills: ${data.skill_roadmap.length}`);
      console.log(`   - Recommendations: ${data.overall_recommendations.length}`);
      return true;
    }
  } catch (error) {
    console.log('❌ API integration test failed');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

/**
 * Test frontend build
 */
async function testFrontendBuild() {
  console.log('🔍 Testing frontend build...');
  return new Promise((resolve) => {
    exec('cd frontend && npm run build', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Frontend build failed');
        console.log(`   Error: ${error.message}`);
        resolve(false);
      } else {
        console.log('✅ Frontend build successful');
        resolve(true);
      }
    });
  });
}

/**
 * Test TypeScript compilation
 */
async function testTypeScriptCompilation() {
  console.log('🔍 Testing TypeScript compilation...');
  return new Promise((resolve) => {
    exec('cd frontend && npx tsc --noEmit', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ TypeScript compilation failed');
        console.log(`   Error: ${error.message}`);
        resolve(false);
      } else {
        console.log('✅ TypeScript compilation successful');
        resolve(true);
      }
    });
  });
}

/**
 * Test environment variables
 */
function testEnvironmentVariables() {
  console.log('🔍 Testing environment variables...');
  
  const envFile = path.join(__dirname, '..', 'frontend', '.env.local');
  const envExampleFile = path.join(__dirname, '..', 'frontend', 'env_example.txt');
  
  if (!fs.existsSync(envFile)) {
    console.log('⚠️  .env.local file not found');
    console.log('   Please copy env_example.txt to .env.local and configure it');
    return false;
  }
  
  const envContent = fs.readFileSync(envFile, 'utf8');
  if (!envContent.includes('NEXT_PUBLIC_API_URL')) {
    console.log('❌ NEXT_PUBLIC_API_URL not found in .env.local');
    return false;
  }
  
  console.log('✅ Environment variables configured');
  return true;
}

/**
 * Test package.json dependencies
 */
function testDependencies() {
  console.log('🔍 Testing dependencies...');
  
  const packageJsonPath = path.join(__dirname, '..', 'frontend', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = [
    'next', 'react', 'react-dom', 'typescript',
    'tailwindcss', 'axios', 'lucide-react', 'react-hot-toast'
  ];
  
  const missingDeps = requiredDeps.filter(dep => !(dep in packageJson.dependencies));
  
  if (missingDeps.length > 0) {
    console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
    return false;
  }
  
  console.log('✅ All required dependencies found');
  return true;
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🚀 Starting AI Career Coach Frontend Tests');
  console.log('=' * 50);
  
  const tests = [
    { name: 'Dependencies', fn: testDependencies },
    { name: 'Environment Variables', fn: testEnvironmentVariables },
    { name: 'TypeScript Compilation', fn: testTypeScriptCompilation },
    { name: 'Frontend Build', fn: testFrontendBuild },
    { name: 'Backend Running', fn: testBackendRunning },
    { name: 'Frontend Running', fn: testFrontendRunning },
    { name: 'API Integration', fn: testAPIIntegration }
  ];
  
  let passed = 0;
  const total = tests.length;
  
  for (const test of tests) {
    console.log(`\n📋 ${test.name}`);
    console.log('-'.repeat(30));
    
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} failed with error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Frontend is ready for production.');
    return 0;
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.');
    return 1;
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().then(process.exit);
}

module.exports = {
  testFrontendRunning,
  testBackendRunning,
  testAPIIntegration,
  testFrontendBuild,
  testTypeScriptCompilation,
  testEnvironmentVariables,
  testDependencies,
  runAllTests
};
