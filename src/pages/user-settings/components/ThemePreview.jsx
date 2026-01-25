import React from 'react';
import Icon from '../../../components/AppIcon';

const ThemePreview = ({ theme, isSelected, onSelect }) => {
  const getThemeColors = () => {
    switch (theme?.id) {
      case 'dark':
        return {
          bg: 'bg-slate-900',
          card: 'bg-slate-800',
          text: 'text-slate-50',
          accent: 'bg-indigo-500'
        };
      case 'light':
        return {
          bg: 'bg-slate-50',
          card: 'bg-white',
          text: 'text-slate-900',
          accent: 'bg-indigo-500'
        };
      case 'midnight':
        return {
          bg: 'bg-slate-950',
          card: 'bg-slate-900',
          text: 'text-slate-100',
          accent: 'bg-violet-500'
        };
      default:
        return {
          bg: 'bg-slate-900',
          card: 'bg-slate-800',
          text: 'text-slate-50',
          accent: 'bg-indigo-500'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full rounded-lg overflow-hidden transition-smooth
        ${isSelected 
          ? 'ring-2 ring-primary shadow-glow-md scale-105' 
          : 'hover:scale-102 hover:shadow-glow-sm'
        }
      `}
    >
      <div className={`${colors?.bg} p-3 md:p-4 aspect-video`}>
        <div className="space-y-2">
          <div className={`${colors?.card} rounded p-2 flex items-center gap-2`}>
            <div className={`w-6 h-6 md:w-8 md:h-8 ${colors?.accent} rounded`} />
            <div className="flex-1 space-y-1">
              <div className={`h-2 ${colors?.text} opacity-80 rounded w-3/4`} />
              <div className={`h-1.5 ${colors?.text} opacity-50 rounded w-1/2`} />
            </div>
          </div>
          <div className={`${colors?.card} rounded p-2 h-12 md:h-16`} />
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 p-1.5 bg-primary text-primary-foreground rounded-full shadow-glow">
          <Icon name="Check" size={14} />
        </div>
      )}
      <div className="p-2 md:p-3 bg-card border-t border-border">
        <div className="text-sm md:text-base font-medium text-foreground">
          {theme?.name}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {theme?.description}
        </div>
      </div>
    </button>
  );
};

export default ThemePreview;