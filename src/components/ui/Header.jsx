import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Upload',
      path: '/video-upload',
      icon: 'Upload',
      tooltip: 'Upload video for analysis'
    },
    {
      label: 'Analysis',
      path: '/analysis-results',
      icon: 'BarChart3',
      tooltip: 'View analysis results'
    },
    {
      label: 'Tutorials',
      path: '/tutorial-generation',
      icon: 'BookOpen',
      tooltip: 'Generate learning tutorials'
    },
    {
      label: 'Effects',
      path: '/effect-library',
      icon: 'Library',
      tooltip: 'Browse effect library'
    },
    {
      label: 'Automation',
      path: '/after-effects-control',
      icon: 'Zap',
      tooltip: 'After Effects automation'
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      tooltip: 'App preferences'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-card border-b border-border shadow-glow z-200">
        <div className="h-full px-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/video-upload" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary/30">
                <Icon name="Film" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-mono font-semibold text-foreground hidden sm:block">
                AI Video Effects
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className="no-underline group"
                  title={item?.tooltip}
                >
                  <div
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth
                      ${isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-glow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'}
                    />
                    <span className="text-sm font-medium">{item?.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className="no-underline"
                  title={item?.tooltip}
                >
                  <Button
                    variant={isActive(item?.path) ? 'default' : 'ghost'}
                    size="sm"
                    iconName={item?.icon}
                    iconSize={18}
                  >
                    {item?.label}
                  </Button>
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-background z-1020 lg:hidden overflow-y-auto">
          <nav className="p-6 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className="no-underline block"
              >
                <div
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-glow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'}
                  />
                  <div className="flex-1">
                    <div className="text-base font-medium">{item?.label}</div>
                    <div className="text-xs opacity-70">{item?.tooltip}</div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="no-underline block"
                >
                  <div
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth
                      ${isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-glow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'}
                    />
                    <div className="flex-1">
                      <div className="text-base font-medium">{item?.label}</div>
                      <div className="text-xs opacity-70">{item?.tooltip}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;