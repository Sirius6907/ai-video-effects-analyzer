import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionsMenu = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getContextualActions = () => {
    const currentPath = location?.pathname;

    const commonActions = [
      {
        id: 'upload-new',
        label: 'Upload New Video',
        icon: 'Upload',
        description: 'Start new analysis',
        action: () => navigate('/video-upload'),
        shortcut: 'Ctrl+U'
      },
      {
        id: 'view-library',
        label: 'Effect Library',
        icon: 'Library',
        description: 'Browse effects',
        action: () => navigate('/effect-library'),
        shortcut: 'Ctrl+L'
      }
    ];

    if (currentPath === '/analysis-results') {
      return [
        {
          id: 're-analyze',
          label: 'Re-analyze Video',
          icon: 'RefreshCw',
          description: 'Run analysis again',
          action: () => console.log('Re-analyzing...'),
          variant: 'secondary'
        },
        {
          id: 'export-results',
          label: 'Export Results',
          icon: 'Download',
          description: 'Download analysis data',
          action: () => console.log('Exporting...'),
          variant: 'outline'
        },
        {
          id: 'generate-tutorial',
          label: 'Generate Tutorial',
          icon: 'BookOpen',
          description: 'Create learning content',
          action: () => navigate('/tutorial-generation'),
          variant: 'default'
        },
        ...commonActions
      ];
    }

    if (currentPath === '/after-effects-control') {
      return [
        {
          id: 'export-script',
          label: 'Export Script',
          icon: 'FileCode',
          description: 'Download automation script',
          action: () => console.log('Exporting script...'),
          variant: 'secondary'
        },
        {
          id: 'test-connection',
          label: 'Test Connection',
          icon: 'Zap',
          description: 'Verify AE connection',
          action: () => console.log('Testing connection...'),
          variant: 'outline'
        },
        ...commonActions
      ];
    }

    if (currentPath === '/tutorial-generation') {
      return [
        {
          id: 'export-tutorial',
          label: 'Export Tutorial',
          icon: 'Download',
          description: 'Save tutorial content',
          action: () => console.log('Exporting tutorial...'),
          variant: 'secondary'
        },
        {
          id: 'share-tutorial',
          label: 'Share Tutorial',
          icon: 'Share2',
          description: 'Share with others',
          action: () => console.log('Sharing...'),
          variant: 'outline'
        },
        ...commonActions
      ];
    }

    return commonActions;
  };

  const actions = getContextualActions();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleActionClick = (action) => {
    action?.action();
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Quick actions"
        >
          <Icon name="Zap" size={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-glow-lg z-100 overflow-hidden">
            <div className="p-2 space-y-1">
              {actions?.map((action) => (
                <button
                  key={action?.id}
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-popover-foreground hover:bg-muted/50 transition-smooth"
                >
                  <Icon name={action?.icon} size={18} color="currentColor" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{action?.label}</div>
                    {action?.description && (
                      <div className="text-xs text-muted-foreground truncate">{action?.description}</div>
                    )}
                  </div>
                  {action?.shortcut && (
                    <span className="text-xs text-muted-foreground font-mono">{action?.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        size="default"
        iconName="Zap"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
      >
        Quick Actions
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-glow-lg z-100 overflow-hidden">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
            <p className="text-xs text-muted-foreground mt-1">Context-aware shortcuts</p>
          </div>

          <div className="p-2 space-y-1 max-h-96 overflow-y-auto scrollbar-custom">
            {actions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleActionClick(action)}
                className="w-full flex items-start gap-3 px-3 py-3 rounded-md text-left text-popover-foreground hover:bg-muted/50 transition-smooth group"
              >
                <div className={`
                  p-2 rounded-lg transition-smooth
                  ${action?.variant === 'secondary' ? 'bg-secondary/20 text-secondary' : ''}
                  ${action?.variant === 'outline' ? 'bg-muted/30 text-foreground' : ''}
                  ${!action?.variant || action?.variant === 'default' ? 'bg-primary/20 text-primary' : ''}
                  group-hover:scale-110
                `}>
                  <Icon name={action?.icon} size={18} color="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{action?.label}</div>
                  {action?.description && (
                    <div className="text-xs text-muted-foreground mt-0.5">{action?.description}</div>
                  )}
                  {action?.shortcut && (
                    <div className="text-xs text-muted-foreground font-mono mt-1 opacity-70">
                      {action?.shortcut}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionsMenu;