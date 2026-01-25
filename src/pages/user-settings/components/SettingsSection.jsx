import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSection = ({ 
  title, 
  description, 
  icon, 
  children,
  isExpanded = true,
  onToggle
}) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-glow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 lg:p-6 text-left hover:bg-muted/30 transition-smooth"
      >
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className="p-2 md:p-2.5 lg:p-3 bg-primary/20 rounded-lg flex-shrink-0">
            <Icon name={icon} size={20} color="var(--color-primary)" className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground truncate">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="var(--color-muted-foreground)"
          className="flex-shrink-0 ml-2"
        />
      </button>

      {isExpanded && (
        <div className="p-4 md:p-5 lg:p-6 pt-0 space-y-4 md:space-y-5 lg:space-y-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;