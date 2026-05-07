import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Monitor, LogOut, Key } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const Security = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">{t('security')}</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Password Change */}
        <Card title="Change Password">
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">Current Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">New Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <Button variant="primary">Update Password</Button>
          </div>
        </Card>

        {/* 2FA */}
        <Card title="Two-Factor Authentication">
          <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Authentication App</p>
                <p className="text-xs text-text-secondary">Use Google Authenticator or Authy to secure your account</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </Card>

        {/* Active Sessions */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            {[
              { id: 1, device: 'MacBook Pro', location: 'New York, USA', time: 'Active now', icon: Monitor },
              { id: 2, device: 'iPhone 15 Pro', location: 'New York, USA', time: '2 hours ago', icon: Smartphone },
            ].map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-text-secondary">
                    <session.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{session.device}</p>
                    <p className="text-xs text-text-secondary">{session.location} • {session.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Log Out</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Security;
