import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EffectCard = ({ effect, onPreview, onGenerateTutorial, onAddToQueue }) => {
  const getEffectIcon = (type) => {
    const icons = {
      zoom: 'ZoomIn',
      pan: 'Move',
      blur: 'Droplet',
      glow: 'Sparkles',
      shake: 'Vibrate',
      text: 'Type'
    };
    return icons?.[type?.toLowerCase()] || 'Wand2';
  };

  const getEffectColor = (type) => {
    const colors = {
      zoom: 'var(--color-primary)',
      pan: 'var(--color-secondary)',
      blur: 'var(--color-warning)',
      glow: 'var(--color-success)',
      shake: 'var(--color-error)',
      text: '#3B82F6'
    };
    return colors?.[type?.toLowerCase()] || 'var(--color-muted-foreground)';
  };

  const getComplexityBadge = (complexity) => {
    const configs = {
      easy: { color: 'var(--color-success)', bg: 'bg-success/20', label: 'Easy' },
      medium: { color: 'var(--color-warning)', bg: 'bg-warning/20', label: 'Medium' },
      hard: { color: 'var(--color-error)', bg: 'bg-error/20', label: 'Hard' }
    };
    return configs?.[complexity?.toLowerCase()] || configs?.medium;
  };

  const complexityConfig = getComplexityBadge(effect?.complexity);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-glow transition-smooth">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div 
            className="p-2.5 rounded-lg flex-shrink-0"
            style={{ backgroundColor: `${getEffectColor(effect?.type)}20` }}
          >
            <Icon 
              name={getEffectIcon(effect?.type)} 
              size={20} 
              color={getEffectColor(effect?.type)} 
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground mb-1 truncate">
              {effect?.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {effect?.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Icon name="Target" size={14} color="var(--color-primary)" />
            <span className="text-sm font-mono font-semibold text-foreground">
              {effect?.confidence}%
            </span>
          </div>
          <div 
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${complexityConfig?.bg}`}
            style={{ color: complexityConfig?.color }}
          >
            {complexityConfig?.label}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">
            {effect?.timestamp}s
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Timer" size={14} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">
            {effect?.duration}s
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Play"
          iconPosition="left"
          onClick={() => onPreview?.(effect)}
          className="flex-1 min-w-[120px]"
        >
          Preview
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => onGenerateTutorial?.(effect)}
          className="flex-1 min-w-[120px]"
        >
          Tutorial
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onAddToQueue?.(effect)}
          className="flex-1 min-w-[120px]"
        >
          Add to Queue
        </Button>
      </div>
    </div>
  );
};

export default EffectCard;