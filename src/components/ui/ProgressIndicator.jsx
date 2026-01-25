import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  progress = 0, 
  status = 'idle',
  message = '',
  showPercentage = true,
  variant = 'default'
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          color: 'var(--color-primary)',
          bgColor: 'bg-primary/20',
          icon: 'Loader2',
          iconClass: 'animate-spin'
        };
      case 'analyzing':
        return {
          color: 'var(--color-secondary)',
          bgColor: 'bg-secondary/20',
          icon: 'BarChart3',
          iconClass: 'animate-pulse'
        };
      case 'complete':
        return {
          color: 'var(--color-success)',
          bgColor: 'bg-success/20',
          icon: 'CheckCircle2',
          iconClass: ''
        };
      case 'error':
        return {
          color: 'var(--color-error)',
          bgColor: 'bg-error/20',
          icon: 'AlertCircle',
          iconClass: ''
        };
      case 'warning':
        return {
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/20',
          icon: 'AlertTriangle',
          iconClass: ''
        };
      default:
        return {
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted/20',
          icon: 'Clock',
          iconClass: ''
        };
    }
  };

  const config = getStatusConfig();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className={`${config?.iconClass}`}>
          <Icon name={config?.icon} size={16} color={config?.color} />
        </div>
        {showPercentage && (
          <span className="text-sm font-mono text-muted-foreground">
            {clampedProgress}%
          </span>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-250 ease-smooth"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: config?.color
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`${config?.iconClass}`}>
            <Icon name={config?.icon} size={18} color={config?.color} />
          </div>
          {message && (
            <span className="text-sm text-foreground font-medium">
              {message}
            </span>
          )}
        </div>
        {showPercentage && (
          <span className="text-sm font-mono text-muted-foreground">
            {clampedProgress}%
          </span>
        )}
      </div>
      <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-250 ease-smooth rounded-full"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: config?.color
          }}
        >
          {status === 'processing' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>
      </div>
      {status === 'processing' && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
          <span>Processing video analysis</span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;