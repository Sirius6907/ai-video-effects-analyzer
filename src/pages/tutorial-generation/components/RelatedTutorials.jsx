import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedTutorialsPanel = ({ tutorials, onTutorialSelect }) => {
  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Related Tutorials
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          onClick={() => console.log('View all tutorials')}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {tutorials?.map((tutorial) => (
          <div
            key={tutorial?.id}
            className="group p-3 md:p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-glow-sm transition-smooth cursor-pointer"
            onClick={() => onTutorialSelect(tutorial?.id)}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted">
                <Image 
                  src={tutorial?.thumbnail} 
                  alt={tutorial?.thumbnailAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                    {tutorial?.title}
                  </h4>
                  {tutorial?.isNew && (
                    <span className="flex-shrink-0 px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {tutorial?.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{tutorial?.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="BarChart3" size={12} />
                    <span className="capitalize">{tutorial?.difficulty}</span>
                  </div>
                  {tutorial?.completionRate && (
                    <div className="flex items-center gap-1 text-xs text-success">
                      <Icon name="TrendingUp" size={12} />
                      <span>{tutorial?.completionRate}% complete</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-secondary/20 rounded-lg">
            <Icon name="Sparkles" size={18} color="var(--color-secondary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Recommended Learning Path
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Complete these tutorials in sequence for best results
            </p>
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => console.log('View learning path')}
            >
              View Path
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTutorialsPanel;