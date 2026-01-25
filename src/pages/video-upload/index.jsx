import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videoAnalysisService from '../../services/videoAnalysisService';
import config from '../../utils/config';
import storage from '../../utils/storage';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import UploadZone from './components/UploadZone';
import ProcessingOptions from './components/ProcessingOptions';
import RecentUploads from './components/RecentUploads';
import SystemPerformance from './components/SystemPerformance';

const VideoUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingOptions, setProcessingOptions] = useState({
    analysisDepth: 'comprehensive',
    effectCategories: ['motion', 'text', 'color', 'transitions'],
    outputs: ['aeScript', 'tutorial', 'timeline']
  });

  const acceptedFormats = config.app.supportedFormats.map(f => f.toUpperCase());
  const maxFileSize = config.app.maxFileSize;
  const [recentUploads, setRecentUploads] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsed: 0,
    memoryTotal: 16.0,
    queuedJobs: 0,
    maxConcurrent: 4,
    avgProcessingTime: 0,
    completedToday: 0
  });

  useEffect(() => {
    const savedUploads = storage.get(storage.keys.RECENT_UPLOADS, []);
    setRecentUploads(savedUploads);

    const metricsInterval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.random() * 60 + 20,
        memoryUsed: Math.random() * 8 + 4
      }));
    }, 3000);

    return () => clearInterval(metricsInterval);
  }, []);

  const handleFileSelect = (file) => {
    if (file?.size > maxFileSize) {
      alert(`File size exceeds maximum limit of ${maxFileSize / (1024 * 1024)} MB`);
      return;
    }

    setSelectedFile(file);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      alert('Please select a video file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const analysisResult = await videoAnalysisService.analyzeVideo(selectedFile, processingOptions);
      
      clearInterval(uploadInterval);
      setUploadProgress(100);

      const uploadRecord = {
        id: `upload-${Date.now()}`,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadedAt: new Date().toISOString(),
        status: 'completed',
        progress: 100
      };

      const updatedUploads = [uploadRecord, ...recentUploads].slice(0, 10);
      storage.set(storage.keys.RECENT_UPLOADS, updatedUploads);
      setRecentUploads(updatedUploads);

      setTimeout(() => {
        setIsUploading(false);
        navigate('/analysis-results', { 
          state: { 
            fileName: selectedFile.name,
            videoFile: selectedFile,
            analysisResult,
            processingOptions 
          } 
        });
      }, 500);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsUploading(false);
      alert('Analysis failed. Please try again.');
    }
  };

  const handleRetryConnection = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Connection retry attempted');
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Video Upload & Analysis
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Upload your video to begin AI-powered effect detection and automation
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ConnectivityStatus
                isConnected={true}
                connectionType="after-effects"
                showLabel={true}
                onRetry={handleRetryConnection}
              />
              <QuickActionsMenu variant="default" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-glow">
                <UploadZone
                  onFileSelect={handleFileSelect}
                  acceptedFormats={acceptedFormats}
                  maxFileSize={maxFileSize}
                />

                {selectedFile && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Icon name="FileVideo" size={20} color="var(--color-primary)" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-foreground">
                          Selected File
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">
                          {selectedFile?.name}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB</span>
                          <span>•</span>
                          <span>{selectedFile?.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                        aria-label="Remove file"
                      >
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Uploading...</span>
                      <span className="text-sm font-mono text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-250"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-glow">
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="Settings" size={24} color="var(--color-primary)" />
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                    Processing Options
                  </h2>
                </div>
                <ProcessingOptions
                  options={processingOptions}
                  onChange={setProcessingOptions}
                />
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Play"
                    iconPosition="left"
                    onClick={handleStartAnalysis}
                    disabled={!selectedFile || isUploading}
                    loading={isUploading}
                    fullWidth
                  >
                    Start Analysis
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Save"
                    iconPosition="left"
                    disabled={!selectedFile}
                    className="sm:w-auto"
                  >
                    Save Settings
                  </Button>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="History" size={24} color="var(--color-secondary)" />
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                      Recent Uploads
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Refresh
                  </Button>
                </div>
                <RecentUploads uploads={recentUploads} />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-glow">
                <SystemPerformance metrics={systemMetrics} />
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-glow">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Info" size={20} color="var(--color-accent)" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Quick Tips</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Higher resolution videos provide more accurate effect detection
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Comprehensive analysis takes longer but detects subtle animations
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Enable After Effects connection for automatic script execution
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-glow">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="BookOpen" size={20} color="var(--color-primary)" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Resources</h3>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                    fullWidth
                    className="justify-start"
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    fullWidth
                    className="justify-start"
                  >
                    Video Tutorials
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    fullWidth
                    className="justify-start"
                  >
                    Support Forum
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoUpload;