#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying AI Video Effects Analyzer Setup...\n');

let hasErrors = false;

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('❌ node_modules not found. Run: npm install');
  hasErrors = true;
} else {
  console.log('✅ Dependencies installed');
}

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local not found. Copy .env.local.example and add your API keys');
  console.log('   Run: cp .env.local.example .env.local');
  hasErrors = true;
} else {
  console.log('✅ .env.local exists');
  
  // Check if API key is configured
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (!envContent.includes('VITE_OPENAI_API_KEY=sk-') && 
      !envContent.includes('VITE_GEMINI_API_KEY=') && 
      !envContent.includes('VITE_ANTHROPIC_API_KEY=')) {
    console.log('⚠️  No API key configured in .env.local');
    console.log('   Add at least one: VITE_OPENAI_API_KEY, VITE_GEMINI_API_KEY, or VITE_ANTHROPIC_API_KEY');
    hasErrors = true;
  } else {
    console.log('✅ API key configured');
  }
}

// Check required directories
const requiredDirs = [
  'src/components',
  'src/pages',
  'src/services',
  'src/utils',
  'src/styles'
];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`❌ Missing directory: ${dir}`);
    hasErrors = true;
  }
});

if (!hasErrors) {
  console.log('\n✅ All checks passed!');
  console.log('\n🚀 Ready to start:');
  console.log('   npm start\n');
} else {
  console.log('\n❌ Setup incomplete. Please fix the issues above.\n');
  process.exit(1);
}
