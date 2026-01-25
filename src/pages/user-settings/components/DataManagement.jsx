import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DataManagementCard = ({ 
  title, 
  description, 
  icon, 
  stats,
  actions 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-glow-md transition-smooth">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
        <div className="p-2 md:p-2.5 lg:p-3 bg-accent/20 rounded-lg flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-accent)" className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-semibold text-foreground truncate">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      {stats && stats?.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
          {stats?.map((stat, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-3 md:p-4">
              <div className="text-xs md:text-sm text-muted-foreground mb-1">
                {stat?.label}
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-foreground font-mono">
                {stat?.value}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant || 'outline'}
            size="sm"
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            disabled={action?.disabled}
            className="flex-1"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DataManagementCard;