import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TroubleshootingPanel = ({ onRunDiagnostics, onReconnect }) => {
  const [expandedIssue, setExpandedIssue] = useState(null);

  const commonIssues = [
    {
      id: 'connection-lost',
      title: 'Connection to After Effects Lost',
      icon: 'AlertCircle',
      severity: 'high',
      description: 'Unable to communicate with After Effects application',
      solutions: [
        'Verify After Effects is running and not frozen',
        'Check if ExtendScript Toolkit is enabled in AE preferences',
        'Restart After Effects and try reconnecting',
        'Ensure no firewall is blocking local communication'
      ]
    },
    {
      id: 'script-error',
      title: 'Script Execution Failed',
      icon: 'FileCode',
      severity: 'medium',
      description: 'Generated script encountered an error during execution',
      solutions: [
        'Check if target composition exists and is accessible',
        'Verify layer names match the expected format',
        'Ensure After Effects has sufficient memory available',
        'Review script parameters for invalid values'
      ]
    },
    {
      id: 'version-mismatch',
      title: 'Version Compatibility Issue',
      icon: 'AlertTriangle',
      severity: 'medium',
      description: 'After Effects version may not support all features',
      solutions: [
        'Update After Effects to the latest version',
        'Check compatibility matrix in documentation',
        'Disable advanced features for older AE versions',
        'Contact support for version-specific guidance'
      ]
    },
    {
      id: 'performance-slow',
      title: 'Slow Processing Performance',
      icon: 'TrendingDown',
      severity: 'low',
      description: 'Effect application is taking longer than expected',
      solutions: [
        'Close other resource-intensive applications',
        'Reduce preview quality in After Effects',
        'Process effects in smaller batches',
        'Clear After Effects disk cache and restart'
      ]
    }
  ];

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return { color: 'text-error', bgColor: 'bg-error/20', icon: 'AlertCircle' };
      case 'medium':
        return { color: 'text-warning', bgColor: 'bg-warning/20', icon: 'AlertTriangle' };
      case 'low':
        return { color: 'text-primary', bgColor: 'bg-primary/20', icon: 'Info' };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted/20', icon: 'HelpCircle' };
    }
  };

  return (
    <div className="p-4 md:p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Troubleshooting
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRunDiagnostics}
        >
          Run Diagnostics
        </Button>
      </div>
      <div className="space-y-3">
        {commonIssues?.map((issue) => {
          const config = getSeverityConfig(issue?.severity);
          const isExpanded = expandedIssue === issue?.id;

          return (
            <div 
              key={issue?.id}
              className="border border-border rounded-lg overflow-hidden transition-smooth hover:border-primary/30"
            >
              <button
                onClick={() => setExpandedIssue(isExpanded ? null : issue?.id)}
                className="w-full p-3 md:p-4 flex items-start gap-3 text-left bg-card hover:bg-muted/30 transition-smooth"
              >
                <div className={`p-2 rounded-lg ${config?.bgColor} flex-shrink-0`}>
                  <Icon name={issue?.icon} size={18} color={`var(--color-${issue?.severity === 'high' ? 'error' : issue?.severity === 'medium' ? 'warning' : 'primary'})`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm md:text-base font-medium text-foreground">
                      {issue?.title}
                    </h4>
                    <Icon 
                      name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                      size={18} 
                      color="var(--color-muted-foreground)"
                      className="flex-shrink-0"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {issue?.description}
                  </p>
                </div>
              </button>
              {isExpanded && (
                <div className="p-3 md:p-4 bg-muted/20 border-t border-border">
                  <h5 className="text-xs md:text-sm font-medium text-foreground mb-2 md:mb-3">
                    Recommended Solutions:
                  </h5>
                  <ol className="space-y-2">
                    {issue?.solutions?.map((solution, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                      >
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1">{solution}</span>
                      </li>
                    ))}
                  </ol>

                  {issue?.id === 'connection-lost' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Zap"
                        iconPosition="left"
                        onClick={onReconnect}
                        className="w-full sm:w-auto"
                      >
                        Attempt Reconnection
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <div className="flex items-start gap-2 mb-2">
          <Icon name="Lightbulb" size={18} color="var(--color-primary)" />
          <h4 className="text-sm md:text-base font-medium text-foreground">
            Need More Help?
          </h4>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mb-3">
          If issues persist after trying these solutions, check the documentation or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            className="flex-1"
          >
            View Documentation
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingPanel;