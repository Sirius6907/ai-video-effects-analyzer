import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ConnectivityStatus from '../../../components/ui/ConnectivityStatus';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const AutomationPanel = ({ queuedEffects = [], onExecute, onClearQueue }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(null);

  const handleExecute = async () => {
    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i < queuedEffects?.length; i++) {
      setCurrentEffect(queuedEffects?.[i]);
      setProgress(((i + 1) / queuedEffects?.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsProcessing(false);
    setCurrentEffect(null);
    onExecute?.();
  };

  const handleRetryConnection = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsConnected(true);
  };

  const totalDuration = queuedEffects?.reduce((sum, effect) => sum + effect?.duration, 0);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={18} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">After Effects Automation</h3>
        </div>
        <ConnectivityStatus 
          isConnected={isConnected}
          connectionType="after-effects"
          variant="compact"
          onRetry={handleRetryConnection}
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Layers" size={16} color="var(--color-primary)" />
              <span className="text-xs text-muted-foreground">Queued Effects</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{queuedEffects?.length}</span>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Clock" size={16} color="var(--color-secondary)" />
              <span className="text-xs text-muted-foreground">Total Duration</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{totalDuration?.toFixed(1)}s</span>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Gauge" size={16} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">Avg Confidence</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              {queuedEffects?.length > 0 
                ? Math.round(queuedEffects?.reduce((sum, e) => sum + e?.confidence, 0) / queuedEffects?.length)
                : 0}%
            </span>
          </div>
        </div>

        {isProcessing && (
          <div className="space-y-3">
            <ProgressIndicator
              progress={progress}
              status="processing"
              message={currentEffect ? `Applying ${currentEffect?.type} effect` : 'Processing...'}
              showPercentage
            />
          </div>
        )}

        {queuedEffects?.length > 0 && !isProcessing && (
          <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-custom">
            {queuedEffects?.map((effect, index) => (
              <div 
                key={effect?.id}
                className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-smooth"
              >
                <span className="text-sm font-mono text-muted-foreground w-6">
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {effect?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {effect?.type} • {effect?.duration}s • {effect?.confidence}%
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => console.log('Remove from queue', effect?.id)}
                />
              </div>
            ))}
          </div>
        )}

        {queuedEffects?.length === 0 && !isProcessing && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-muted/30 rounded-full flex items-center justify-center">
              <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm text-muted-foreground">
              No effects in queue. Add effects to start automation.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            onClick={handleExecute}
            disabled={queuedEffects?.length === 0 || !isConnected || isProcessing}
            loading={isProcessing}
            className="flex-1 min-w-[140px]"
          >
            Execute Queue
          </Button>
          <Button
            variant="outline"
            iconName="FileCode"
            iconPosition="left"
            disabled={queuedEffects?.length === 0}
            className="flex-1 min-w-[140px]"
          >
            Export Script
          </Button>
          <Button
            variant="ghost"
            iconName="Trash2"
            iconPosition="left"
            onClick={onClearQueue}
            disabled={queuedEffects?.length === 0 || isProcessing}
            className="flex-1 min-w-[140px]"
          >
            Clear Queue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPanel;