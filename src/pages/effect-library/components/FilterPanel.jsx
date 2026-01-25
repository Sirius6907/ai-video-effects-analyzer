import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onReset, isOpen, onToggle }) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'motion', label: 'Motion' },
    { value: 'color', label: 'Color' },
    { value: 'text', label: 'Text' },
    { value: 'transitions', label: 'Transitions' },
    { value: 'distortion', label: 'Distortion' },
    { value: 'blur', label: 'Blur & Glow' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const useCaseOptions = [
    { value: 'all', label: 'All Use Cases' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'educational', label: 'Educational' },
    { value: 'commercial', label: 'Commercial' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="lg:hidden w-full flex items-center justify-between p-4 text-foreground hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} />
          <span className="font-semibold">Filters</span>
        </div>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={20} />
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 md:p-6 space-y-4 md:space-y-6`}>
        <div>
          <Input
            type="search"
            placeholder="Search effects..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />
        </div>

        <div>
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={filters?.difficulty}
            onChange={(value) => onFilterChange('difficulty', value)}
          />
        </div>

        <div>
          <Select
            label="Use Case"
            options={useCaseOptions}
            value={filters?.useCase}
            onChange={(value) => onFilterChange('useCase', value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Features</label>
          <div className="space-y-2">
            <Checkbox
              label="After Effects Compatible"
              checked={filters?.aeCompatible}
              onChange={(e) => onFilterChange('aeCompatible', e?.target?.checked)}
            />
            <Checkbox
              label="Has Tutorial"
              checked={filters?.hasTutorial}
              onChange={(e) => onFilterChange('hasTutorial', e?.target?.checked)}
            />
            <Checkbox
              label="Trending"
              checked={filters?.trending}
              onChange={(e) => onFilterChange('trending', e?.target?.checked)}
            />
            <Checkbox
              label="Bookmarked Only"
              checked={filters?.bookmarkedOnly}
              onChange={(e) => onFilterChange('bookmarkedOnly', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;