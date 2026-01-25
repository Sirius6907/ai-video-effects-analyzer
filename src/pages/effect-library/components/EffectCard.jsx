import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EffectCard = ({ effect, onPreview, onApply, onBookmark, isBookmarked }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'text-success bg-success/20';
      case 'intermediate':
        return 'text-warning bg-warning/20';
      case 'advanced':
        return 'text-error bg-error/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <div
      className="group relative bg-card border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-glow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-muted/30">
        <Image
          src={effect?.thumbnail}
          alt={effect?.thumbnailAlt}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center gap-2 animate-in fade-in duration-200">
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              onClick={() => onPreview(effect)}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              onClick={() => onApply(effect)}
            >
              Apply
            </Button>
          </div>
        )}

        {effect?.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
            New
          </div>
        )}

        <button
          onClick={() => onBookmark(effect?.id)}
          className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-md transition-smooth hover:bg-background"
        >
          <Icon
            name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
            size={16}
            color={isBookmarked ? 'var(--color-primary)' : 'currentColor'}
          />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
            {effect?.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Icon name="TrendingUp" size={14} />
            <span>{effect?.usageCount}</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">
          {effect?.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${getDifficultyColor(effect?.difficulty)}`}>
              {effect?.difficulty}
            </span>
            <span className="px-2 py-1 text-xs font-medium text-foreground bg-muted/30 rounded-md">
              {effect?.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                color={i < effect?.rating ? 'var(--color-warning)' : 'var(--color-muted)'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectCard;