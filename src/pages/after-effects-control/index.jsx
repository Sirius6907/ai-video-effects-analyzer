import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import storage from '../../utils/storage';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import QueueItem from './components/QueueItem';
import ExecutionMonitoring from './components/ExecutionMonitoring';
import BatchControls from './components/BatchControls';
import ExecutionHistory from './components/ExecutionHistory';
import SystemMetrics from './components/SystemMetrics';
import Troubleshooting from './components/Troubleshooting';

const AfterEffectsControl = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');

  const [queueItems, setQueueItems] = useState([]);

  useEffect(() => {
    const savedQueue = storage.get(storage.keys.AE_QUEUE, []);
    setQueueItems(savedQueue);
  }, []);

  const [currentExecution, setCurrentExecution] = useState(null);

  useEffect(() => {
    let progressInterval;
    let stepInterval;

    if (isProcessing) {
      setCurrentExecution({
        effectName: 'Zoom In Effect',
        currentStep: 'Applying scale keyframes to layer',
        progress: 0,
        stepNumber: 1,
        totalSteps: 5,
        elapsedTime: '0s',
        remainingTime: 'N/A',
        steps: [
          { name: 'Initialize composition', description: 'Loading target composition', duration: '12s' },
          { name: 'Locate target layer', description: 'Finding Video Layer 1', duration: '8s' },
          { name: 'Apply scale keyframes', description: 'Setting animation properties' },
          { name: 'Configure easing', description: 'Applying ease in/out curves' },
          { name: 'Finalize and save', description: 'Saving composition changes' }
        ]
      });

      let progress = 0;
      let step = 1;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        progress += 1;
        elapsed += 1;
        setCurrentExecution(prev => ({
          ...prev,
          progress: progress > 100 ? 100 : progress,
          elapsedTime: `${elapsed}s`
        }));
        if (progress >= 100) {
          setIsProcessing(false);
        }
      }, 1000);

      stepInterval = setInterval(() => {
        step += 1;
        setCurrentExecution(prev => ({
          ...prev,
          stepNumber: step > 5 ? 5 : step,
          currentStep: prev.steps[step - 1]?.name || 'Finalizing...'
        }));
        if (step >= 5) {
          clearInterval(stepInterval);
        }
      }, 5000);

    } else {
      setCurrentExecution(null);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isProcessing]);

  const [batchSettings, setBatchSettings] = useState({
    executionMode: 'sequential',
    defaultPriority: 'normal',
    autoRetry: true,
    pauseOnError: false
  });

  const [executionHistory, setExecutionHistory] = useState([]);

  useEffect(() => {
    const savedHistory = storage.get(storage.keys.AE_HISTORY, []);
    setExecutionHistory(savedHistory.slice(0, 20));
  }, []);

  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    aeResponseTime: 0,
    queueSize: 0,
    efficiency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        aeResponseTime: Math.floor(Math.random() * 1000),
        queueSize: queueItems.length,
        efficiency: Math.floor(Math.random() * 100)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [queueItems.length]);

  const handleEditQueue = (id) => {
    console.log('Edit queue item:', id);
  };

  const handleRemoveQueue = (id) => {
    const updatedQueue = queueItems.filter(item => item.id !== id);
    setQueueItems(updatedQueue);
    storage.set(storage.keys.AE_QUEUE, updatedQueue);
  };

  const handleMoveUp = (id) => {
    const index = queueItems?.findIndex(item => item?.id === id);
    if (index > 0) {
      const newQueue = [...queueItems];
      [newQueue[index - 1], newQueue[index]] = [newQueue?.[index], newQueue?.[index - 1]];
      newQueue?.forEach((item, idx) => {
        item.queuePosition = idx + 1;
      });
      setQueueItems(newQueue);
    }
  };

  const handleMoveDown = (id) => {
    const index = queueItems?.findIndex(item => item?.id === id);
    if (index < queueItems?.length - 1) {
      const newQueue = [...queueItems];
      [newQueue[index], newQueue[index + 1]] = [newQueue?.[index + 1], newQueue?.[index]];
      newQueue?.forEach((item, idx) => {
        item.queuePosition = idx + 1;
      });
      setQueueItems(newQueue);
    }
  };

  const handleStartBatch = () => {
    setIsProcessing(true);
    console.log('Starting batch processing with settings:', batchSettings);
  };

  const handlePauseBatch = () => {
    setIsProcessing(false);
    console.log('Pausing batch processing');
  };

  const handleCancelBatch = () => {
    setIsProcessing(false);
    console.log('Cancelling batch processing');
  };

  const handleRunDiagnostics = () => {
    console.log('Running system diagnostics...');
  };

  const handleReconnect = () => {
    console.log('Attempting to reconnect to After Effects...');
    setIsConnected(false);
    setTimeout(() => setIsConnected(true), 2000);
  };

  const tabs = [
    { id: 'queue', label: 'Queue', icon: 'List', count: queueItems?.length },
    { id: 'monitor', label: 'Monitor', icon: 'Activity' },
    { id: 'history', label: 'History', icon: 'History', count: executionHistory?.length },
    { id: 'metrics', label: 'Metrics', icon: 'BarChart3' },
    { id: 'troubleshoot', label: 'Troubleshoot', icon: 'Wrench' }
  ];

  return (
    <>
      <Helmet>
        <title>After Effects Control - AI Video Effects Analyzer</title>
        <meta name="description" content="Manage automated script execution and real-time communication with After Effects application" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[60px]">
          <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-foreground mb-2">
                  After Effects Control
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Manage automation queue and monitor script execution
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <ConnectivityStatus
                  isConnected={isConnected}
                  connectionType="after-effects"
                  showLabel={true}
                  onRetry={handleReconnect}
                />
                <QuickActionsMenu variant="default" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <div className="bg-card border border-border rounded-lg shadow-glow overflow-hidden">
                  <div className="border-b border-border overflow-x-auto">
                    <div className="flex min-w-max">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`
                            flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium transition-smooth relative
                            ${activeTab === tab?.id
                              ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }
                          `}
                        >
                          <Icon 
                            name={tab?.icon} 
                            size={18} 
                            color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                          />
                          <span>{tab?.label}</span>
                          {tab?.count !== undefined && (
                            <span className={`
                              px-1.5 py-0.5 text-xs rounded-full
                              ${activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                            `}>
                              {tab?.count}
                            </span>
                          )}
                          {activeTab === tab?.id && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-h-[400px]">
                    {activeTab === 'queue' && (
                      <div className="p-4 md:p-5 lg:p-6">
                        {queueItems?.length === 0 ? (
                          <div className="py-12 md:py-16 text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                              <Icon name="List" size={32} color="var(--color-muted-foreground)" />
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                              Queue is Empty
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-6">
                              Add effects from analysis results to start automation
                            </p>
                            <Button
                              variant="default"
                              iconName="Plus"
                              iconPosition="left"
                              onClick={() => navigate('/analysis-results')}
                            >
                              Go to Analysis Results
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3 md:space-y-4">
                            {queueItems?.map((item, index) => (
                              <QueueItem
                                key={item?.id}
                                item={item}
                                onEdit={handleEditQueue}
                                onRemove={handleRemoveQueue}
                                onMoveUp={handleMoveUp}
                                onMoveDown={handleMoveDown}
                                isFirst={index === 0}
                                isLast={index === queueItems?.length - 1}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'monitor' && (
                      <ExecutionMonitoring currentExecution={isProcessing ? currentExecution : null} />
                    )}

                    {activeTab === 'history' && (
                      <ExecutionHistory history={executionHistory} />
                    )}

                    {activeTab === 'metrics' && (
                      <SystemMetrics metrics={systemMetrics} />
                    )}

                    {activeTab === 'troubleshoot' && (
                      <Troubleshooting
                        onRunDiagnostics={handleRunDiagnostics}
                        onReconnect={handleReconnect}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="bg-card border border-border rounded-lg shadow-glow overflow-hidden">
                  <BatchControls
                    batchSettings={batchSettings}
                    onSettingsChange={setBatchSettings}
                    onStartBatch={handleStartBatch}
                    onPauseBatch={handlePauseBatch}
                    onCancelBatch={handleCancelBatch}
                    isProcessing={isProcessing}
                    queueCount={queueItems?.filter(item => item?.status === 'pending')?.length}
                  />
                </div>

                <div className="bg-card border border-border rounded-lg shadow-glow p-4 md:p-5 lg:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
                    Quick Navigation
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="default"
                      iconName="BarChart3"
                      iconPosition="left"
                      onClick={() => navigate('/analysis-results')}
                      className="w-full justify-start"
                    >
                      View Analysis Results
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      iconName="BookOpen"
                      iconPosition="left"
                      onClick={() => navigate('/tutorial-generation')}
                      className="w-full justify-start"
                    >
                      Generate Tutorial
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      iconName="Library"
                      iconPosition="left"
                      onClick={() => navigate('/effect-library')}
                      className="w-full justify-start"
                    >
                      Browse Effect Library
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-4 md:p-5 lg:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                        Pro Tip
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Group similar effects together and process them in batches for optimal performance and faster completion times.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AfterEffectsControl;