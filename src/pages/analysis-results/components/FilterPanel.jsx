import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFilterChange }) => {
  const effectTypeOptions = [
    { value: 'all', label: 'All Effects' },
    { value: 'zoom', label: 'Zoom' },
    { value: 'pan', label: 'Pan' },
    { value: 'blur', label: 'Blur' },
    { value: 'glow', label: 'Glow' },
    { value: 'shake', label: 'Shake' },
    { value: 'text', label: 'Text Reveal' }
  ];

  const complexityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const sortOptions = [
    { value: 'timestamp', label: 'Timestamp' },
    { value: 'confidence', label: 'Confidence' },
    { value: 'duration', label: 'Duration' },
    { value: 'complexity', label: 'Complexity' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Filter" size={18} color="var(--color-primary)" />
        <h3 className="text-base font-semibold text-foreground">Filters</h3>
      </div>
      <div className="space-y-4">
        <Select
          label="Effect Type"
          options={effectTypeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange?.('type', value)}
        />

        <Select
          label="Complexity"
          options={complexityOptions}
          value={filters?.complexity}
          onChange={(value) => onFilterChange?.('complexity', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange?.('sortBy', value)}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Confidence Threshold
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              value={filters?.minConfidence}
              onChange={(e) => onFilterChange?.('minConfidence', parseInt(e?.target?.value))}
              className="flex-1 h-2 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <span className="text-sm font-mono text-foreground w-12 text-right">
              {filters?.minConfidence}%
            </span>
          </div>
        </div>

        <Input
          type="text"
          label="Search Effects"
          placeholder="Search by name or description..."
          value={filters?.searchQuery}
          onChange={(e) => onFilterChange?.('searchQuery', e?.target?.value)}
        />

        <div className="pt-2 border-t border-border">
          <button
            onClick={() => onFilterChange?.('reset')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-smooth"
          >
            <Icon name="RotateCcw" size={16} />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;