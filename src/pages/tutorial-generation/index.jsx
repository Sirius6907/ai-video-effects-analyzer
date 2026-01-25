import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ConnectivityStatus from '../../components/ui/ConnectivityStatus';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import TutorialStepCard from './components/TutorialStepCard';
import VideoComparison from './components/VideoComparison';
import TutorialProgress from './components/TutorialProgress';
import RelatedTutorials from './components/RelatedTutorials';
import PrerequisiteSkills from './components/PrerequisiteSkills';
import TutorialExportOptions from './components/TutorialExportOptions';
import InteractivePractice from './components/InteractivePractice';

const TutorialGeneration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState([0]);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExportPanel, setShowExportPanel] = useState(false);

  const tutorialData = {
    id: "tut-001",
    title: "Cinematic Zoom Blur Effect",
    description: "Learn to create a professional zoom blur transition effect commonly used in action sequences and dramatic reveals. This tutorial covers keyframe animation, motion blur settings, and timing techniques.",
    difficulty: "intermediate",
    estimatedTime: 45,
    category: "Motion Graphics",
    effectType: "Zoom & Blur",
    beforeVideo: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
    afterVideo: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
    steps: [
      {
        stepNumber: 1,
        title: "Import and Prepare Footage",
        description: "Set up your composition and import the video footage that will receive the zoom blur effect.",
        duration: "5m",
        difficulty: "beginner",
        thumbnail: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg",
        thumbnailAlt: "Computer screen showing After Effects interface with video timeline and composition panel open",
        instructions: [
          "Create a new composition at 1920x1080, 30fps",
          "Import your video footage into the project panel",
          "Drag the footage onto the timeline",
          "Pre-compose the layer (Ctrl+Shift+C) and name it 'Source Footage'"
        ],
        parameters: [
          { name: "Composition Size", value: "1920x1080" },
          { name: "Frame Rate", value: "30 fps" },
          { name: "Duration", value: "10 seconds" }
        ],
        tips: [
          "Use high-quality footage for best results",
          "Ensure your footage has enough resolution for zooming",
          "Consider the focal point of your zoom effect"
        ],
        practiceTask: "Set up your composition and import footage before proceeding.",
        hints: [
          "Look for the Composition menu at the top of After Effects",
          "The composition settings dialog has all the parameters you need",
          "Pre-composing helps keep your project organized"
        ]
      },
      {
        stepNumber: 2,
        title: "Add Scale Keyframes",
        description: "Create the zoom animation by setting scale keyframes at the beginning and end of your desired effect duration.",
        duration: "8m",
        difficulty: "beginner",
        thumbnail: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
        thumbnailAlt: "Close-up of After Effects timeline showing keyframe markers and animation curves",
        instructions: [
          "Select your pre-composed layer in the timeline",
          "Press \'S\' to reveal the Scale property",
          "Click the stopwatch icon to enable keyframing",
          "Move to frame 0 and set Scale to 100%",
          "Move to frame 30 (1 second) and set Scale to 150%",
          "Select both keyframes and apply Easy Ease (F9)"
        ],
        parameters: [
          { name: "Start Scale", value: "100%" },
          { name: "End Scale", value: "150%" },
          { name: "Duration", value: "1 second" },
          { name: "Easing", value: "Easy Ease" }
        ],
        tips: [
          "Use the graph editor to fine-tune your animation curve",
          "Experiment with different scale values for varying intensity",
          "Easy Ease creates smooth, professional-looking motion"
        ],
        practiceTask: "Create smooth scale animation with proper easing.",
        hints: [
          "The \'S\' keyboard shortcut quickly reveals Scale properties",
          "Keyframes appear as small diamonds in the timeline",
          "Right-click keyframes to access easing options"
        ]
      },
      {
        stepNumber: 3,
        title: "Apply Directional Blur",
        description: "Add motion blur effect to enhance the zoom animation and create the characteristic blur streaks.",
        duration: "10m",
        difficulty: "intermediate",
        thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        thumbnailAlt: "After Effects effects panel showing blur and distortion effect options",
        instructions: [
          "Go to Effect > Blur & Sharpen > Directional Blur",
          "Set Direction to 0° (horizontal blur)",
          "Set Blur Length to 0 at the start keyframe",
          "Set Blur Length to 100 at the end keyframe",
          "Enable keyframe interpolation for smooth transition"
        ],
        parameters: [
          { name: "Direction", value: "0°" },
          { name: "Start Blur Length", value: "0" },
          { name: "End Blur Length", value: "100" },
          { name: "Blur Quality", value: "High" }
        ],
        tips: [
          "Adjust direction based on your zoom center point",
          "Higher blur values create more dramatic effects",
          "Use CC Radial Blur for alternative zoom blur styles"
        ],
        practiceTask: "Apply and animate directional blur to match the zoom.",
        hints: [
          "The Effects & Presets panel is your friend",
          "Blur direction should match your zoom direction",
          "Preview at full resolution to see the final effect"
        ]
      },
      {
        stepNumber: 4,
        title: "Add Glow Enhancement",
        description: "Enhance the effect with a subtle glow to create depth and cinematic quality.",
        duration: "7m",
        difficulty: "intermediate",
        thumbnail: "https://images.pexels.com/photos/3861787/pexels-photo-3861787.jpeg",
        thumbnailAlt: "Video editing interface showing color grading and glow effect controls",
        instructions: [
          "Apply Effect > Stylize > Glow",
          "Set Glow Threshold to 75%",
          "Set Glow Radius to 50",
          "Set Glow Intensity to 0.5",
          "Animate intensity from 0 to 0.5 during the zoom"
        ],
        parameters: [
          { name: "Glow Threshold", value: "75%" },
          { name: "Glow Radius", value: "50" },
          { name: "Start Intensity", value: "0" },
          { name: "End Intensity", value: "0.5" }
        ],
        tips: [
          "Glow works best on bright areas of your footage",
          "Subtle glow is more professional than heavy glow",
          "Combine with color correction for best results"
        ],
        practiceTask: "Add glow effect and animate it to complement the zoom.",
        hints: [
          "The Stylize category contains many creative effects",
          "Preview the effect to ensure it\'s not too strong",
          "Glow threshold controls which areas receive the effect"
        ]
      },
      {
        stepNumber: 5,
        title: "Fine-tune Timing and Export",
        description: "Adjust the overall timing, add any final touches, and prepare for export or integration.",
        duration: "15m",
        difficulty: "intermediate",
        thumbnail: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
        thumbnailAlt: "After Effects export settings dialog showing render queue and output module options",
        instructions: [
          "Review the entire animation in real-time",
          "Adjust keyframe timing if needed for better flow",
          "Add motion blur to the layer (Layer > Switches > Motion Blur)",
          "Enable motion blur for the composition",
          "Add to render queue or export for After Effects automation"
        ],
        parameters: [
          { name: "Motion Blur", value: "Enabled" },
          { name: "Shutter Angle", value: "180°" },
          { name: "Shutter Phase", value: "0°" }
        ],
        tips: [
          "Motion blur adds realism to fast movements",
          "Preview at full resolution before final render",
          "Save your project with a descriptive name",
          "Export settings can be automated via JSX script"
        ],
        practiceTask: "Complete the effect and prepare it for use in your projects.",
        hints: [
          "The motion blur switch looks like a small \'M\' icon",
          "Composition motion blur must be enabled separately",
          "Test render a small section before full export"
        ]
      }
    ]
  };

  const prerequisiteSkills = [
    {
      id: "skill-1",
      name: "Basic After Effects Navigation",
      description: "Understanding the interface, timeline, and basic tools",
      isCompleted: true,
      tutorialLink: "/tutorial/basics"
    },
    {
      id: "skill-2",
      name: "Keyframe Animation",
      description: "Creating and editing keyframes for property animation",
      isCompleted: true,
      tutorialLink: "/tutorial/keyframes"
    },
    {
      id: "skill-3",
      name: "Layer Management",
      description: "Working with layers, pre-composing, and organization",
      isCompleted: false,
      tutorialLink: "/tutorial/layers"
    },
    {
      id: "skill-4",
      name: "Effect Application",
      description: "Applying and adjusting effects in After Effects",
      isCompleted: true,
      tutorialLink: "/tutorial/effects"
    }
  ];

  const relatedTutorials = [
    {
      id: "rel-1",
      title: "Radial Blur Transitions",
      description: "Create spinning blur transitions for dynamic scene changes",
      thumbnail: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      thumbnailAlt: "Abstract radial blur effect with spinning motion and bright colors",
      duration: "35m",
      difficulty: "intermediate",
      isNew: true
    },
    {
      id: "rel-2",
      title: "Motion Blur Techniques",
      description: "Master motion blur settings for realistic animation",
      thumbnail: "https://images.pexels.com/photos/3861787/pexels-photo-3861787.jpeg",
      thumbnailAlt: "Fast-moving object with motion blur trail showing speed and direction",
      duration: "25m",
      difficulty: "beginner",
      completionRate: 65
    },
    {
      id: "rel-3",
      title: "Advanced Glow Effects",
      description: "Create professional glow and light effects for cinematic looks",
      thumbnail: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
      thumbnailAlt: "Cinematic scene with dramatic glow effects and light rays",
      duration: "40m",
      difficulty: "advanced"
    },
    {
      id: "rel-4",
      title: "Camera Shake and Impact",
      description: "Add realistic camera shake for action sequences",
      thumbnail: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg",
      thumbnailAlt: "Dynamic action scene with camera shake effect and motion blur",
      duration: "30m",
      difficulty: "intermediate",
      completionRate: 40
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    if (expandedSteps?.includes(index)) {
      setExpandedSteps(expandedSteps?.filter(i => i !== index));
    } else {
      setExpandedSteps([...expandedSteps, index]);
    }
  };

  const handleStepComplete = (stepData) => {
    if (!completedSteps?.includes(currentStepIndex)) {
      setCompletedSteps([...completedSteps, currentStepIndex]);
    }
    if (currentStepIndex < tutorialData?.steps?.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setExpandedSteps([currentStepIndex + 1]);
    }
    setIsPracticeMode(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < tutorialData?.steps?.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setExpandedSteps([currentStepIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setExpandedSteps([currentStepIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExport = async (exportOptions) => {
    console.log('Exporting tutorial with options:', exportOptions);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Tutorial exported successfully!');
  };

  const handleGenerateNewTutorial = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('New tutorial generated! Redirecting to analysis...');
      navigate('/analysis-results');
    }, 3000);
  };

  const currentStep = tutorialData?.steps?.[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / tutorialData?.steps?.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6 md:mb-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => navigate('/analysis-results')}
                  className="p-1 hover:bg-muted/50 rounded transition-smooth"
                >
                  <Icon name="ArrowLeft" size={20} color="var(--color-muted-foreground)" />
                </button>
                <span className="text-xs md:text-sm text-muted-foreground">
                  Back to Analysis
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {tutorialData?.title}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                {tutorialData?.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg">
                  <Icon name="Clock" size={16} color="var(--color-primary)" />
                  <span className="text-sm text-foreground">{tutorialData?.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg">
                  <Icon name="BarChart3" size={16} color="var(--color-secondary)" />
                  <span className="text-sm text-foreground capitalize">{tutorialData?.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg">
                  <Icon name="Tag" size={16} color="var(--color-accent)" />
                  <span className="text-sm text-foreground">{tutorialData?.category}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <ConnectivityStatus 
                isConnected={true}
                connectionType="after-effects"
                variant="default"
                onRetry={() => console.log('Retry connection')}
              />
              <QuickActionsMenu variant="compact" />
            </div>
          </div>

          {isGenerating && (
            <div className="mb-6">
              <ProgressIndicator
                progress={66}
                status="processing"
                message="Generating tutorial content..."
                showPercentage={true}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <VideoComparison
                beforeVideo={tutorialData?.beforeVideo}
                afterVideo={tutorialData?.afterVideo}
                currentStep={currentStep}
                onTimeUpdate={(time) => console.log('Video time:', time)}
              />

              <div className="p-4 md:p-5 lg:p-6 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Tutorial Steps
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStepIndex + 1} of {tutorialData?.steps?.length}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {tutorialData?.steps?.map((step, index) => (
                    <TutorialStepCard
                      key={step?.stepNumber}
                      step={step}
                      isActive={index === currentStepIndex}
                      isCompleted={completedSteps?.includes(index)}
                      isExpanded={expandedSteps?.includes(index)}
                      onStepClick={() => handleStepClick(index)}
                      onToggleExpand={() => handleStepClick(index)}
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="default"
                    iconName="ChevronLeft"
                    iconPosition="left"
                    onClick={handlePreviousStep}
                    disabled={currentStepIndex === 0}
                    fullWidth
                  >
                    Previous Step
                  </Button>
                  <Button
                    variant="default"
                    size="default"
                    iconName="ChevronRight"
                    iconPosition="right"
                    onClick={handleNextStep}
                    disabled={currentStepIndex === tutorialData?.steps?.length - 1}
                    fullWidth
                  >
                    Next Step
                  </Button>
                </div>
              </div>

              <InteractivePractice
                currentStep={currentStep}
                onComplete={handleStepComplete}
                onSkip={() => setIsPracticeMode(false)}
                onHint={(hint) => console.log('Hint requested:', hint)}
              />
            </div>

            <div className="space-y-6">
              <TutorialProgress
                totalSteps={tutorialData?.steps?.length}
                completedSteps={completedSteps?.length}
                currentStep={currentStepIndex + 1}
                estimatedTime={tutorialData?.estimatedTime}
                timeSpent={timeSpent}
              />

              <PrerequisiteSkills
                skills={prerequisiteSkills}
                onSkillClick={(skillId) => console.log('View skill:', skillId)}
              />

              <div className="p-4 md:p-5 bg-card border border-border rounded-lg">
                <Button
                  variant="outline"
                  size="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => setShowExportPanel(!showExportPanel)}
                  fullWidth
                >
                  {showExportPanel ? 'Hide' : 'Show'} Export Options
                </Button>
              </div>

              {showExportPanel && (
                <TutorialExportOptions
                  tutorialTitle={tutorialData?.title}
                  onExport={handleExport}
                />
              )}

              <RelatedTutorials
                tutorials={relatedTutorials}
                onTutorialSelect={(id) => console.log('Selected tutorial:', id)}
              />

              <div className="p-4 md:p-5 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <Icon name="Sparkles" size={24} color="var(--color-primary)" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      Generate New Tutorial
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze another video to create a new learning tutorial
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleGenerateNewTutorial}
                  loading={isGenerating}
                  fullWidth
                >
                  {isGenerating ? 'Generating...' : 'New Tutorial'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorialGeneration;