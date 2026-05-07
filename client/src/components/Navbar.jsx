import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Globe, 
  Sun, 
  Moon,
  LayoutGrid, 
  Maximize2, 
  Minimize2,
  Settings, 
  FileText,
  BarChart3,
  Kanban as KanbanIcon,
  Mail,
  HardDrive,
  Table,
  Video,
  ChevronDown,
  LogOut,
  User,
  Shield,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentLangObj = [
    { name: 'English', code: 'EN', flag: 'https://flagcdn.com/w40/us.png' },
    { name: 'Bengali', code: 'BN', flag: 'https://flagcdn.com/w40/bd.png' },
    { name: 'Spanish', code: 'ES', flag: 'https://flagcdn.com/w40/es.png' },
    { name: 'French', code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
  ].find(l => l.code === language) || { name: 'English', code: 'EN', flag: 'https://flagcdn.com/w40/us.png' };

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes (e.g., via Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-40 transition-all duration-300">
      <div className="relative w-80 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search_placeholder')} 
          className="bg-background border border-border rounded-lg pl-10 pr-12 py-2 w-full focus:outline-none focus:border-primary transition-all text-sm font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/50 border border-border px-1.5 py-0.5 rounded text-[10px] font-bold text-text-secondary">
          ⌘F
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 mr-4">
          {/* Language Dropdown (Integrated with Globe) */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`p-2 text-text-secondary hover:bg-background rounded-lg transition-colors ${isLangOpen ? 'text-primary bg-primary/5' : ''}`} 
              title="Language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-40 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-1">
                      {[
                        { name: 'English', code: 'EN', flag: 'https://flagcdn.com/w40/us.png' },
                        { name: 'Bengali', code: 'BN', flag: 'https://flagcdn.com/w40/bd.png' },
                        { name: 'Spanish', code: 'ES', flag: 'https://flagcdn.com/w40/es.png' },
                        { name: 'French', code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${language === lang.code ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-background hover:text-text-primary'}`}
                        >
                          <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-sm" />
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={toggleDarkMode}
            className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors" 
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {/* Apps Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsAppsOpen(!isAppsOpen)}
              className={`p-2 text-text-secondary hover:bg-background rounded-lg transition-colors ${isAppsOpen ? 'text-primary bg-primary/5' : ''}`} 
              title="Apps"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {isAppsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAppsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-72 bg-surface border border-border rounded-xl shadow-xl z-50 p-4"
                  >
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">{t('quick_apps')}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'Gmail', icon: Mail, url: 'https://mail.google.com', color: 'bg-red-100 text-red-600' },
                        { name: 'Drive', icon: HardDrive, url: 'https://drive.google.com', color: 'bg-blue-100 text-blue-600' },
                        { name: 'Sheets', icon: Table, url: 'https://sheets.google.com', color: 'bg-green-100 text-green-600' },
                        { name: 'Meet', icon: Video, url: 'https://meet.google.com', color: 'bg-blue-100 text-blue-600' },
                        { name: t('new_invoice'), icon: FileText, path: '/invoices/new', color: 'bg-slate-100 text-slate-600' },
                        { name: t('kanban'), icon: KanbanIcon, path: '/projects', color: 'bg-purple-100 text-purple-600' },
                      ].map(app => (
                        <button 
                          key={app.name} 
                          onClick={() => {
                            if (app.url) {
                              window.open(app.url, '_blank');
                            } else {
                              navigate(app.path);
                            }
                            setIsAppsOpen(false);
                          }}
                          className="flex flex-col items-center gap-2 p-2 hover:bg-background rounded-lg transition-all group"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${app.color} group-hover:scale-110 transition-transform`}>
                            <app.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold text-text-secondary uppercase text-center">{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-2 text-text-secondary hover:bg-background rounded-lg transition-colors ${isNotificationsOpen ? 'text-primary bg-primary/5' : ''}`} 
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-surface">
                0
              </span>
            </button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="text-sm font-bold text-text-primary">{t('notifications')}</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">0 New</span>
                    </div>
                    <div className="py-8 text-center">
                      <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-xs text-text-secondary font-medium">{t('no_notifications')}</p>
                    </div>
                    <button className="w-full py-3 bg-slate-50 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-slate-100 transition-colors">
                      {t('view_all')}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={toggleFullscreen}
            className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors" 
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => navigate('/settings/invoice')}
            className="p-2 text-text-secondary hover:bg-background rounded-lg transition-colors" 
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>



        {/* User Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 border-l border-border ml-4 pl-4 cursor-pointer hover:bg-background p-1.5 rounded-lg transition-all group ${isProfileOpen ? 'bg-background' : ''}`}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 border border-primary/20">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=1E5BFF&color=fff`} alt="Avatar" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-text-primary leading-none mb-1">{user?.name || 'Admin'}</p>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-tight leading-none">{user?.role || 'Admin'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-text-secondary group-hover:text-primary transition-all ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-border bg-slate-50/50">
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-text-primary truncate">{user?.email || 'admin@havtichq.com'}</p>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      <User className="w-4 h-4" /> {t('profile')}
                    </button>
                    <button 
                      onClick={() => { navigate('/settings/account'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      <Settings className="w-4 h-4" /> {t('settings')}
                    </button>
                    <button 
                      onClick={() => { navigate('/settings/security'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      <Shield className="w-4 h-4" /> {t('security')}
                    </button>
                    <button 
                      onClick={() => { navigate('/help'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      <HelpCircle className="w-4 h-4" /> {t('help')}
                    </button>
                  </div>

                  <div className="p-2 border-t border-border">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut className="w-4 h-4" /> {t('sign_out')}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
