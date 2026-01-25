import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuickActionsMenu from '../../components/ui/QuickActionsMenu';
import EffectCard from './components/EffectCard';
import FilterPanel from './components/FilterPanel';
import EffectPreviewModal from './components/EffectPreviewModal';
import CollectionSection from './components/CollectionSection';
import TrendingEffects from './components/TrendingEffects';

const EffectLibrary = () => {
  const navigate = useNavigate();
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [bookmarkedEffects, setBookmarkedEffects] = useState([1, 5, 8]);
  const [activeCollection, setActiveCollection] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: 'all',
    useCase: 'all',
    aeCompatible: false,
    hasTutorial: false,
    trending: false,
    bookmarkedOnly: false
  });
  const [loading, setLoading] = useState(true);
  const [effects, setEffects] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockEffects = [
        {
          id: 1,
          name: 'Smooth Zoom Transition',
          description: 'Professional zoom effect with easing for seamless transitions between scenes',
          thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
          thumbnailAlt: 'Abstract blue and purple gradient background with smooth zoom effect demonstration',
          category: 'motion',
          difficulty: 'beginner',
          rating: 5,
          usageCount: 1247,
          isNew: true,
          aeCompatible: true,
          hasTutorial: true,
          trending: true,
          trendingScore: 95,
          fullDescription: 'Create professional zoom transitions with customizable easing curves. Perfect for dynamic scene changes and attention-grabbing moments in your videos.',
          parameters: [
            { name: 'Zoom Scale', type: 'Number', range: '1.0 - 5.0', default: '2.0', description: 'Controls the intensity of the zoom effect' },
            { name: 'Duration', type: 'Time', range: '0.5s - 3.0s', default: '1.0s', description: 'Length of the zoom animation' },
            { name: 'Easing', type: 'Dropdown', range: 'Linear, Ease In, Ease Out', default: 'Ease Out', description: 'Animation curve style' }
          ],
          examples: [
            {
              title: 'Product Reveal',
              description: 'Zoom into product details',
              image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
              imageAlt: 'Product photography with zoom effect highlighting product details on white background'
            },
            {
              title: 'Scene Transition',
              description: 'Smooth scene changes',
              image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
              imageAlt: 'Cinematic scene transition with zoom effect between two different locations'
            }
          ]
        },
        {
          id: 2,
          name: 'Color Grade Pro',
          description: 'Advanced color grading with LUT support and real-time preview capabilities',
          thumbnail: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
          thumbnailAlt: 'Vibrant color graded landscape photo showing dramatic sky with enhanced colors and contrast',
          category: 'color',
          difficulty: 'advanced',
          rating: 5,
          usageCount: 892,
          isNew: false,
          aeCompatible: true,
          hasTutorial: true,
          trending: true,
          trendingScore: 88,
          fullDescription: 'Professional color grading toolkit with support for custom LUTs, color wheels, and advanced color correction tools.',
          parameters: [
            { name: 'Temperature', type: 'Number', range: '-100 to 100', default: '0', description: 'Adjust color temperature' },
            { name: 'Saturation', type: 'Number', range: '0 to 200', default: '100', description: 'Control color intensity' },
            { name: 'Contrast', type: 'Number', range: '-100 to 100', default: '0', description: 'Adjust tonal contrast' }
          ],
          examples: [
            {
              title: 'Cinematic Look',
              description: 'Film-style color grading',
              image: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
              imageAlt: 'Cinematic color graded scene with warm tones and high contrast film look'
            },
            {
              title: 'Vintage Style',
              description: 'Retro color treatment',
              image: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
              imageAlt: 'Vintage style color grading with faded colors and nostalgic warm tone'
            }
          ]
        },
        {
          id: 3,
          name: 'Text Reveal Animation',
          description: 'Dynamic text animations with multiple reveal styles and timing controls',
          thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
          thumbnailAlt: 'Modern typography design with animated text reveal effect on dark background',
          category: 'text',
          difficulty: 'intermediate',
          rating: 4,
          usageCount: 1534,
          isNew: true,
          aeCompatible: true,
          hasTutorial: true,
          trending: false,
          trendingScore: 72,
          fullDescription: 'Create engaging text animations with various reveal styles including typewriter, fade, slide, and custom animations.',
          parameters: [
            { name: 'Reveal Style', type: 'Dropdown', range: 'Fade, Slide, Type', default: 'Fade', description: 'Animation style for text reveal' },
            { name: 'Speed', type: 'Number', range: '0.1 - 2.0', default: '1.0', description: 'Animation speed multiplier' },
            { name: 'Delay', type: 'Time', range: '0s - 5.0s', default: '0s', description: 'Delay before animation starts' }
          ],
          examples: [
            {
              title: 'Title Sequence',
              description: 'Opening title animation',
              image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
              imageAlt: 'Professional title sequence with elegant text reveal animation on gradient background'
            },
            {
              title: 'Lower Third',
              description: 'Name and title display',
              image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
              imageAlt: 'Lower third graphic with animated text reveal showing name and title information'
            }
          ]
        },
        {
          id: 4,
          name: 'Smooth Pan Effect',
          description: 'Cinematic panning motion with customizable speed and direction settings',
          thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
          thumbnailAlt: 'Panoramic landscape view demonstrating smooth horizontal pan camera movement effect',
          category: 'motion',
          difficulty: 'beginner',
          rating: 4,
          usageCount: 967,
          isNew: false,
          aeCompatible: true,
          hasTutorial: true,
          trending: true,
          trendingScore: 81,
          fullDescription: 'Add professional panning motion to your footage with precise control over speed, direction, and easing.',
          parameters: [
            { name: 'Direction', type: 'Dropdown', range: 'Left, Right, Up, Down', default: 'Right', description: 'Pan direction' },
            { name: 'Speed', type: 'Number', range: '1 - 100', default: '50', description: 'Pan speed in pixels per second' },
            { name: 'Smoothness', type: 'Number', range: '0 - 100', default: '80', description: 'Motion smoothing amount' }
          ],
          examples: [
            {
              title: 'Landscape Pan',
              description: 'Scenic view panning',
              image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
              imageAlt: 'Beautiful landscape panorama with smooth horizontal pan across mountain scenery'
            },
            {
              title: 'Product Showcase',
              description: 'Product detail panning',
              image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
              imageAlt: 'Product photography with smooth pan effect revealing product features and details'
            }
          ]
        },
        {
          id: 5,
          name: 'Glitch Transition',
          description: 'Modern glitch effect for edgy transitions with RGB split and distortion',
          thumbnail: 'https://images.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
          thumbnailAlt: 'Digital glitch art effect with RGB color separation and distortion on abstract background',
          category: 'transitions',
          difficulty: 'intermediate',
          rating: 5,
          usageCount: 1823,
          isNew: false,
          aeCompatible: true,
          hasTutorial: true,
          trending: true,
          trendingScore: 92,
          fullDescription: 'Create modern glitch transitions with RGB separation, digital distortion, and customizable intensity.',
          parameters: [
            { name: 'Intensity', type: 'Number', range: '0 - 100', default: '50', description: 'Glitch effect strength' },
            { name: 'RGB Split', type: 'Number', range: '0 - 50', default: '10', description: 'Color channel separation' },
            { name: 'Frequency', type: 'Number', range: '1 - 20', default: '5', description: 'Glitch occurrence rate' }
          ],
          examples: [
            {
              title: 'Tech Intro',
              description: 'Technology themed opening',
              image: 'https://images.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
              imageAlt: 'Technology themed intro with digital glitch effect and futuristic design elements'
            },
            {
              title: 'Scene Break',
              description: 'Dynamic scene transition',
              image: 'https://images.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
              imageAlt: 'Dynamic scene transition with glitch effect creating visual impact between scenes'
            }
          ]
        },
        {
          id: 6,
          name: 'Blur & Glow',
          description: 'Soft focus blur with customizable glow intensity for dreamy aesthetics',
          thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
          thumbnailAlt: 'Soft focus bokeh lights with dreamy blur and glow effect creating ethereal atmosphere',
          category: 'blur',
          difficulty: 'beginner',
          rating: 4,
          usageCount: 743,
          isNew: false,
          aeCompatible: true,
          hasTutorial: false,
          trending: false,
          trendingScore: 65,
          fullDescription: 'Add soft focus blur and glow effects to create dreamy, ethereal looks in your footage.',
          parameters: [
            { name: 'Blur Amount', type: 'Number', range: '0 - 100', default: '30', description: 'Blur intensity' },
            { name: 'Glow Intensity', type: 'Number', range: '0 - 100', default: '40', description: 'Glow effect strength' },
            { name: 'Threshold', type: 'Number', range: '0 - 255', default: '128', description: 'Glow threshold level' }
          ],
          examples: [
            {
              title: 'Romantic Scene',
              description: 'Soft romantic look',
              image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
              imageAlt: 'Romantic scene with soft blur and glow creating dreamy atmospheric effect'
            },
            {
              title: 'Light Leak',
              description: 'Vintage light effect',
              image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
              imageAlt: 'Vintage style light leak effect with soft glow and warm atmospheric blur'
            }
          ]
        },
        {
          id: 7,
          name: 'Camera Shake',
          description: 'Realistic camera shake effect for action sequences and dynamic moments',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
          thumbnailAlt: 'Action scene with realistic camera shake effect creating dynamic motion and energy',
          category: 'motion',
          difficulty: 'intermediate',
          rating: 4,
          usageCount: 1156,
          isNew: false,
          aeCompatible: true,
          hasTutorial: true,
          trending: false,
          trendingScore: 68,
          fullDescription: 'Add realistic camera shake to create dynamic action sequences and emphasize impact moments.',
          parameters: [
            { name: 'Intensity', type: 'Number', range: '0 - 100', default: '50', description: 'Shake strength' },
            { name: 'Frequency', type: 'Number', range: '1 - 30', default: '10', description: 'Shake speed' },
            { name: 'Rotation', type: 'Boolean', range: 'On/Off', default: 'On', description: 'Include rotation shake' }
          ],
          examples: [
            {
              title: 'Action Impact',
              description: 'Explosion or impact shake',
              image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
              imageAlt: 'Action scene with camera shake effect emphasizing explosion impact and energy'
            },
            {
              title: 'Running Scene',
              description: 'Handheld camera movement',
              image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
              imageAlt: 'Running scene with handheld camera shake creating realistic motion and urgency'
            }
          ]
        },
        {
          id: 8,
          name: 'Rotation Spin',
          description: 'Smooth 360-degree rotation effect with customizable axis and speed control',
          thumbnail: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg',
          thumbnailAlt: 'Abstract spiral rotation effect with smooth 360-degree spin on colorful background',
          category: 'motion',
          difficulty: 'beginner',
          rating: 4,
          usageCount: 834,
          isNew: true,
          aeCompatible: true,
          hasTutorial: true,
          trending: false,
          trendingScore: 58,
          fullDescription: 'Create smooth rotation effects with control over axis, speed, and direction for dynamic visuals.',
          parameters: [
            { name: 'Rotation Axis', type: 'Dropdown', range: 'X, Y, Z', default: 'Z', description: 'Rotation axis' },
            { name: 'Speed', type: 'Number', range: '1 - 100', default: '30', description: 'Rotation speed' },
            { name: 'Direction', type: 'Dropdown', range: 'Clockwise, Counter', default: 'Clockwise', description: 'Rotation direction' }
          ],
          examples: [
            {
              title: 'Logo Spin',
              description: 'Rotating logo animation',
              image: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg',
              imageAlt: 'Company logo with smooth rotation spin animation on professional background'
            },
            {
              title: 'Product Display',
              description: '360-degree product view',
              image: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg',
              imageAlt: 'Product showcase with 360-degree rotation revealing all angles and features'
            }
          ]
        },
        {
          id: 9,
          name: 'Lens Distortion',
          description: 'Fisheye and barrel distortion effects for creative perspective manipulation',
          thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
          thumbnailAlt: 'Wide angle fisheye lens distortion effect showing curved perspective on urban scene',
          category: 'distortion',
          difficulty: 'advanced',
          rating: 4,
          usageCount: 567,
          isNew: false,
          aeCompatible: true,
          hasTutorial: false,
          trending: false,
          trendingScore: 52,
          fullDescription: 'Apply realistic lens distortion effects including fisheye, barrel, and pincushion distortion.',
          parameters: [
            { name: 'Distortion Type', type: 'Dropdown', range: 'Fisheye, Barrel, Pincushion', default: 'Barrel', description: 'Distortion style' },
            { name: 'Amount', type: 'Number', range: '-100 to 100', default: '30', description: 'Distortion intensity' },
            { name: 'Center X', type: 'Number', range: '0 - 100', default: '50', description: 'Horizontal center point' }
          ],
          examples: [
            {
              title: 'Wide Angle',
              description: 'Fisheye perspective',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
              imageAlt: 'Wide angle fisheye perspective showing dramatic curved distortion of architecture'
            },
            {
              title: 'Creative Look',
              description: 'Artistic distortion',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
              imageAlt: 'Creative artistic distortion effect creating unique perspective and visual interest'
            }
          ]
        },
        {
          id: 10,
          name: 'Fade Transition',
          description: 'Classic fade in/out transitions with customizable duration and curves',
          thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
          thumbnailAlt: 'Smooth fade transition effect between two scenes with gradual opacity change',
          category: 'transitions',
          difficulty: 'beginner',
          rating: 5,
          usageCount: 2145,
          isNew: false,
          aeCompatible: true,
          hasTutorial: true,
          trending: false,
          trendingScore: 78,
          fullDescription: 'Classic fade transitions for smooth scene changes with customizable timing.',
          parameters: [
            { name: 'Duration', type: 'Time', range: '0.5s - 3.0s', default: '1.0s', description: 'Fade duration' },
            { name: 'Type', type: 'Dropdown', range: 'Fade In, Fade Out, Cross Fade', default: 'Cross Fade', description: 'Fade type' }
          ],
          examples: [
            {
              title: 'Scene Change',
              description: 'Smooth scene transition',
              image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
              imageAlt: 'Smooth fade transition between two different scenes'
            }
          ]
        }
      ];

      const mockCollections = [
        { id: 'all', name: 'All Effects', count: mockEffects.length },
        { id: 'favorites', name: 'Favorites', count: 12 },
        { id: 'recent', name: 'Recently Used', count: 8 }
      ];

      setEffects(mockEffects);
      setCollections(mockCollections);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredEffects = useMemo(() => {
    return effects?.filter((effect) => {
      if (filters?.search && !effect?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !effect?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }
      if (filters?.category !== 'all' && effect?.category !== filters?.category) return false;
      if (filters?.difficulty !== 'all' && effect?.difficulty !== filters?.difficulty) return false;
      if (filters?.aeCompatible && !effect?.aeCompatible) return false;
      if (filters?.hasTutorial && !effect?.hasTutorial) return false;
      if (filters?.trending && !effect?.trending) return false;
      if (filters?.bookmarkedOnly && !bookmarkedEffects?.includes(effect?.id)) return false;
      return true;
    });
  }, [effects, filters, bookmarkedEffects]);

  const trendingEffects = useMemo(() => {
    return effects?.filter(e => e?.trending)?.sort((a, b) => b?.trendingScore - a?.trendingScore)?.slice(0, 5);
  }, [effects]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      difficulty: 'all',
      useCase: 'all',
      aeCompatible: false,
      hasTutorial: false,
      trending: false,
      bookmarkedOnly: false
    });
  };

  const handleBookmark = (effectId) => {
    setBookmarkedEffects(prev =>
      prev?.includes(effectId)
        ? prev?.filter(id => id !== effectId)
        : [...prev, effectId]
    );
  };

  const handlePreview = (effect) => {
    setSelectedEffect(effect);
  };

  const handleApply = (effect) => {
    console.log('Applying effect:', effect?.name);
    navigate('/video-upload', { state: { selectedEffect: effect } });
  };

  const handleLearnMore = (effect) => {
    navigate('/tutorial-generation', { state: { effect } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Effect Library
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Browse and apply professional video effects to your projects
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-smooth ${
                    viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Grid3x3" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-smooth ${
                    viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>
              <QuickActionsMenu variant="compact" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-3 space-y-6">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                isOpen={filterPanelOpen}
                onToggle={() => setFilterPanelOpen(!filterPanelOpen)}
              />

              <div className="hidden lg:block">
                <CollectionSection
                  collections={collections}
                  onSelectCollection={setActiveCollection}
                  activeCollection={activeCollection}
                />
              </div>

              <div className="hidden lg:block">
                <TrendingEffects
                  effects={trendingEffects}
                  onSelectEffect={handlePreview}
                />
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="text-sm md:text-base text-muted-foreground">
                  {filteredEffects?.length} effects found
                </div>
                <Button variant="outline" size="sm" iconName="Download">
                  Export List
                </Button>
              </div>

              {filteredEffects?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 md:py-24">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    No effects found
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className={`
                  ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6' :'space-y-4'
                  }
                `}>
                  {filteredEffects?.map((effect) => (
                    <EffectCard
                      key={effect?.id}
                      effect={effect}
                      onPreview={handlePreview}
                      onApply={handleApply}
                      onBookmark={handleBookmark}
                      isBookmarked={bookmarkedEffects?.includes(effect?.id)}
                    />
                  ))}
                </div>
              )}

              <div className="lg:hidden mt-8 space-y-6">
                <CollectionSection
                  collections={collections}
                  onSelectCollection={setActiveCollection}
                  activeCollection={activeCollection}
                />

                <TrendingEffects
                  effects={trendingEffects}
                  onSelectEffect={handlePreview}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {selectedEffect && (
        <EffectPreviewModal
          effect={selectedEffect}
          onClose={() => setSelectedEffect(null)}
          onApply={handleApply}
          onLearnMore={handleLearnMore}
        />
      )}
    </div>
  );
};

export default EffectLibrary;