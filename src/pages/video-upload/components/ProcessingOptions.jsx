import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProcessingOptions = ({ options, onChange }) => {
  const analysisDepthOptions = [
    {
      id: 'quick',
      label: 'Quick Scan',
      description: 'Fast analysis focusing on major effects (2-5 minutes)',
      icon: 'Zap',
      color: 'var(--color-warning)'
    },
    {
      id: 'comprehensive',
      label: 'Comprehensive Analysis',
      description: 'Deep analysis detecting all effects and subtle animations (10-20 minutes)',
      icon: 'Target',
      color: 'var(--color-primary)'
    }
  ];

  const effectCategories = [
    { id: 'motion', label: 'Motion Effects', description: 'Zoom, pan, rotation, shake', icon: 'Move' },
    { id: 'text', label: 'Text Effects', description: 'Text reveals, animations, kinetic typography', icon: 'Type' },
    { id: 'color', label: 'Color Grading', description: 'Color corrections, filters, LUTs', icon: 'Palette' },
    { id: 'transitions', label: 'Transitions', description: 'Cuts, fades, wipes, morphs', icon: 'Shuffle' },
    { id: 'blur', label: 'Blur & Focus', description: 'Gaussian blur, depth of field, focus pulls', icon: 'Droplet' },
    { id: 'glow', label: 'Glow & Light', description: 'Glows, light leaks, lens flares', icon: 'Sparkles' }
  ];

  const outputOptions = [
    { id: 'aeScript', label: 'Generate After Effects Script', description: 'JSX script for automation' },
    { id: 'tutorial', label: 'Create Tutorial Content', description: 'Step-by-step learning guide' },
    { id: 'timeline', label: 'Timeline Visualization', description: 'Visual effect timeline' }
  ];

  const handleAnalysisDepthChange = (depthId) => {
    onChange({ ...options, analysisDepth: depthId });
  };

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = options?.effectCategories || [];
    const newCategories = currentCategories?.includes(categoryId)
      ? currentCategories?.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    onChange({ ...options, effectCategories: newCategories });
  };

  const handleOutputToggle = (outputId) => {
    const currentOutputs = options?.outputs || [];
    const newOutputs = currentOutputs?.includes(outputId)
      ? currentOutputs?.filter(id => id !== outputId)
      : [...currentOutputs, outputId];
    onChange({ ...options, outputs: newOutputs });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Gauge" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Analysis Depth</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {analysisDepthOptions?.map((depth) => (
            <button
              key={depth?.id}
              onClick={() => handleAnalysisDepthChange(depth?.id)}
              className={`
                p-4 md:p-5 rounded-lg border-2 text-left transition-all duration-250
                ${options?.analysisDepth === depth?.id
                  ? 'border-primary bg-primary/10 shadow-glow-sm'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg
                  ${options?.analysisDepth === depth?.id ? 'bg-primary/20' : 'bg-muted/30'}
                `}>
                  <Icon name={depth?.icon} size={20} color={depth?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base font-medium text-foreground">{depth?.label}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{depth?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Layers" size={20} color="var(--color-secondary)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Target Effect Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {effectCategories?.map((category) => (
            <div
              key={category?.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-smooth"
            >
              <Checkbox
                checked={options?.effectCategories?.includes(category?.id) || false}
                onChange={() => handleCategoryToggle(category?.id)}
                label={
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted/30">
                      <Icon name={category?.icon} size={18} color="var(--color-foreground)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{category?.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{category?.description}</div>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="FileOutput" size={20} color="var(--color-accent)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Output Preferences</h3>
        </div>
        <div className="space-y-3">
          {outputOptions?.map((output) => (
            <div
              key={output?.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-smooth"
            >
              <Checkbox
                checked={options?.outputs?.includes(output?.id) || false}
                onChange={() => handleOutputToggle(output?.id)}
                label={
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">{output?.label}</div>
                    <div className="text-xs text-muted-foreground">{output?.description}</div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptions;