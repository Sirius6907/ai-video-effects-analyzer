import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NotificationPreferences = ({ preferences, onToggle }) => {
  const categories = [
    {
      id: 'processing',
      title: 'Processing Notifications',
      icon: 'Cpu',
      items: [
        { id: 'analysis_complete', label: 'Analysis Complete', description: 'When video analysis finishes' },
        { id: 'automation_done', label: 'Automation Complete', description: 'When After Effects automation completes' },
        { id: 'processing_error', label: 'Processing Errors', description: 'When errors occur during processing' }
      ]
    },
    {
      id: 'system',
      title: 'System Notifications',
      icon: 'Bell',
      items: [
        { id: 'ae_connection', label: 'After Effects Connection', description: 'Connection status changes' },
        { id: 'updates', label: 'Software Updates', description: 'When new updates are available' },
        { id: 'performance', label: 'Performance Warnings', description: 'High CPU/memory usage alerts' }
      ]
    },
    {
      id: 'content',
      title: 'Content Notifications',
      icon: 'BookOpen',
      items: [
        { id: 'new_effects', label: 'New Effects', description: 'When new effects are added to library' },
        { id: 'tutorial_ready', label: 'Tutorial Generated', description: 'When tutorial generation completes' }
      ]
    }
  ];

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      {categories?.map((category) => (
        <div key={category?.id} className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon name={category?.icon} size={18} color="var(--color-primary)" className="md:w-5 md:h-5" />
            <h4 className="text-sm md:text-base lg:text-lg font-semibold text-foreground">
              {category?.title}
            </h4>
          </div>

          <div className="space-y-2 md:space-y-3 pl-0 md:pl-7">
            {category?.items?.map((item) => (
              <div
                key={item?.id}
                className="flex items-start gap-3 p-3 md:p-4 rounded-lg hover:bg-muted/30 transition-smooth"
              >
                <Checkbox
                  checked={preferences?.[item?.id] || false}
                  onChange={(e) => onToggle(item?.id, e?.target?.checked)}
                />
                <div className="flex-1 min-w-0">
                  <label className="text-sm md:text-base font-medium text-foreground cursor-pointer block">
                    {item?.label}
                  </label>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPreferences;