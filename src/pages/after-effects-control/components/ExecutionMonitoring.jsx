import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ExecutionMonitor = ({ currentExecution }) => {
  if (!currentExecution) {
    return (
      <div className="p-6 md:p-8 lg:p-10 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
          <Icon name="Zap" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
          No Active Execution
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Queue items will appear here when processing begins
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="p-2.5 md:p-3 bg-primary/20 rounded-lg flex-shrink-0 animate-pulse">
          <Icon name="Zap" size={24} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
            {currentExecution?.effectName}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {currentExecution?.currentStep}
          </p>
        </div>
      </div>
      <ProgressIndicator
        progress={currentExecution?.progress}
        status="processing"
        message={`Step ${currentExecution?.stepNumber} of ${currentExecution?.totalSteps}`}
        showPercentage={true}
      />
      <div className="space-y-2 md:space-y-3">
        <h4 className="text-xs md:text-sm font-medium text-foreground">Execution Steps:</h4>
        <div className="space-y-2">
          {currentExecution?.steps?.map((step, index) => (
            <div 
              key={index}
              className={`
                flex items-start gap-3 p-2.5 md:p-3 rounded-lg transition-smooth
                ${index < currentExecution?.stepNumber - 1 ? 'bg-success/10' : ''}
                ${index === currentExecution?.stepNumber - 1 ? 'bg-primary/10 border border-primary/30' : ''}
                ${index > currentExecution?.stepNumber - 1 ? 'bg-muted/20' : ''}
              `}
            >
              <div className="flex-shrink-0 mt-0.5">
                {index < currentExecution?.stepNumber - 1 && (
                  <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                )}
                {index === currentExecution?.stepNumber - 1 && (
                  <Icon name="Loader2" size={16} color="var(--color-primary)" className="animate-spin" />
                )}
                {index > currentExecution?.stepNumber - 1 && (
                  <Icon name="Circle" size={16} color="var(--color-muted-foreground)" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`
                  text-xs md:text-sm font-medium
                  ${index === currentExecution?.stepNumber - 1 ? 'text-primary' : 'text-foreground'}
                `}>
                  {step?.name}
                </p>
                {step?.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step?.description}
                  </p>
                )}
              </div>
              {step?.duration && index < currentExecution?.stepNumber - 1 && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {step?.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-border">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Elapsed Time</p>
          <p className="text-sm md:text-base font-mono font-semibold text-foreground">
            {currentExecution?.elapsedTime}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="text-sm md:text-base font-mono font-semibold text-foreground">
            {currentExecution?.remainingTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExecutionMonitor;