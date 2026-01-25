// Environment configuration
export const config = {
  // After Effects Settings
  afterEffects: {
    port: parseInt(import.meta.env.VITE_AE_CONNECTION_PORT) || 8080,
    autoConnect: import.meta.env.VITE_AE_AUTO_CONNECT === 'true'
  },
  
  // Application Settings
  app: {
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 2147483648,
    supportedFormats: (import.meta.env.VITE_SUPPORTED_FORMATS || 'mp4,mov,avi,mkv').split(','),
    defaultAnalysisDepth: import.meta.env.VITE_DEFAULT_ANALYSIS_DEPTH || 'balanced'
  },
  
  // Storage Settings
  storage: {
    cacheEnabled: import.meta.env.VITE_CACHE_ENABLED === 'true',
    dataRetentionDays: parseInt(import.meta.env.VITE_DATA_RETENTION_DAYS) || 90
  }
};

export default config;
