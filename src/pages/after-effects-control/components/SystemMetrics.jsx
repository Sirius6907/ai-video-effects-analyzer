import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetrics = ({ metrics }) => {
  const getMetricColor = (value, thresholds) => {
    if (value >= thresholds?.high) return 'text-error';
    if (value >= thresholds?.medium) return 'text-warning';
    return 'text-success';
  };

  const getMetricBgColor = (value, thresholds) => {
    if (value >= thresholds?.high) return 'bg-error/20';
    if (value >= thresholds?.medium) return 'bg-warning/20';
    return 'bg-success/20';
  };

  const metricCards = [
    {
      label: 'CPU Usage',
      value: metrics?.cpuUsage,
      unit: '%',
      icon: 'Cpu',
      thresholds: { high: 80, medium: 60 }
    },
    {
      label: 'Memory',
      value: metrics?.memoryUsage,
      unit: '%',
      icon: 'HardDrive',
      thresholds: { high: 85, medium: 70 }
    },
    {
      label: 'AE Response',
      value: metrics?.aeResponseTime,
      unit: 'ms',
      icon: 'Zap',
      thresholds: { high: 1000, medium: 500 }
    },
    {
      label: 'Queue Size',
      value: metrics?.queueSize,
      unit: '',
      icon: 'List',
      thresholds: { high: 20, medium: 10 }
    }
  ];

  return (
    <div className="p-4 md:p-5 lg:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
        System Performance
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metricCards?.map((metric) => {
          const textColor = getMetricColor(metric?.value, metric?.thresholds);
          const bgColor = getMetricBgColor(metric?.value, metric?.thresholds);

          return (
            <div 
              key={metric?.label}
              className={`p-3 md:p-4 rounded-lg border border-border ${bgColor} transition-smooth`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon 
                  name={metric?.icon} 
                  size={16} 
                  color="var(--color-muted-foreground)" 
                />
                <span className="text-xs text-muted-foreground">
                  {metric?.label}
                </span>
              </div>
              <div className={`text-xl md:text-2xl font-mono font-bold ${textColor}`}>
                {metric?.value}{metric?.unit}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Processing Efficiency</span>
          <span className="font-medium text-foreground">{metrics?.efficiency}%</span>
        </div>
        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
            style={{ width: `${metrics?.efficiency}%` }}
          />
        </div>
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start gap-2 mb-3">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <h4 className="text-xs md:text-sm font-medium text-foreground">
            Optimization Tips
          </h4>
        </div>
        <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Close unnecessary After Effects compositions to reduce memory usage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Process effects in batches during off-peak hours for better performance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Enable disk cache in After Effects preferences for faster rendering</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SystemMetrics;