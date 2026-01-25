import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutionHistory = ({ history }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'error':
        return { name: 'AlertCircle', color: 'var(--color-error)' };
      case 'cancelled':
        return { name: 'XCircle', color: 'var(--color-warning)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  if (history?.length === 0) {
    return (
      <div className="p-6 md:p-8 lg:p-10 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
          <Icon name="History" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
          No Execution History
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Completed executions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-5 lg:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Recent Executions
      </h3>
      <div className="space-y-3">
        {history?.map((item) => {
          const statusIcon = getStatusIcon(item?.status);
          
          return (
            <div 
              key={item?.id}
              className="p-3 md:p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-smooth"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={statusIcon?.name} 
                    size={18} 
                    color={statusIcon?.color} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                      {item?.effectName}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item?.timestamp}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Clock" size={12} color="currentColor" />
                      <span>Duration: {item?.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Layers" size={12} color="currentColor" />
                      <span>{item?.composition}</span>
                    </div>
                  </div>

                  {item?.error && (
                    <div className="mt-2 p-2 bg-error/10 border border-error/30 rounded text-xs text-error">
                      {item?.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionHistory;