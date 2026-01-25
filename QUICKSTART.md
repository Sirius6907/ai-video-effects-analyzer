# Quick Start Guide

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit .env.local and add your OpenAI API key
   # VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Getting API Keys

### OpenAI (Recommended)
1. Visit https://platform.openai.com/signup
2. Create an account or sign in
3. Go to https://platform.openai.com/account/api-keys
4. Click "Create new secret key"
5. Copy the key and add it to `.env.local`

## Using the Application

### 1. Upload a Video
- Click "Upload" in the navigation
- Drag and drop your video file (MP4, MOV, AVI, MKV)
- Maximum file size: 2GB
- Click "Start Analysis"

### 2. View Analysis Results
- After processing, you'll see detected effects
- Each effect shows:
  - Effect name and type
  - Confidence score
  - Timestamp and duration
  - Complexity level

### 3. Download After Effects Template
- Click "Download AE Template" button
- Two files will be downloaded:
  - `.jsx` file (After Effects script)
  - `.json` file (metadata)

### 4. Use Template in After Effects
1. Open After Effects
2. Go to **File > Scripts > Run Script File**
3. Select the downloaded `.jsx` file
4. When prompted, select your original video file
5. Effects will be automatically applied to a new composition!

## Template Features

The generated After Effects template includes:

- **Automatic Composition Setup**: Creates a composition with correct dimensions
- **Keyframe Animations**: All detected effects with proper timing
- **Effect Parameters**: Pre-configured settings for each effect
- **Easing Curves**: Smooth animations with proper interpolation
- **Layer Organization**: Clean layer structure

## Effect Types

The AI can detect and generate templates for:

1. **Zoom Effects**
   - Zoom in/out animations
   - Scale transformations
   - Smooth easing curves

2. **Pan Effects**
   - Horizontal/vertical camera movements
   - Position animations
   - Tracking shots

3. **Blur Effects**
   - Gaussian blur transitions
   - Focus effects
   - Depth of field simulation

4. **Glow Effects**
   - Edge glow
   - Luminous highlights
   - Light effects

5. **Shake Effects**
   - Camera shake
   - Impact effects
   - Wiggle expressions

6. **Text Effects**
   - Text reveals
   - Typewriter animations
   - Character animations

## Troubleshooting

### "Analysis failed" error
- Check that your API key is correctly set in `.env.local`
- Ensure the video file is not corrupted
- Try a smaller video file first

### Template doesn't work in After Effects
- Make sure you're using After Effects 2020 or later
- Enable script execution: Edit > Preferences > Scripting & Expressions
- Check "Allow Scripts to Write Files and Access Network"

### Video upload fails
- Check file size (must be under 2GB)
- Ensure format is supported (MP4, MOV, AVI, MKV)
- Try converting the video to MP4 format

## Tips for Best Results

1. **Video Quality**: Higher resolution videos provide better analysis
2. **Analysis Depth**: Use "Deep Analysis" for complex videos
3. **File Format**: MP4 with H.264 codec works best
4. **Video Length**: Shorter videos (under 2 minutes) process faster
5. **Clear Effects**: Videos with distinct effects are easier to detect

## No Account Required

This application runs entirely in your browser. No sign-up, no login, no data sent to servers (except AI API calls for analysis).

## Data Storage

- Analysis results are stored locally in your browser
- Recent uploads are saved in localStorage
- Clear browser data to remove all stored information

## Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify your API key is valid
3. Try with a different video file
4. Ensure you have a stable internet connection

## Next Steps

- Explore the **Effect Library** to see common effects
- Generate **Tutorials** to learn how to recreate effects manually
- Use **After Effects Control** to queue multiple effects
- Adjust **Settings** to optimize performance for your system
