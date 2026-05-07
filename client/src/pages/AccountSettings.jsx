import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Bell, Moon, Laptop, Volume2, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const AccountSettings = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">{t('settings')}</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Language & Regional */}
        <Card title="Language & Regional">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Interface Language</p>
                  <p className="text-xs text-text-secondary">Select your preferred language for the dashboard</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm font-bold focus:outline-none focus:border-primary"
              >
                <option value="EN">English</option>
                <option value="BN">Bengali</option>
                <option value="ES">Spanish</option>
                <option value="FR">French</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notifications">
          <div className="space-y-4">
            {[
              { id: 'email', label: 'Email Notifications', desc: 'Receive daily summaries and invoice alerts', icon: Bell },
              { id: 'browser', label: 'Browser Notifications', desc: 'Get real-time updates while using the app', icon: Eye },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Display Settings */}
        <Card title="Appearance">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'light', name: 'Light Mode', icon: Globe },
              { id: 'dark', name: 'Dark Mode', icon: Moon },
              { id: 'system', name: 'System Default', icon: Laptop },
            ].map((theme) => (
              <button 
                key={theme.id}
                className="flex flex-col items-center gap-3 p-6 bg-background border border-border rounded-2xl hover:border-primary transition-all group"
              >
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <theme.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold">{theme.name}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
