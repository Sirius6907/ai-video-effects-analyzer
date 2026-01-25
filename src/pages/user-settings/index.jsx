import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import SettingsSection from './components/SettingsSection';
import SettingItem from './components/SettingItem';
import AIApiConfiguration from './components/AIApiConfiguration';
import DataManagement from './components/DataManagement';
import ThemePreview from './components/ThemePreview';
import NotificationPreferences from './components/NotificationPreferences';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('ai-api');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    cpu: true,
    analysis: true,
    formats: true,
    cache: true
  });



  const [processingSettings, setProcessingSettings] = useState({
    cpuThreads: 4,
    maxCpuUsage: 75,
    analysisDepth: 'balanced',
    enableGpuAcceleration: true,
    autoOptimize: true,
    priorityMode: 'quality',
    frameSkipping: false,
    motionSensitivity: 70,
    effectConfidenceThreshold: 65
  });

  const [afterEffectsSettings, setAfterEffectsSettings] = useState({
    connectionPort: 8080,
    autoConnect: true,
    defaultCompDuration: 10,
    defaultFrameRate: 30,
    scriptFormat: 'jsx',
    includeComments: true,
    autoSaveScripts: true,
    compositionPreset: 'hd1080'
  });

  const [uiSettings, setUiSettings] = useState({
    theme: 'dark',
    compactMode: false,
    tutorialComplexity: 'intermediate',
    showTooltips: true,
    animationsEnabled: true,
    autoPlayPreviews: false
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    analysis_complete: true,
    automation_done: true,
    processing_error: true,
    ae_connection: true,
    updates: true,
    performance: false,
    new_effects: true,
    tutorial_ready: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: 90,
    autoDeleteAnalysis: false,
    shareAnonymousData: false,
    allowTutorialSharing: true
  });

  const tabs = [
    { id: 'ai-api', label: 'AI API', icon: 'Brain' },
    { id: 'processing', label: 'Processing', icon: 'Cpu' },
    { id: 'after-effects', label: 'After Effects', icon: 'Zap' },
    { id: 'interface', label: 'Interface', icon: 'Layout' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'data', label: 'Data', icon: 'Database' }
  ];

  const themes = [
    { id: 'dark', name: 'Dark', description: 'Default dark theme' },
    { id: 'light', name: 'Light', description: 'Light mode' },
    { id: 'midnight', name: 'Midnight', description: 'Extra dark theme' }
  ];

  const analysisDepthOptions = [
    { value: 'quick', label: 'Quick Analysis', description: 'Faster processing, basic detection' },
    { value: 'balanced', label: 'Balanced', description: 'Recommended for most videos' },
    { value: 'deep', label: 'Deep Analysis', description: 'Thorough detection, slower processing' }
  ];

  const priorityModeOptions = [
    { value: 'speed', label: 'Speed Priority' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'quality', label: 'Quality Priority' }
  ];

  const compositionPresetOptions = [
    { value: 'hd720', label: 'HD 720p (1280x720)' },
    { value: 'hd1080', label: 'HD 1080p (1920x1080)' },
    { value: 'uhd4k', label: '4K UHD (3840x2160)' },
    { value: 'custom', label: 'Custom Settings' }
  ];

  const scriptFormatOptions = [
    { value: 'jsx', label: 'JSX Script' },
    { value: 'jsxbin', label: 'JSXBin (Binary)' }
  ];

  const tutorialComplexityOptions = [
    { value: 'beginner', label: 'Beginner Friendly' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleProcessingChange = (key, value) => {
    setProcessingSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleAfterEffectsChange = (key, value) => {
    setAfterEffectsSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleUiChange = (key, value) => {
    setUiSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationToggle = (key, value) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    setHasUnsavedChanges(false);
  };

  const handleResetSettings = () => {
    console.log('Resetting to defaults...');
    setHasUnsavedChanges(false);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
  };

  const handleClearCache = () => {
    console.log('Clearing cache...');
  };

  const renderProcessingTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <SettingsSection
        title="CPU Optimization"
        description="Configure processor usage and performance settings"
        icon="Cpu"
        isExpanded={expandedSections?.cpu}
        onToggle={() => toggleSection('cpu')}
      >
        <SettingItem
          type="range"
          label="CPU Threads"
          description="Number of processor threads to use for analysis"
          value={processingSettings?.cpuThreads}
          onChange={(val) => handleProcessingChange('cpuThreads', val)}
          min={1}
          max={8}
        />

        <SettingItem
          type="range"
          label="Maximum CPU Usage"
          description="Limit CPU usage to prevent system slowdown"
          value={processingSettings?.maxCpuUsage}
          onChange={(val) => handleProcessingChange('maxCpuUsage', val)}
          min={25}
          max={100}
          unit="%"
        />

        <SettingItem
          type="checkbox"
          label="Enable GPU Acceleration"
          description="Use graphics card for faster processing when available"
          value={processingSettings?.enableGpuAcceleration}
          onChange={(val) => handleProcessingChange('enableGpuAcceleration', val)}
        />

        <SettingItem
          type="checkbox"
          label="Auto-Optimize Performance"
          description="Automatically adjust settings based on system load"
          value={processingSettings?.autoOptimize}
          onChange={(val) => handleProcessingChange('autoOptimize', val)}
        />
      </SettingsSection>

      <SettingsSection
        title="Analysis Settings"
        description="Configure video analysis depth and accuracy"
        icon="BarChart3"
        isExpanded={expandedSections?.analysis}
        onToggle={() => toggleSection('analysis')}
      >
        <SettingItem
          type="select"
          label="Analysis Depth"
          description="Choose between speed and detection accuracy"
          value={processingSettings?.analysisDepth}
          onChange={(val) => handleProcessingChange('analysisDepth', val)}
          options={analysisDepthOptions}
        />

        <SettingItem
          type="select"
          label="Priority Mode"
          description="Optimize for speed or quality"
          value={processingSettings?.priorityMode}
          onChange={(val) => handleProcessingChange('priorityMode', val)}
          options={priorityModeOptions}
        />

        <SettingItem
          type="range"
          label="Motion Sensitivity"
          description="Adjust sensitivity for motion detection"
          value={processingSettings?.motionSensitivity}
          onChange={(val) => handleProcessingChange('motionSensitivity', val)}
          min={0}
          max={100}
          unit="%"
        />

        <SettingItem
          type="range"
          label="Effect Confidence Threshold"
          description="Minimum confidence score to report detected effects"
          value={processingSettings?.effectConfidenceThreshold}
          onChange={(val) => handleProcessingChange('effectConfidenceThreshold', val)}
          min={0}
          max={100}
          unit="%"
        />

        <SettingItem
          type="checkbox"
          label="Enable Frame Skipping"
          description="Skip frames for faster processing (may reduce accuracy)"
          value={processingSettings?.frameSkipping}
          onChange={(val) => handleProcessingChange('frameSkipping', val)}
        />
      </SettingsSection>

      <SettingsSection
        title="Cache Management"
        description="Control local data storage and caching"
        icon="HardDrive"
        isExpanded={expandedSections?.cache}
        onToggle={() => toggleSection('cache')}
      >
        <div className="bg-muted/30 rounded-lg p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm md:text-base font-medium text-foreground">Cache Size</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-0.5">Current storage usage</div>
            </div>
            <div className="text-xl md:text-2xl font-bold text-foreground font-mono">2.4 GB</div>
          </div>

          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '48%' }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleClearCache}
              className="flex-1"
            >
              Clear Cache
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              className="flex-1"
            >
              Optimize Storage
            </Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );

  const renderAfterEffectsTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 md:p-5 lg:p-6 border border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 md:gap-4 flex-1">
            <div className="p-2 md:p-3 bg-primary/20 rounded-lg flex-shrink-0">
              <Icon name="Zap" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">After Effects Connection</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Configure connection settings and automation preferences
              </p>
            </div>
          </div>
          <ConnectivityStatus
            isConnected={true}
            connectionType="after-effects"
            variant="default"
            onRetry={() => console.log('Retry connection')}
          />
        </div>
      </div>

      <SettingsSection
        title="Connection Settings"
        description="Configure After Effects connection parameters"
        icon="Link"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="number"
          label="Connection Port"
          description="Port number for After Effects communication"
          value={afterEffectsSettings?.connectionPort}
          onChange={(val) => handleAfterEffectsChange('connectionPort', val)}
          min={1024}
          max={65535}
        />

        <SettingItem
          type="checkbox"
          label="Auto-Connect on Startup"
          description="Automatically connect to After Effects when app launches"
          value={afterEffectsSettings?.autoConnect}
          onChange={(val) => handleAfterEffectsChange('autoConnect', val)}
        />
      </SettingsSection>

      <SettingsSection
        title="Composition Defaults"
        description="Default settings for new compositions"
        icon="Film"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="select"
          label="Composition Preset"
          description="Default resolution and aspect ratio"
          value={afterEffectsSettings?.compositionPreset}
          onChange={(val) => handleAfterEffectsChange('compositionPreset', val)}
          options={compositionPresetOptions}
        />

        <SettingItem
          type="number"
          label="Default Duration"
          description="Composition length in seconds"
          value={afterEffectsSettings?.defaultCompDuration}
          onChange={(val) => handleAfterEffectsChange('defaultCompDuration', val)}
          min={1}
          max={3600}
          unit="sec"
        />

        <SettingItem
          type="number"
          label="Frame Rate"
          description="Frames per second"
          value={afterEffectsSettings?.defaultFrameRate}
          onChange={(val) => handleAfterEffectsChange('defaultFrameRate', val)}
          min={23.976}
          max={120}
          unit="fps"
        />
      </SettingsSection>

      <SettingsSection
        title="Script Generation"
        description="Configure automation script preferences"
        icon="FileCode"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="select"
          label="Script Format"
          description="Output format for generated scripts"
          value={afterEffectsSettings?.scriptFormat}
          onChange={(val) => handleAfterEffectsChange('scriptFormat', val)}
          options={scriptFormatOptions}
        />

        <SettingItem
          type="checkbox"
          label="Include Comments"
          description="Add explanatory comments to generated scripts"
          value={afterEffectsSettings?.includeComments}
          onChange={(val) => handleAfterEffectsChange('includeComments', val)}
        />

        <SettingItem
          type="checkbox"
          label="Auto-Save Scripts"
          description="Automatically save generated scripts to disk"
          value={afterEffectsSettings?.autoSaveScripts}
          onChange={(val) => handleAfterEffectsChange('autoSaveScripts', val)}
        />
      </SettingsSection>
    </div>
  );

  const renderInterfaceTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <SettingsSection
        title="Theme Selection"
        description="Choose your preferred color scheme"
        icon="Palette"
        isExpanded={true}
        onToggle={() => {}}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {themes?.map((theme) => (
            <ThemePreview
              key={theme?.id}
              theme={theme}
              isSelected={uiSettings?.theme === theme?.id}
              onSelect={() => handleUiChange('theme', theme?.id)}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Display Preferences"
        description="Customize interface appearance and behavior"
        icon="Monitor"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="checkbox"
          label="Compact Mode"
          description="Reduce spacing and padding for more content"
          value={uiSettings?.compactMode}
          onChange={(val) => handleUiChange('compactMode', val)}
        />

        <SettingItem
          type="checkbox"
          label="Show Tooltips"
          description="Display helpful hints when hovering over elements"
          value={uiSettings?.showTooltips}
          onChange={(val) => handleUiChange('showTooltips', val)}
        />

        <SettingItem
          type="checkbox"
          label="Enable Animations"
          description="Use smooth transitions and animations"
          value={uiSettings?.animationsEnabled}
          onChange={(val) => handleUiChange('animationsEnabled', val)}
        />

        <SettingItem
          type="checkbox"
          label="Auto-Play Video Previews"
          description="Automatically play effect preview videos"
          value={uiSettings?.autoPlayPreviews}
          onChange={(val) => handleUiChange('autoPlayPreviews', val)}
        />
      </SettingsSection>

      <SettingsSection
        title="Tutorial Settings"
        description="Configure learning content preferences"
        icon="BookOpen"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="select"
          label="Tutorial Complexity"
          description="Default detail level for generated tutorials"
          value={uiSettings?.tutorialComplexity}
          onChange={(val) => handleUiChange('tutorialComplexity', val)}
          options={tutorialComplexityOptions}
        />
      </SettingsSection>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <div className="bg-gradient-to-br from-accent/10 to-warning/10 rounded-lg p-4 md:p-5 lg:p-6 border border-border">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="p-2 md:p-3 bg-accent/20 rounded-lg flex-shrink-0">
            <Icon name="Bell" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Notification Preferences</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Choose which events trigger notifications to stay informed without interruption
            </p>
          </div>
        </div>
      </div>

      <NotificationPreferences
        preferences={notificationPreferences}
        onToggle={handleNotificationToggle}
      />
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <SettingsSection
        title="Data Retention"
        description="Control how long analysis data is stored"
        icon="Clock"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="number"
          label="Retention Period"
          description="Days to keep analysis results before auto-deletion"
          value={privacySettings?.dataRetention}
          onChange={(val) => handlePrivacyChange('dataRetention', val)}
          min={7}
          max={365}
          unit="days"
        />

        <SettingItem
          type="checkbox"
          label="Auto-Delete Old Analysis"
          description="Automatically remove analysis data after retention period"
          value={privacySettings?.autoDeleteAnalysis}
          onChange={(val) => handlePrivacyChange('autoDeleteAnalysis', val)}
        />
      </SettingsSection>

      <SettingsSection
        title="Privacy Controls"
        description="Manage data sharing and privacy settings"
        icon="Shield"
        isExpanded={true}
        onToggle={() => {}}
      >
        <SettingItem
          type="checkbox"
          label="Share Anonymous Usage Data"
          description="Help improve the app by sharing anonymous usage statistics"
          value={privacySettings?.shareAnonymousData}
          onChange={(val) => handlePrivacyChange('shareAnonymousData', val)}
        />

        <SettingItem
          type="checkbox"
          label="Allow Tutorial Sharing"
          description="Enable sharing generated tutorials with other users"
          value={privacySettings?.allowTutorialSharing}
          onChange={(val) => handlePrivacyChange('allowTutorialSharing', val)}
        />
      </SettingsSection>

      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 md:p-5 lg:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Local Processing</h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              All video analysis and processing happens locally on your device. No video data is ever uploaded to external servers, ensuring complete privacy and security of your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <DataManagement
          title="Analysis History"
          description="Manage your video analysis records"
          icon="History"
          stats={[
            { label: 'Total Analyses', value: '127' },
            { label: 'Storage Used', value: '1.8 GB' }
          ]}
          actions={[
            { label: 'Export History', icon: 'Download', variant: 'outline', onClick: handleExportData },
            { label: 'Clear History', icon: 'Trash2', variant: 'destructive', onClick: () => console.log('Clear history') }
          ]}
        />

        <DataManagement
          title="Generated Scripts"
          description="After Effects automation scripts"
          icon="FileCode"
          stats={[
            { label: 'Total Scripts', value: '89' },
            { label: 'Storage Used', value: '45 MB' }
          ]}
          actions={[
            { label: 'Export Scripts', icon: 'Download', variant: 'outline', onClick: () => console.log('Export scripts') },
            { label: 'Manage Scripts', icon: 'FolderOpen', variant: 'outline', onClick: () => console.log('Manage scripts') }
          ]}
        />

        <DataManagement
          title="Tutorial Library"
          description="Your generated learning content"
          icon="BookOpen"
          stats={[
            { label: 'Tutorials', value: '34' },
            { label: 'Storage Used', value: '156 MB' }
          ]}
          actions={[
            { label: 'Export Tutorials', icon: 'Download', variant: 'outline', onClick: () => console.log('Export tutorials') },
            { label: 'Browse Library', icon: 'Library', variant: 'outline', onClick: () => console.log('Browse library') }
          ]}
        />

        <DataManagement
          title="User Preferences"
          description="Backup and restore your settings"
          icon="Settings"
          stats={[
            { label: 'Last Backup', value: 'Jan 15' },
            { label: 'Settings Size', value: '2.4 KB' }
          ]}
          actions={[
            { label: 'Backup Settings', icon: 'Save', variant: 'outline', onClick: () => console.log('Backup settings') },
            { label: 'Restore Settings', icon: 'Upload', variant: 'outline', onClick: () => console.log('Restore settings') }
          ]}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
          <div className="p-2 md:p-3 bg-error/20 rounded-lg flex-shrink-0">
            <Icon name="AlertCircle" size={24} color="var(--color-error)" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-foreground">Danger Zone</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Irreversible actions that permanently delete your data
            </p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex-1">
              <div className="text-sm md:text-base font-medium text-foreground">Delete All Analysis Data</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-0.5">
                Permanently remove all video analysis results and cached data
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Delete Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 md:p-4 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex-1">
              <div className="text-sm md:text-base font-medium text-foreground">Reset All Settings</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-0.5">
                Restore all preferences to factory defaults
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleResetSettings}
              className="w-full sm:w-auto"
            >
              Reset Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>User Settings - AI Video Effects Analyzer</title>
        <meta name="description" content="Configure processing preferences, After Effects integration, and application behavior for AI Video Effects Analyzer" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[60px]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Settings
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Customize your experience and configure application preferences
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
                <QuickActionsMenu variant="compact" />
                {hasUnsavedChanges && (
                  <Button
                    variant="default"
                    size="default"
                    iconName="Save"
                    iconPosition="left"
                    onClick={handleSaveSettings}
                    className="flex-1 lg:flex-none"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </div>



            <div className="mt-6 md:mt-8 lg:mt-10">
              <div className="border-b border-border mb-6 md:mb-8 overflow-x-auto scrollbar-custom">
                <nav className="flex gap-1 md:gap-2 min-w-max">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        flex items-center gap-2 px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4 text-sm md:text-base font-medium transition-smooth whitespace-nowrap flex-shrink-0
                        ${activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                        }
                      `}
                    >
                      <Icon name={tab?.icon} size={18} className="md:w-5 md:h-5" />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="animate-fadeIn">
                {activeTab === 'ai-api' && <AIApiConfiguration />}
                {activeTab === 'processing' && renderProcessingTab()}
                {activeTab === 'after-effects' && renderAfterEffectsTab()}
                {activeTab === 'interface' && renderInterfaceTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
                {activeTab === 'privacy' && renderPrivacyTab()}
                {activeTab === 'data' && renderDataTab()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserSettings;