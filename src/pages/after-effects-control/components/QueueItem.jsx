import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueueItem = ({ 
  item, 
  onEdit, 
  onRemove, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast 
}) => {
  const getStatusConfig = () => {
    switch (item?.status) {
      case 'pending':
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/30',
          icon: 'Clock',
          label: 'Pending'
        };
      case 'processing':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/20',
          icon: 'Loader2',
          label: 'Processing',
          animate: true
        };
      case 'completed':
        return {
          color: 'text-success',
          bgColor: 'bg-success/20',
          icon: 'CheckCircle2',
          label: 'Completed'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error/20',
          icon: 'AlertCircle',
          label: 'Error'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/30',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`
      p-4 md:p-5 lg:p-6 rounded-lg border transition-smooth
      ${item?.status === 'processing' ? 'border-primary bg-primary/5' : 'border-border bg-card'}
    `}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`
            p-2 md:p-2.5 rounded-lg ${config?.bgColor} flex-shrink-0
            ${config?.animate ? 'animate-pulse' : ''}
          `}>
            <Icon 
              name={config?.icon} 
              size={20} 
              color={`var(--color-${item?.status === 'processing' ? 'primary' : item?.status === 'completed' ? 'success' : item?.status === 'error' ? 'error' : 'muted-foreground'})`}
              className={config?.animate ? 'animate-spin' : ''}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-foreground truncate">
                  {item?.effectName}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  {item?.composition}
                </p>
              </div>
              <span className={`
                text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap
                ${config?.color} ${config?.bgColor}
              `}>
                {config?.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mt-3">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Layers" size={14} color="currentColor" />
                <span>Layer: {item?.targetLayer}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Clock" size={14} color="currentColor" />
                <span>Est. {item?.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Zap" size={14} color="currentColor" />
                <span>Priority: {item?.priority}</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Hash" size={14} color="currentColor" />
                <span>Position: {item?.queuePosition}</span>
              </div>
            </div>

            {item?.parameters && (
              <div className="mt-3 p-2 md:p-3 bg-muted/30 rounded-md">
                <p className="text-xs font-medium text-foreground mb-1.5">Parameters:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(item?.parameters)?.map(([key, value]) => (
                    <span 
                      key={key}
                      className="text-xs px-2 py-1 bg-background rounded text-muted-foreground"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item?.error && (
              <div className="mt-3 p-2 md:p-3 bg-error/10 border border-error/30 rounded-md">
                <p className="text-xs md:text-sm text-error">{item?.error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 flex-wrap lg:flex-nowrap">
          {item?.status === 'pending' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                iconSize={16}
                onClick={() => onEdit(item?.id)}
                className="flex-1 lg:flex-none"
              >
                Edit
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronUp"
                  iconSize={16}
                  onClick={() => onMoveUp(item?.id)}
                  disabled={isFirst}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronDown"
                  iconSize={16}
                  onClick={() => onMoveDown(item?.id)}
                  disabled={isLast}
                />
              </div>
            </>
          )}
          {item?.status === 'error' && (
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconSize={16}
              onClick={() => onEdit(item?.id)}
              className="flex-1 lg:flex-none"
            >
              Retry
            </Button>
          )}
          {(item?.status === 'pending' || item?.status === 'error') && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconSize={16}
              onClick={() => onRemove(item?.id)}
              className="flex-1 lg:flex-none text-error hover:text-error"
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueItem;