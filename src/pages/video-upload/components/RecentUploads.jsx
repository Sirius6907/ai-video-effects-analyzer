import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const RecentUploads = ({ uploads }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle2', color: 'var(--color-success)', label: 'Completed' };
      case 'processing':
        return { icon: 'Loader2', color: 'var(--color-primary)', label: 'Processing' };
      case 'failed':
        return { icon: 'XCircle', color: 'var(--color-error)', label: 'Failed' };
      case 'queued':
        return { icon: 'Clock', color: 'var(--color-warning)', label: 'Queued' };
      default:
        return { icon: 'FileVideo', color: 'var(--color-muted-foreground)', label: 'Unknown' };
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024)?.toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024))?.toFixed(1)} MB`;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const uploadDate = new Date(date);
    const diffMs = now - uploadDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return uploadDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleViewResults = (uploadId) => {
    navigate('/analysis-results', { state: { uploadId } });
  };

  if (!uploads || uploads?.length === 0) {
    return (
      <div className="text-center py-12 md:py-16">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
          <Icon name="FileVideo" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">No Recent Uploads</h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Upload your first video to start AI-powered analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {uploads?.map((upload) => {
        const statusConfig = getStatusConfig(upload?.status);
        
        return (
          <div
            key={upload?.id}
            className="p-4 md:p-5 rounded-lg border border-border bg-card hover:bg-card/80 transition-smooth"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted/30 flex-shrink-0">
                    <Icon name="Film" size={20} color="var(--color-foreground)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                      {upload?.fileName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 text-xs md:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="HardDrive" size={14} />
                        {formatFileSize(upload?.fileSize)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {formatDuration(upload?.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {formatDate(upload?.uploadedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {upload?.status === 'processing' && (
                  <ProgressIndicator
                    progress={upload?.progress}
                    status="processing"
                    message={upload?.processingMessage}
                    showPercentage={true}
                  />
                )}

                {upload?.status !== 'processing' && (
                  <div className="flex items-center gap-2">
                    <Icon name={statusConfig?.icon} size={16} color={statusConfig?.color} />
                    <span className="text-sm font-medium" style={{ color: statusConfig?.color }}>
                      {statusConfig?.label}
                    </span>
                    {upload?.estimatedTime && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        Est. {upload?.estimatedTime}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 lg:flex-shrink-0">
                {upload?.status === 'completed' && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewResults(upload?.id)}
                  >
                    View Results
                  </Button>
                )}
                {upload?.status === 'failed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Retry
                  </Button>
                )}
                {upload?.status === 'processing' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentUploads;