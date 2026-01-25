// Error handling utilities

export class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

export const errorCodes = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT',
  ANALYSIS_FAILED: 'ANALYSIS_FAILED',
  API_KEY_MISSING: 'API_KEY_MISSING',
  NETWORK_ERROR: 'NETWORK_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  VIDEO_LOAD_ERROR: 'VIDEO_LOAD_ERROR'
};

export const errorMessages = {
  [errorCodes.FILE_TOO_LARGE]: 'File size exceeds maximum limit',
  [errorCodes.UNSUPPORTED_FORMAT]: 'File format is not supported',
  [errorCodes.ANALYSIS_FAILED]: 'Video analysis failed',
  [errorCodes.API_KEY_MISSING]: 'API key is not configured',
  [errorCodes.NETWORK_ERROR]: 'Network connection error',
  [errorCodes.STORAGE_ERROR]: 'Local storage error',
  [errorCodes.VIDEO_LOAD_ERROR]: 'Failed to load video file'
};

export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      details: error.details
    };
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: {}
  };
};

export default {
  AppError,
  errorCodes,
  errorMessages,
  handleError
};
