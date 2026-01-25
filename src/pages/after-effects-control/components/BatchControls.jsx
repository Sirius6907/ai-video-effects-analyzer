import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BatchControls = ({ 
  batchSettings, 
  onSettingsChange, 
  onStartBatch,
  onPauseBatch,
  onCancelBatch,
  isProcessing,
  queueCount 
}) => {
  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const executionModeOptions = [
    { value: 'sequential', label: 'Sequential (One at a time)' },
    { value: 'parallel', label: 'Parallel (Multiple effects)' },
    { value: 'smart', label: 'Smart (Auto-optimize)' }
  ];

  return (
    <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
          Batch Processing Settings
        </h3>
        
        <div className="space-y-3 md:space-y-4">
          <Select
            label="Execution Mode"
            description="How effects should be processed"
            options={executionModeOptions}
            value={batchSettings?.executionMode}
            onChange={(value) => onSettingsChange({ ...batchSettings, executionMode: value })}
          />

          <Select
            label="Default Priority"
            description="Priority level for new queue items"
            options={priorityOptions}
            value={batchSettings?.defaultPriority}
            onChange={(value) => onSettingsChange({ ...batchSettings, defaultPriority: value })}
          />

          <div className="p-3 md:p-4 bg-muted/30 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-foreground">Auto-retry on error</span>
              <button
                onClick={() => onSettingsChange({ 
                  ...batchSettings, 
                  autoRetry: !batchSettings?.autoRetry 
                })}
                className={`
                  w-10 h-6 md:w-11 md:h-6 rounded-full transition-smooth relative
                  ${batchSettings?.autoRetry ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <span className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-smooth
                  ${batchSettings?.autoRetry ? 'right-1' : 'left-1'}
                `} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-foreground">Pause on error</span>
              <button
                onClick={() => onSettingsChange({ 
                  ...batchSettings, 
                  pauseOnError: !batchSettings?.pauseOnError 
                })}
                className={`
                  w-10 h-6 md:w-11 md:h-6 rounded-full transition-smooth relative
                  ${batchSettings?.pauseOnError ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <span className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full transition-smooth
                  ${batchSettings?.pauseOnError ? 'right-1' : 'left-1'}
                `} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm md:text-base font-medium text-foreground">
              Queue Status
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              {queueCount} {queueCount === 1 ? 'item' : 'items'} in queue
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          {!isProcessing ? (
            <Button
              variant="default"
              size="default"
              iconName="Play"
              iconPosition="left"
              onClick={onStartBatch}
              disabled={queueCount === 0}
              className="flex-1"
            >
              Start Batch Processing
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="default"
                iconName="Pause"
                iconPosition="left"
                onClick={onPauseBatch}
                className="flex-1"
              >
                Pause
              </Button>
              <Button
                variant="destructive"
                size="default"
                iconName="X"
                iconPosition="left"
                onClick={onCancelBatch}
                className="flex-1"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchControls;