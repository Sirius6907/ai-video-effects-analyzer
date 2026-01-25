import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EffectPreviewModal = ({ effect, onClose, onApply, onLearnMore }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!effect) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'parameters', label: 'Parameters', icon: 'Settings' },
    { id: 'examples', label: 'Examples', icon: 'Image' }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1000 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-glow-xl">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Icon name="Sparkles" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">{effect?.name}</h2>
              <p className="text-xs md:text-sm text-muted-foreground">{effect?.category} Effect</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="flex border-b border-border overflow-x-auto scrollbar-custom">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-medium transition-smooth whitespace-nowrap flex-shrink-0
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-custom p-4 md:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30">
                <Image
                  src={effect?.previewVideo || effect?.thumbnail}
                  alt={effect?.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {effect?.fullDescription || effect?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="BarChart3" size={18} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Difficulty</span>
                  </div>
                  <p className="text-base font-semibold text-foreground capitalize">{effect?.difficulty}</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="TrendingUp" size={18} color="var(--color-success)" />
                    <span className="text-sm font-medium text-foreground">Usage</span>
                  </div>
                  <p className="text-base font-semibold text-foreground">{effect?.usageCount} times</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Star" size={18} color="var(--color-warning)" />
                    <span className="text-sm font-medium text-foreground">Rating</span>
                  </div>
                  <p className="text-base font-semibold text-foreground">{effect?.rating}/5</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Effect Parameters</h3>
              {effect?.parameters?.map((param, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm md:text-base font-medium text-foreground">{param?.name}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">{param?.description}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/20 rounded-md whitespace-nowrap">
                      {param?.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Range: {param?.range}</span>
                    <span>Default: {param?.default}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Usage Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {effect?.examples?.map((example, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg overflow-hidden">
                    <div className="aspect-video">
                      <Image
                        src={example?.image}
                        alt={example?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-foreground mb-1">{example?.title}</h4>
                      <p className="text-xs text-muted-foreground">{example?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="default"
            fullWidth
            iconName="Plus"
            onClick={() => onApply(effect)}
          >
            Apply to Video
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="BookOpen"
            onClick={() => onLearnMore(effect)}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EffectPreviewModal;