import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemPerformance = ({ metrics }) => {
  const performanceItems = [
    {
      label: 'CPU Usage',
      value: metrics?.cpuUsage,
      max: 100,
      unit: '%',
      icon: 'Cpu',
      color: metrics?.cpuUsage > 80 ? 'var(--color-error)' : metrics?.cpuUsage > 60 ? 'var(--color-warning)' : 'var(--color-success)'
    },
    {
      label: 'Memory',
      value: metrics?.memoryUsed,
      max: metrics?.memoryTotal,
      unit: 'GB',
      icon: 'HardDrive',
      color: (metrics?.memoryUsed / metrics?.memoryTotal * 100) > 80 ? 'var(--color-error)' : 'var(--color-success)'
    },
    {
      label: 'Processing Queue',
      value: metrics?.queuedJobs,
      max: metrics?.maxConcurrent,
      unit: 'jobs',
      icon: 'ListOrdered',
      color: metrics?.queuedJobs >= metrics?.maxConcurrent ? 'var(--color-warning)' : 'var(--color-primary)'
    }
  ];

  const getPerformanceStatus = () => {
    if (metrics?.cpuUsage > 80 || (metrics?.memoryUsed / metrics?.memoryTotal * 100) > 80) {
      return {
        label: 'High Load',
        color: 'var(--color-error)',
        icon: 'AlertTriangle',
        message: 'System under heavy load. Processing may be slower.'
      };
    }
    if (metrics?.queuedJobs >= metrics?.maxConcurrent) {
      return {
        label: 'Queue Full',
        color: 'var(--color-warning)',
        icon: 'Clock',
        message: 'Processing queue is full. New uploads will be queued.'
      };
    }
    return {
      label: 'Optimal',
      color: 'var(--color-success)',
      icon: 'CheckCircle2',
      message: 'System running smoothly. Ready for processing.'
    };
  };

  const status = getPerformanceStatus();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Activity" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">System Performance</h3>
        </div>
        <div className="flex items-center gap-2">
          <Icon name={status?.icon} size={16} color={status?.color} />
          <span className="text-sm font-medium" style={{ color: status?.color }}>
            {status?.label}
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5 flex-shrink-0" />
          <p className="text-xs md:text-sm text-muted-foreground">{status?.message}</p>
        </div>
      </div>
      <div className="space-y-4">
        {performanceItems?.map((item) => {
          const percentage = (item?.value / item?.max) * 100;
          
          return (
            <div key={item?.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name={item?.icon} size={16} color={item?.color} />
                  <span className="text-sm font-medium text-foreground">{item?.label}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {item?.value?.toFixed(1)}/{item?.max?.toFixed(1)} {item?.unit}
                </span>
              </div>
              <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-250"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: item?.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
        <div className="p-3 md:p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Zap" size={16} color="var(--color-warning)" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Avg. Processing</span>
          </div>
          <div className="text-lg md:text-xl font-semibold text-foreground">
            {metrics?.avgProcessingTime} min
          </div>
        </div>
        <div className="p-3 md:p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
            <span className="text-xs md:text-sm font-medium text-muted-foreground">Completed Today</span>
          </div>
          <div className="text-lg md:text-xl font-semibold text-foreground">
            {metrics?.completedToday}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPerformance;