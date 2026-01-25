import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileSection = ({ profile, onUpdateProfile, onChangePassword }) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 md:p-5 lg:p-6 border border-border">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <div className="relative flex-shrink-0">
          <Image
            src={profile?.avatar}
            alt={profile?.avatarAlt}
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-background shadow-glow"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-glow-md hover:scale-110 transition-smooth">
            <Icon name="Camera" size={16} />
          </button>
        </div>

        <div className="flex-1 min-w-0 space-y-3 md:space-y-4 w-full md:w-auto">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground truncate">
              {profile?.name}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1 truncate">
              {profile?.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button
              variant="default"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={onUpdateProfile}
              className="flex-1 sm:flex-none"
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Lock"
              iconPosition="left"
              onClick={onChangePassword}
              className="flex-1 sm:flex-none"
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-success/20 text-success rounded-lg">
            <Icon name="CheckCircle2" size={16} />
            <span className="text-xs md:text-sm font-medium whitespace-nowrap">Pro Account</span>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-right">
            Member since {profile?.memberSince}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;