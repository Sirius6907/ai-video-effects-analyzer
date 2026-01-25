# 🌟Chandan's AI Video Effects Analyzer

<div align="center">

  <!-- Logo -->
  <img src="public/assets/images/logo.svg" alt="Portfolio Logo" width="120" height="120">

### ✨ Student Developer  |  Chief Problem Solver  |  Web Dev  |  SAP  |  AWS

<kbd>My space on the web</kbd> showcasing modern web development with stunning dark aesthetics and turning imagination into reality.


</div>

---
# Summary

A comprehensive web application designed to streamline the process of analyzing, managing, and creating video effects with AI-powered capabilities, particularly for Adobe After Effects. This tool assists video professionals and enthusiasts in understanding video content, applying advanced effects, and generating interactive tutorials.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Keys Setup](#api-keys-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 📺 Overview

The **AI Video Effects Analyzer** is a modern, React-based web application built with cutting-edge technologies including Vite, Tailwind CSS, and Redux Toolkit. It provides a seamless workflow for video analysis, effect detection, and After Effects automation.

### Technology Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.x
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **Data Visualization**: D3.js

---

## ✨ Key Features

### 🎬 Video Upload & Processing
- Seamlessly upload videos in multiple formats (MP4, MOV, AVI, MKV)
- Support for files up to 2GB
- Real-time upload progress tracking
- Automatic frame extraction and analysis

### 🔍 AI-Powered Analysis
- Advanced video analysis using OpenAI, Google Gemini, or Anthropic APIs
- Detect visual effects, transitions, and motion patterns
- Confidence scoring for detected effects
- Timestamped effect detection with duration tracking

### 🎨 Analysis Results & Automation
- View detailed analysis of detected video effects
- Filter and sort effects by type, confidence, and timestamp
- Automation panel for batch processing
- Automated effect application workflow

### 🎞️ After Effects Control
- Direct integration with Adobe After Effects
- Batch processing and queue management
- Real-time execution monitoring
- System metrics and performance tracking
- Execution history and troubleshooting tools

### 📚 Effect Library
- Browse curated library of video effects
- Preview effects before application
- Manage and organize effect collections
- Trending effects section

### 🎓 Tutorial Generation
- Generate interactive tutorials based on video content
- Step-by-step visual guides
- Video comparison and analysis
- Interactive practice exercises
- Export tutorial options

### ⚙️ Customizable Settings
- Application preferences and configuration
- API key management
- Connection settings for After Effects
- File size and format customization

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For cloning the repository

To verify your installations:
```bash
node --version
npm --version
git --version
```

### Optional Requirements

- **Adobe After Effects**: Required to use After Effects automation features
- **AI API Account**: For video analysis capabilities (OpenAI, Google Gemini, or Anthropic)

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sirius6907/ai-video-effects-analyzer.git
cd ai-video-effects-analyzer
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React and its ecosystem
- Vite and build tools
- Styling libraries (Tailwind CSS, PostCSS)
- UI components and icons
- State management (Redux Toolkit)
- And more...

### Step 3: Create Environment Configuration

Copy the environment variables template and create your `.env` file:

```bash
# Create a new .env file in the project root
touch .env
```

Or manually create a `.env` file in the root directory.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env


# After Effects Connection Settings
VITE_AE_CONNECTION_PORT=8080
VITE_AE_AUTO_CONNECT=true

# Application Settings
VITE_MAX_FILE_SIZE=2147483648
VITE_SUPPORTED_FORMATS=mp4,mov,avi,mkv
VITE_DEFAULT_ANALYSIS_DEPTH=balanced

# Local Storage Settings
VITE_CACHE_ENABLED=true
VITE_DATA_RETENTION_DAYS=90

```

### Important Notes

- **API Keys**: At least one AI API key is required for video analysis. See [API Keys Setup](#api-keys-setup) for detailed instructions.
- **File Size**: Default maximum file size is 2GB (2147483648 bytes). Adjust as needed.
- **Supported Formats**: Ensure your video formats match the configured list.
- **Analysis Depth**: Options are `light`, `balanced`, or `deep` for different analysis intensities.

---

## 🚀 Available Scripts

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Build artifacts will be generated in the `dist/` directory, ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Run Verification Script

Verify your setup and configuration:

```bash
npm run verify
```

This script checks:
- Node.js and npm versions
- Required dependencies
- Environment variables
- Project structure integrity

---

## 🔑 API Keys Setup

### OpenAI API (Recommended)

1. Visit [OpenAI Platform](https://platform.openai.com/signup)
2. Create an account or sign in
3. Navigate to [API Keys](https://platform.openai.com/account/api-keys)
4. Click **"Create new secret key"**
5. Copy the generated key
6. Add to your `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```

### Google Gemini API

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the generated key
4. Add to your `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your-gemini-key-here
   ```

### Anthropic Claude API

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Go to API Keys section
4. Create a new API key
5. Add to your `.env` file:
   ```env
   VITE_ANTHROPIC_API_KEY=your-anthropic-key-here
   ```

---

## 📖 Usage

### Quick Start

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to the provided URL (typically `http://localhost:5173`)

3. **Explore the application** using the navigation menu

### Main Workflows

#### 🎥 Video Upload & Analysis

1. Click **"Video Upload"** in the navigation
2. Drag and drop your video file or click to select
3. Choose your analysis depth preference
4. Click **"Start Analysis"**
5. Wait for AI analysis to complete

#### 📊 View Analysis Results

1. Navigate to **"Analysis Results"**
2. View detected effects with:
   - Effect name and type
   - Confidence score (0-100%)
   - Timestamp and duration
   - Complexity level
3. Use filters to narrow down results
4. Use the automation panel for further processing

#### 🎞️ Generate After Effects Template

1. After analysis, click **"Download AE Template"**
2. Two files will be downloaded:
   - `.jsx` file (After Effects script)
   - `.json` file (metadata and settings)
3. Open Adobe After Effects
4. Go to **File > Scripts > Run Script File**
5. Select the downloaded `.jsx` file
6. Effects will be automatically applied to a new composition

#### 🔄 After Effects Control

1. Access **"After Effects Control"** section
2. Manage batch processes and queues
3. Monitor execution in real-time
4. Review system metrics and performance
5. Check execution history and troubleshoot issues

#### 📚 Effect Library

1. Browse the **"Effect Library"**
2. Preview effects by clicking on effect cards
3. Organize effects into collections
4. Check trending effects section

#### 🎓 Generate Tutorials

1. Go to **"Tutorial Generation"**
2. Select or upload your video
3. Choose tutorial type and parameters
4. Generate interactive tutorial content
5. Export tutorials in desired format

---

## 📁 Project Structure

```
ai-video-effects-analyzer/
├── public/                          # Static assets
│   ├── manifest.json
│   └── assets/
│       └── images/
├── src/
│   ├── components/                  # Reusable React components
│   │   ├── ui/                      # UI component library
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   └── ...
│   │   ├── AppIcon.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ...
│   ├── pages/                       # Page components
│   │   ├── video-upload/            # Video upload section
│   │   ├── analysis-results/        # Analysis and results
│   │   ├── after-effects-control/   # AE integration
│   │   ├── effect-library/          # Effects library
│   │   ├── tutorial-generation/     # Tutorial creator
│   │   └── user-settings/           # Application settings
│   ├── services/                    # External service integrations
│   │   ├── videoAnalysisService.js  # AI video analysis
│   │   └── afterEffectsTemplateService.js
│   ├── utils/                       # Utility functions
│   │   ├── config.js                # Configuration management
│   │   ├── storage.js               # LocalStorage operations
│   │   ├── errorHandler.js          # Error handling
│   │   └── cn.js                    # Utility functions
│   ├── styles/                      # Global styles
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── App.jsx                      # Main App component
│   ├── Routes.jsx                   # Route definitions
│   └── index.jsx                    # Entry point
├── vite.config.mjs                  # Vite configuration
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Project metadata & dependencies
├── .env                             # Environment variables (create this)
├── README.md                        # This file
├── QUICKSTART.md                    # Quick start guide
└── CHANGELOG.md                     # Version history
```

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

This will run the dev server on port 3000 instead.

#### Missing API Keys

**Error**: `API key not found or invalid`

**Solution**:
- Verify your `.env` file exists in the project root
- Check API keys are correctly formatted
- Ensure no extra spaces or quotes in `.env`
- Restart the dev server after updating `.env`

#### Build Fails

**Error**: `Build failed` or `Vite build error`

**Solution**:
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

#### Video Upload Not Working

**Error**: `File size exceeds maximum allowed size`

**Solution**:
- Check `VITE_MAX_FILE_SIZE` in `.env`
- Ensure your video file size is within limits
- Compress video if needed (recommended: < 500MB for better performance)

#### After Effects Connection Issues

**Error**: `Cannot connect to After Effects`

**Solution**:
- Ensure Adobe After Effects is running
- Check `VITE_AE_CONNECTION_PORT` matches your AE setup
- Verify firewall isn't blocking the connection port
- Check After Effects version compatibility

### Enable Debug Mode

For additional debugging information:

```bash
# Add to .env
VITE_DEBUG_MODE=true
VITE_DEBUG_LEVEL=verbose
```

---

## 📝 Available Documentation

- **QUICKSTART.md** - Get up and running in minutes
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **CHANGELOG.md** - Version history and updates
- **PROJECT_COMPLETE.md** - Project completion status

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create** a Pull Request with detailed description

Please ensure your code follows the existing style and includes appropriate documentation.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for complete license text.

**Permission is granted** to use, copy, modify, and distribute this software and documentation files (the "Software") in binary form, subject to the conditions set forth in the MIT License.

---

## 👤 Author

**Chandan Kumar Behera** (also known as **Sirius**)

- **GitHub**: [Profile](https://github.com/Sirius6907)
- **LinkedIn**: [Profile](https://www.linkedin.com/in/chandan-kumar-behera-sirius/)
- **Twitter**: [@Sirius6907](https://twitter.com/Sirius6907)
- **Email**: [Id](kumarchandan12345a@gmail.com)

### About the Developer

This project was meticulously crafted with a focus on providing professionals and enthusiasts with a powerful, intuitive tool for video effects analysis and creation. The development emphasizes modern web technologies, best practices, and exceptional user experience.

---

## 📞 Support & Contact

For questions, bug reports, or feature requests:

1. **GitHub Issues**: [Create an issue](https://github.com/Sirius6907/ai-video-effects-analyzer/issues)
2. **Email**: Direct inquiries to the author via GitHub
3. **Documentation**: Check existing documentation files in the repository

---

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the needs of video professionals and content creators
- Thanks to the open-source community for excellent libraries and tools

---

<div align="center">

**Made with ❤️ by Chandan Kumar Behera / Sirius**

⭐ If you find this project helpful, please consider giving it a star on GitHub!

</div>
