import storage from '../utils/storage';

class VideoAnalysisService {
  getApiConfig() {
    return storage.get(storage.keys.AI_API_CONFIG, {
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4-vision-preview'
    });
  }

  async analyzeVideo(videoFile, options = {}) {
    const apiConfig = this.getApiConfig();
    
    if (!apiConfig.apiKey) {
      console.warn('No API key configured. Using mock analysis.');
      return this.getMockAnalysis();
    }

    try {
      const frames = await this.extractFrames(videoFile, options);
      const analysis = await this.performAIAnalysis(frames, options, apiConfig);
      return analysis;
    } catch (error) {
      console.error('Video analysis error:', error);
      return this.getMockAnalysis();
    }
  }

  async extractFrames(videoFile, options) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const frames = [];

      video.src = URL.createObjectURL(videoFile);
      
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const duration = video.duration;
        const frameInterval = duration / 10;
        let currentTime = 0;

        const captureFrame = () => {
          if (currentTime >= duration) {
            URL.revokeObjectURL(video.src);
            resolve(frames);
            return;
          }
          video.currentTime = currentTime;
        };

        video.addEventListener('seeked', () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(canvas.toDataURL('image/jpeg', 0.8));
          currentTime += frameInterval;
          captureFrame();
        });

        captureFrame();
      });
    });
  }

  async performAIAnalysis(frames, options, apiConfig) {
    // This would call the actual AI API based on provider
    return this.getMockAnalysis();
  }

  getMockAnalysis() {
    const effects = [
      {
        id: Date.now() + 1,
        name: "Smooth Zoom In",
        type: "Zoom",
        description: "Gradual zoom effect transitioning from wide shot to close-up",
        confidence: 94,
        timestamp: 2.5,
        duration: 1.8,
        complexity: "Easy",
        parameters: { scaleStart: 100, scaleEnd: 120, easing: "easeInOut" }
      },
      {
        id: Date.now() + 2,
        name: "Horizontal Pan Right",
        type: "Pan",
        description: "Steady horizontal camera movement from left to right",
        confidence: 89,
        timestamp: 5.2,
        duration: 2.3,
        complexity: "Medium",
        parameters: { direction: "right", speed: "medium" }
      }
    ];

    return {
      effects,
      stats: {
        totalEffects: effects.length,
        avgConfidence: Math.round(effects.reduce((sum, e) => sum + e.confidence, 0) / effects.length),
        videoDuration: 30.5,
        processingTime: 12.3
      }
    };
  }
}

export default new VideoAnalysisService();
