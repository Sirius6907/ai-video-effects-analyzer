import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TutorialStepCard = ({ 
  step, 
  isActive, 
  isCompleted, 
  onStepClick,
  onToggleExpand,
  isExpanded 
}) => {
  const getStepStatusIcon = () => {
    if (isCompleted) return { name: 'CheckCircle2', color: 'var(--color-success)' };
    if (isActive) return { name: 'PlayCircle', color: 'var(--color-primary)' };
    return { name: 'Circle', color: 'var(--color-muted-foreground)' };
  };

  const statusIcon = getStepStatusIcon();

  return (
    <div 
      className={`
        border rounded-lg transition-smooth overflow-hidden
        ${isActive ? 'border-primary shadow-glow-sm bg-primary/5' : 'border-border bg-card'}
        ${isCompleted ? 'opacity-75' : ''}
      `}
    >
      <button
        onClick={onStepClick}
        className="w-full p-4 md:p-5 lg:p-6 flex items-start gap-3 md:gap-4 text-left hover:bg-muted/30 transition-smooth"
      >
        <div className="flex-shrink-0 mt-1">
          <Icon name={statusIcon?.name} size={20} color={statusIcon?.color} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">
                  Step {step?.stepNumber}
                </span>
                {step?.difficulty && (
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full font-medium
                    ${step?.difficulty === 'beginner' ? 'bg-success/20 text-success' : ''}
                    ${step?.difficulty === 'intermediate' ? 'bg-warning/20 text-warning' : ''}
                    ${step?.difficulty === 'advanced' ? 'bg-error/20 text-error' : ''}
                  `}>
                    {step?.difficulty}
                  </span>
                )}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2">
                {step?.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {step?.duration && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{step?.duration}</span>
                </div>
              )}
              <Icon 
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {step?.description}
          </p>
        </div>
      </button>
      {isExpanded && (
        <div className="border-t border-border p-4 md:p-5 lg:p-6 space-y-4 bg-muted/20">
          {step?.thumbnail && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted">
              <Image 
                src={step?.thumbnail} 
                alt={step?.thumbnailAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Icon name="FileText" size={16} color="var(--color-primary)" />
              Instructions
            </h4>
            <div className="space-y-2">
              {step?.instructions?.map((instruction, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {step?.parameters && step?.parameters?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Icon name="Settings" size={16} color="var(--color-secondary)" />
                After Effects Parameters
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {step?.parameters?.map((param, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-card border border-border">
                    <span className="text-xs text-muted-foreground">{param?.name}</span>
                    <span className="text-xs font-mono text-foreground">{param?.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step?.tips && step?.tips?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
                Pro Tips
              </h4>
              <div className="space-y-1">
                {step?.tips?.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Icon name="ChevronRight" size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={() => console.log('Play video for step:', step?.stepNumber)}
            >
              Watch Demo
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={() => console.log('Copy parameters for step:', step?.stepNumber)}
            >
              Copy Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialStepCard;