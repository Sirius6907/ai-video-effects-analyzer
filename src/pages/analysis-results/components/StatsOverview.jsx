import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Effects',
      value: stats?.totalEffects,
      icon: 'Layers',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/20'
    },
    {
      label: 'Avg Confidence',
      value: `${stats?.avgConfidence}%`,
      icon: 'Target',
      color: 'var(--color-success)',
      bgColor: 'bg-success/20'
    },
    {
      label: 'Video Duration',
      value: `${stats?.videoDuration}s`,
      icon: 'Clock',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/20'
    },
    {
      label: 'Processing Time',
      value: `${stats?.processingTime}s`,
      icon: 'Zap',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div 
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-glow transition-smooth"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;