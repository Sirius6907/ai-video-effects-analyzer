import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import afterEffectsTemplateService from '../../services/afterEffectsTemplateService';
import Header from '../../components/ui/Header';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import VideoPlayer from './components/VideoPlayer';
import EffectCard from './components/EffectCard';
import EffectsTable from './components/EffectsTable';
import AutomationPanel from './components/AutomationPanel';
import FilterPanel from './components/FilterPanel';
import StatsOverview from './components/StatsOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalysisResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [queuedEffects, setQueuedEffects] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    complexity: 'all',
    sortBy: 'timestamp',
    minConfidence: 0,
    searchQuery: ''
  });
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [effects, setEffects] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const analysisData = location.state?.analysisResult;
    const videoFile = location.state?.videoFile;

    if (analysisData) {
      setEffects(analysisData.effects || []);
      setStats(analysisData.stats || {});
      
      if (videoFile) {
        const videoUrl = URL.createObjectURL(videoFile);
        setVideoData({
          url: videoUrl,
          alt: `Analysis of ${location.state?.fileName || 'video'}`
        });
      }
      
      setLoading(false);
    } else {
      setTimeout(() => {
        setEffects([]);
        setStats({ totalEffects: 0, avgConfidence: 0, videoDuration: 0, processingTime: 0 });
        setLoading(false);
      }, 1000);
    }

    return () => {
      if (videoData?.url) {
        URL.revokeObjectURL(videoData.url);
      }
    };
  }, [location.state]);

  const filteredEffects = effects?.filter(effect => {
    if (filters?.type !== 'all' && effect?.type?.toLowerCase() !== filters?.type) return false;
    if (filters?.complexity !== 'all' && effect?.complexity?.toLowerCase() !== filters?.complexity) return false;
    if (effect?.confidence < filters?.minConfidence) return false;
    if (filters?.searchQuery && !effect?.name?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) && 
        !effect?.description?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase())) return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        type: 'all',
        complexity: 'all',
        sortBy: 'timestamp',
        minConfidence: 0,
        searchQuery: ''
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleAddToQueue = (effect) => {
    if (!queuedEffects?.find(e => e?.id === effect?.id)) {
      setQueuedEffects(prev => [...prev, effect]);
    }
  };

  const handleBatchAction = (action, effectIds) => {
    if (action === 'queue') {
      const effectsToAdd = effects?.filter(e => effectIds?.includes(e?.id));
      setQueuedEffects(prev => {
        const newEffects = effectsToAdd?.filter(e => !prev?.find(p => p?.id === e?.id));
        return [...prev, ...newEffects];
      });
    } else if (action === 'tutorial') {
      navigate('/tutorial-generation', { state: { effects: effectIds } });
    }
  };

  const handleClearQueue = () => {
    setQueuedEffects([]);
  };

  const handleExecuteQueue = () => {
    navigate('/after-effects-control', { state: { effects: queuedEffects } });
  };

  const handleEffectClick = (effect) => {
    console.log('Effect clicked:', effect);
  };

  const handleGenerateTutorial = (effect) => {
    navigate('/tutorial-generation', { state: { effect } });
  };

  const handleDownloadTemplate = () => {
    if (effects.length === 0) {
      alert('No effects to generate template');
      return;
    }

    const videoMetadata = {
      width: 1920,
      height: 1080,
      frameRate: 30,
      duration: stats?.videoDuration || 30
    };

    const template = afterEffectsTemplateService.generateTemplate(effects, videoMetadata);
    afterEffectsTemplateService.downloadTemplate(template, `video_effects_${Date.now()}`);
    
    alert('After Effects template downloaded! Import the .jsx file in After Effects: File > Scripts > Run Script File');
  };

  return (
    <>
      <Helmet>
        <title>Analysis Results - AI Video Effects Analyzer</title>
        <meta name="description" content="View comprehensive AI-detected video effects analysis with automation controls for After Effects integration" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[60px]">
          <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Analysis Results
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  AI-detected effects and automation controls for After Effects integration
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <QuickActionsMenu variant="default" />
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleDownloadTemplate}
                  disabled={effects.length === 0}
                >
                  Download AE Template
                </Button>
                <Button
                  variant="outline"
                  iconName="FileJson"
                  iconPosition="left"
                >
                  Export JSON
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <Icon name="Loader" className="animate-spin text-primary h-12 w-12 mx-auto" />
                <p className="mt-4 text-muted-foreground">Analyzing video and detecting effects...</p>
              </div>
            ) : (
              <>
                <StatsOverview stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 md:mt-8">
                  <div className="lg:col-span-2 space-y-6">
                    <VideoPlayer
                      videoUrl={videoData?.url}
                      videoAlt={videoData?.alt}
                      effects={effects}
                      onEffectClick={handleEffectClick}
                    />

                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-foreground">
                          Detected Effects ({filteredEffects?.length})
                        </h2>
                        <div className="flex gap-2">
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="icon"
                            iconName="Grid3x3"
                            onClick={() => setViewMode('grid')}
                          />
                          <Button
                            variant={viewMode === 'table' ? 'default' : 'ghost'}
                            size="icon"
                            iconName="List"
                            onClick={() => setViewMode('table')}
                          />
                        </div>
                      </div>

                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredEffects?.map(effect => (
                            <EffectCard
                              key={effect?.id}
                              effect={effect}
                              onPreview={handleEffectClick}
                              onGenerateTutorial={handleGenerateTutorial}
                              onAddToQueue={handleAddToQueue}
                            />
                          ))}
                        </div>
                      ) : (
                        <EffectsTable
                          effects={filteredEffects}
                          onEffectClick={handleEffectClick}
                          onBatchAction={handleBatchAction}
                        />
                      )}

                      {filteredEffects?.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-muted/30 rounded-full flex items-center justify-center">
                            <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                          </div>
                          <p className="text-muted-foreground">
                            No effects match your current filters
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <FilterPanel
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />

                    <AutomationPanel
                      queuedEffects={queuedEffects}
                      onExecute={handleExecuteQueue}
                      onClearQueue={handleClearQueue}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalysisResults;