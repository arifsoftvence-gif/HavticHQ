import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings2, 
  LogOut,
  PlusCircle,
  CreditCard,
  FolderKanban,
  ListTodo,
  CheckSquare,
  Puzzle,
  Crown,
  Kanban as KanbanIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();

  const sections = [
    {
      title: t('menu_main'),
      items: [
        { name: t('dashboard'), icon: LayoutDashboard, path: '/' },
        { name: t('kanban'), icon: KanbanIcon, path: '/projects' },
        { name: t('clients'), icon: Users, path: '/clients' },
      ]
    },
    {
      title: t('menu_invoicing'),
      items: [
        { name: t('new_invoice'), icon: PlusCircle, path: '/invoices/new' },
        { name: t('invoices'), icon: FileText, path: '/invoices' },
        { name: t('reports'), icon: BarChart3, path: '/reports' },
        { name: t('payment_gateways'), icon: CreditCard, path: '/gateways' },
        { name: t('invoice_settings'), icon: Settings2, path: '/settings/invoice' },
      ]
    },
    {
      title: t('menu_management'),
      items: [
        { name: t('all_features'), icon: Puzzle, path: '/features' },
        { name: t('subscription'), icon: Crown, path: '/settings/subscription' },
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">H</span>
        </div>
        <h1 className="text-xl font-bold text-text-primary">HavticHQ</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-4 text-[10px] font-bold text-text-secondary tracking-wider mb-2 uppercase">
              {section.title}
            </h3>
            {section.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-secondary hover:bg-background hover:text-text-primary'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}`} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'JD'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">{user?.name || 'John Doe'}</p>
            <p className="text-xs text-text-secondary truncate uppercase">{user?.role || 'User'}</p>
          </div>
          <button onClick={logout} className="text-text-secondary hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
