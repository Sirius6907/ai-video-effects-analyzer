import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractivePracticeMode = ({ 
  currentStep, 
  onComplete, 
  onSkip,
  onHint 
}) => {
  const [isPracticing, setIsPracticing] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const handleStartPractice = () => {
    setIsPracticing(true);
    setHintsUsed(0);
    setTimeSpent(0);
  };

  const handleUseHint = () => {
    setHintsUsed(hintsUsed + 1);
    if (onHint) onHint(currentStep?.hints?.[hintsUsed]);
  };

  const handleComplete = () => {
    setIsPracticing(false);
    if (onComplete) onComplete({ hintsUsed, timeSpent });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isPracticing) {
    return (
      <div className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-3 bg-primary/20 rounded-lg">
            <Icon name="Zap" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              Practice Mode Available
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try recreating this effect yourself before viewing the solution. This hands-on approach helps reinforce learning.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                <span>Step-by-step guidance available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
                <span>{currentStep?.hints?.length || 3} hints to help you</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Icon name="Award" size={16} color="var(--color-primary)" />
                <span>Earn completion badge</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="default"
                size="default"
                iconName="Play"
                iconPosition="left"
                onClick={handleStartPractice}
              >
                Start Practice
              </Button>
              <Button
                variant="outline"
                size="default"
                iconName="FastForward"
                iconPosition="left"
                onClick={onSkip}
              >
                Skip to Solution
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-card border-2 border-primary rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              Practice Mode Active
            </span>
          </div>
          <span className="text-sm font-mono text-muted-foreground">
            {formatTime(timeSpent)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Your Task:
            </h4>
            <p className="text-sm text-muted-foreground">
              {currentStep?.practiceTask || `Try to recreate the "${currentStep?.title}" effect using the techniques you've learned.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Lightbulb"
              iconPosition="left"
              onClick={handleUseHint}
              disabled={hintsUsed >= (currentStep?.hints?.length || 3)}
            >
              Get Hint ({hintsUsed}/{currentStep?.hints?.length || 3})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => console.log('Show reference')}
            >
              View Reference
            </Button>
          </div>

          {hintsUsed > 0 && (
            <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-foreground mb-1">
                    Hint {hintsUsed}:
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {currentStep?.hints?.[hintsUsed - 1] || "Focus on the keyframe timing and easing curves."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="success"
          size="default"
          iconName="CheckCircle2"
          iconPosition="left"
          onClick={handleComplete}
          fullWidth
        >
          I've Completed It
        </Button>
        <Button
          variant="outline"
          size="default"
          iconName="Eye"
          iconPosition="left"
          onClick={() => {
            setIsPracticing(false);
            onSkip();
          }}
          fullWidth
        >
          Show Solution
        </Button>
      </div>
    </div>
  );
};

export default InteractivePracticeMode;