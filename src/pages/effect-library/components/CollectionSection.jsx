import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CollectionSection = ({ collections, onSelectCollection, activeCollection }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Collections</h3>
        <Button variant="ghost" size="sm" iconName="Plus">
          New
        </Button>
      </div>
      <div className="space-y-2">
        {collections?.map((collection) => (
          <button
            key={collection?.id}
            onClick={() => onSelectCollection(collection?.id)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg transition-smooth text-left
              ${activeCollection === collection?.id
                ? 'bg-primary/20 text-primary border border-primary/30' :'text-foreground hover:bg-muted/50'
              }
            `}
          >
            <div className={`
              p-2 rounded-lg
              ${activeCollection === collection?.id ? 'bg-primary/30' : 'bg-muted/30'}
            `}>
              <Icon
                name={collection?.icon}
                size={18}
                color={activeCollection === collection?.id ? 'var(--color-primary)' : 'currentColor'}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium line-clamp-1">{collection?.name}</div>
              <div className="text-xs text-muted-foreground">{collection?.count} effects</div>
            </div>
            {collection?.isNew && (
              <span className="px-2 py-0.5 text-xs font-medium text-success bg-success/20 rounded-md">
                New
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionSection;