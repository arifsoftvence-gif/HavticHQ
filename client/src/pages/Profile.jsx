import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, MapPin, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{t('profile')}</h1>
        <Button 
          variant={isEditing ? 'outline' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 text-center py-10">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-surface shadow-lg overflow-hidden mx-auto">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-primary" />
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-text-primary">{user?.name || 'User Name'}</h2>
          <p className="text-sm text-text-secondary uppercase font-bold tracking-widest">{user?.role || 'Member'}</p>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2" title="Personal Information">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Full Name</label>
                <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl">
                  <User className="w-4 h-4 text-text-secondary" />
                  <input 
                    type="text" 
                    defaultValue={user?.name} 
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Email Address</label>
                <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl">
                  <Mail className="w-4 h-4 text-text-secondary" />
                  <input 
                    type="email" 
                    defaultValue={user?.email} 
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Company</label>
                <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl">
                  <Building className="w-4 h-4 text-text-secondary" />
                  <input 
                    type="text" 
                    placeholder="HavticHQ Inc."
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Location</label>
                <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-xl">
                  <MapPin className="w-4 h-4 text-text-secondary" />
                  <input 
                    type="text" 
                    placeholder="New York, USA"
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 border-t border-border flex justify-end">
                <Button variant="primary" onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
