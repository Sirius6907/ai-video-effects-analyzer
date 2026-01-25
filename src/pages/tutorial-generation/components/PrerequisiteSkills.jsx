import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrerequisiteSkillsCard = ({ skills, onSkillClick }) => {
  return (
    <div className="p-4 md:p-5 bg-card border border-border rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="BookOpen" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Prerequisites
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Skills you should know before starting this tutorial
      </p>
      <div className="space-y-2">
        {skills?.map((skill) => (
          <div
            key={skill?.id}
            className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
            onClick={() => onSkillClick(skill?.id)}
          >
            <div className="flex-shrink-0 mt-0.5">
              {skill?.isCompleted ? (
                <Icon name="CheckCircle2" size={18} color="var(--color-success)" />
              ) : (
                <Icon name="Circle" size={18} color="var(--color-muted-foreground)" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {skill?.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {skill?.description}
              </p>
              {!skill?.isCompleted && skill?.tutorialLink && (
                <Button
                  variant="link"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="mt-2 p-0 h-auto text-xs"
                  onClick={(e) => {
                    e?.stopPropagation();
                    console.log('Learn skill:', skill?.id);
                  }}
                >
                  Learn this skill
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {skills?.filter(s => s?.isCompleted)?.length} of {skills?.length} completed
          </span>
          <span className="text-primary font-medium">
            {Math.round((skills?.filter(s => s?.isCompleted)?.length / skills?.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrerequisiteSkillsCard;