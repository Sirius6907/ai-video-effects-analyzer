import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VideoComparisonPlayer = ({ 
  beforeVideo, 
  afterVideo, 
  currentStep,
  onTimeUpdate 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [viewMode, setViewMode] = useState('split');
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const percentage = (x / rect?.width) * 100;
    setCurrentTime(percentage);
    if (onTimeUpdate) onTimeUpdate(percentage);
  };

  const formatTime = (percentage) => {
    const seconds = Math.floor((percentage / 100) * duration);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const viewModes = [
    { id: 'split', label: 'Split View', icon: 'Columns' },
    { id: 'before', label: 'Before Only', icon: 'Eye' },
    { id: 'after', label: 'After Only', icon: 'EyeOff' },
    { id: 'overlay', label: 'Overlay', icon: 'Layers' }
  ];

  return (
    <div className="w-full space-y-3 md:space-y-4">
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border border-border">
        {viewMode === 'split' && (
          <div className="grid grid-cols-2 gap-0 h-full">
            <div className="relative h-full border-r border-border">
              <Image 
                src={beforeVideo} 
                alt="Before effect video frame showing original unedited footage"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 rounded text-xs font-medium text-foreground">
                Before
              </div>
            </div>
            <div className="relative h-full">
              <Image 
                src={afterVideo} 
                alt="After effect video frame showing edited footage with applied effects"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded text-xs font-medium text-primary-foreground">
                After
              </div>
            </div>
          </div>
        )}

        {viewMode === 'before' && (
          <div className="relative h-full">
            <Image 
              src={beforeVideo} 
              alt="Before effect video frame showing original unedited footage"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 rounded text-xs font-medium text-foreground">
              Before
            </div>
          </div>
        )}

        {viewMode === 'after' && (
          <div className="relative h-full">
            <Image 
              src={afterVideo} 
              alt="After effect video frame showing edited footage with applied effects"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded text-xs font-medium text-primary-foreground">
              After
            </div>
          </div>
        )}

        {viewMode === 'overlay' && (
          <div className="relative h-full">
            <Image 
              src={beforeVideo} 
              alt="Before effect video frame showing original unedited footage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30">
              <Image 
                src={afterVideo} 
                alt="After effect video frame showing edited footage with applied effects"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 rounded text-xs font-medium text-foreground">
              Overlay Comparison
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-3 md:p-4">
          <div className="space-y-2">
            <div 
              className="w-full h-1 bg-muted/50 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full relative transition-smooth group-hover:bg-primary/80"
                style={{ width: `${currentTime}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-foreground rounded-full shadow-glow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isPlaying ? 'Pause' : 'Play'}
                  onClick={handlePlayPause}
                />
                <span className="text-xs font-mono text-foreground whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(100)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'}
                    onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  />
                  {showVolumeSlider && (
                    <div className="absolute bottom-full right-0 mb-2 p-2 bg-popover border border-border rounded-lg shadow-glow-lg">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e?.target?.value))}
                        className="w-20 h-1"
                      />
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Maximize"
                  onClick={() => console.log('Fullscreen')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {viewModes?.map((mode) => (
          <Button
            key={mode?.id}
            variant={viewMode === mode?.id ? 'default' : 'outline'}
            size="sm"
            iconName={mode?.icon}
            iconPosition="left"
            onClick={() => setViewMode(mode?.id)}
          >
            {mode?.label}
          </Button>
        ))}
      </div>
      {currentStep && (
        <div className="p-3 md:p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-primary/20 rounded-lg">
              <Icon name="Info" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Current Step: {currentStep?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {currentStep?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoComparisonPlayer;