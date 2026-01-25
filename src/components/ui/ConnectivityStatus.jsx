import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ConnectivityStatus = ({ 
  isConnected = true,
  connectionType = 'after-effects',
  showLabel = true,
  variant = 'default',
  onRetry
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastChecked(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    if (isConnected) {
      return {
        color: 'var(--color-success)',
        bgColor: 'bg-success/20',
        textColor: 'text-success',
        icon: 'CheckCircle2',
        label: 'Connected',
        description: `${connectionType === 'after-effects' ? 'After Effects' : 'Server'} connection active`
      };
    }

    return {
      color: 'var(--color-error)',
      bgColor: 'bg-error/20',
      textColor: 'text-error',
      icon: 'AlertCircle',
      label: 'Disconnected',
      description: `${connectionType === 'after-effects' ? 'After Effects' : 'Server'} connection lost`
    };
  };

  const config = getStatusConfig();

  const handleRetry = async () => {
    if (onRetry && !isRetrying) {
      setIsRetrying(true);
      try {
        await onRetry();
      } finally {
        setIsRetrying(false);
        setLastChecked(new Date());
      }
    }
  };

  const formatLastChecked = () => {
    const now = new Date();
    const diff = Math.floor((now - lastChecked) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'} ${isConnected ? 'animate-pulse' : ''}`} />
        {showLabel && (
          <span className={`text-xs font-medium ${config?.textColor}`}>
            {config?.label}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div 
        className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-error'} ${isConnected ? 'animate-pulse' : ''}`}
        title={config?.description}
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg ${config?.bgColor} border border-border/50`}>
      <div className="flex items-center gap-2">
        <Icon name={config?.icon} size={18} color={config?.color} />
        {showLabel && (
          <div className="flex flex-col">
            <span className={`text-sm font-medium ${config?.textColor}`}>
              {config?.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {config?.description}
            </span>
          </div>
        )}
      </div>
      {!isConnected && onRetry && (
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="ml-auto px-3 py-1 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isRetrying ? (
            <>
              <Icon name="Loader2" size={12} className="animate-spin" />
              <span>Retrying...</span>
            </>
          ) : (
            <>
              <Icon name="RefreshCw" size={12} />
              <span>Retry</span>
            </>
          )}
        </button>
      )}
      {isConnected && (
        <span className="ml-auto text-xs text-muted-foreground">
          {formatLastChecked()}
        </span>
      )}
    </div>
  );
};

export default ConnectivityStatus;