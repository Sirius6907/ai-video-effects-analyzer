import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingEffects = ({ effects, onSelectEffect }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">Trending This Week</h3>
      </div>
      <div className="space-y-3">
        {effects?.map((effect, index) => (
          <button
            key={effect?.id}
            onClick={() => onSelectEffect(effect)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth text-left group"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/20 text-primary rounded-lg font-semibold text-sm flex-shrink-0">
              {index + 1}
            </div>
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
              <Image
                src={effect?.thumbnail}
                alt={effect?.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground line-clamp-1 mb-1">
                {effect?.name}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="TrendingUp" size={12} />
                  {effect?.trendingScore}%
                </span>
                <span>•</span>
                <span>{effect?.usageCount} uses</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingEffects;