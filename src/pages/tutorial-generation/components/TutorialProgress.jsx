import React from 'react';
import Icon from '../../../components/AppIcon';

const TutorialProgressTracker = ({ 
  totalSteps, 
  completedSteps, 
  currentStep,
  estimatedTime,
  timeSpent 
}) => {
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const remainingSteps = totalSteps - completedSteps;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Learning Progress
        </h3>
        <span className="text-sm font-mono text-primary">
          {completedSteps}/{totalSteps} Steps
        </span>
      </div>

      <div className="space-y-2">
        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{Math.round(progressPercentage)}% Complete</span>
          <span>{remainingSteps} steps remaining</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="p-3 md:p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} color="var(--color-primary)" />
            <span className="text-xs text-muted-foreground">Time Spent</span>
          </div>
          <p className="text-lg md:text-xl font-semibold text-foreground">
            {formatTime(timeSpent)}
          </p>
        </div>

        <div className="p-3 md:p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Timer" size={16} color="var(--color-secondary)" />
            <span className="text-xs text-muted-foreground">Est. Remaining</span>
          </div>
          <p className="text-lg md:text-xl font-semibold text-foreground">
            {formatTime(estimatedTime - timeSpent)}
          </p>
        </div>
      </div>

      <div className="p-3 md:p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-primary/20 rounded-lg">
            <Icon name="Target" size={18} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Current Focus
            </h4>
            <p className="text-xs text-muted-foreground">
              Step {currentStep}: Practice this technique before moving forward
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 text-success rounded-full text-xs font-medium">
          <Icon name="CheckCircle2" size={14} />
          <span>{completedSteps} Completed</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-full text-xs font-medium">
          <Icon name="PlayCircle" size={14} />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 text-muted-foreground rounded-full text-xs font-medium">
          <Icon name="Circle" size={14} />
          <span>{remainingSteps} Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TutorialProgressTracker;