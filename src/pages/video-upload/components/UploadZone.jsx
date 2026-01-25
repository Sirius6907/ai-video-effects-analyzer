import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, acceptedFormats, maxFileSize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e?.dataTransfer?.files);
    const videoFile = files?.find(file => 
      acceptedFormats?.some(format => file?.type?.includes(format?.toLowerCase()))
    );

    if (videoFile) {
      onFileSelect(videoFile);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    return `${bytes / (1024 * 1024)} MB`;
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl transition-all duration-250
        ${isDragging 
          ? 'border-primary bg-primary/10 scale-[1.02]' 
          : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats?.map(f => `.${f?.toLowerCase()}`)?.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
        aria-label="Upload video file"
      />
      <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
        <div className={`
          w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-250
          ${isDragging ? 'bg-primary/20 scale-110' : 'bg-primary/10'}
        `}>
          <Icon 
            name={isDragging ? 'Upload' : 'Film'} 
            size={32} 
            color="var(--color-primary)" 
            className={isDragging ? 'animate-pulse' : ''}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            {isDragging ? 'Drop your video here' : 'Upload Video for Analysis'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-md">
            Drag and drop your video file here, or click browse to select from your computer
          </p>
        </div>

        <Button
          variant="default"
          size="lg"
          iconName="FolderOpen"
          iconPosition="left"
          onClick={handleBrowseClick}
          className="mt-2"
        >
          Browse Files
        </Button>

        <div className="pt-4 md:pt-6 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="FileVideo" size={16} color="var(--color-muted-foreground)" />
            <span>Supported formats: {acceptedFormats?.join(', ')}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="HardDrive" size={16} color="var(--color-muted-foreground)" />
            <span>Maximum file size: {formatFileSize(maxFileSize)}</span>
          </div>
        </div>
      </div>
      {isDragging && (
        <div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};

export default UploadZone;