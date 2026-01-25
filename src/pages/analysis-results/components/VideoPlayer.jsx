import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const VideoPlayer = ({ videoUrl, videoAlt, effects = [], onEffectClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video?.currentTime);
    const handleLoadedMetadata = () => setDuration(video?.duration);
    const handleEnded = () => setIsPlaying(false);

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef?.current?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates?.indexOf(playbackRate);
    const nextRate = rates?.[(currentIndex + 1) % rates?.length];
    setPlaybackRate(nextRate);
    videoRef.current.playbackRate = nextRate;
  };

  const skipTime = (seconds) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getEffectColor = (type) => {
    const colors = {
      zoom: '#6366F1',
      pan: '#8B5CF6',
      blur: '#F59E0B',
      glow: '#10B981',
      shake: '#EF4444',
      text: '#3B82F6'
    };
    return colors?.[type?.toLowerCase()] || '#94A3B8';
  };

  return (
    <div className="relative w-full bg-card rounded-lg overflow-hidden border border-border shadow-glow">
      <div 
        className="relative aspect-video bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(isPlaying ? false : true)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster={videoUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <div className="w-full p-4 space-y-3">
              <div 
                ref={progressRef}
                className="relative w-full h-2 bg-muted/30 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                
                {effects?.map((effect) => {
                  const position = (effect?.timestamp / duration) * 100;
                  return (
                    <div
                      key={effect?.id}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer hover:scale-125 transition-transform"
                      style={{ 
                        left: `${position}%`,
                        backgroundColor: getEffectColor(effect?.type)
                      }}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEffectClick?.(effect);
                      }}
                      title={`${effect?.type} - ${effect?.confidence}%`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skipTime(-10)}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="SkipBack" size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skipTime(10)}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="SkipForward" size={18} />
                  </Button>

                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={18} />
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>

                  <span className="text-sm text-white font-mono ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={changePlaybackRate}
                    className="text-white hover:bg-white/20 font-mono"
                  >
                    {playbackRate}x
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-card/50 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {effects?.slice(0, 5)?.map((effect) => (
            <button
              key={effect?.id}
              onClick={() => onEffectClick?.(effect)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth hover:scale-105"
              style={{ 
                backgroundColor: `${getEffectColor(effect?.type)}20`,
                color: getEffectColor(effect?.type)
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getEffectColor(effect?.type) }}
              />
              {effect?.type}
            </button>
          ))}
          {effects?.length > 5 && (
            <span className="flex items-center px-3 py-1.5 text-xs text-muted-foreground">
              +{effects?.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;