import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Puzzle, 
  Settings2,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChartMenuOpen, setIsChartMenuOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/invoices/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const statCards = [
    { 
      name: t('all_clients'), 
      value: stats?.clientCount || 0, 
      status: `${stats?.clientCount || 0} ${t('active')}`, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      path: '/clients' 
    },
    { 
      name: t('current_month_revenue'), 
      value: `$${stats?.monthlyRevenue?.[new Date().getMonth()]?.revenue || 0}`, 
      status: t('up_to_date'), 
      icon: TrendingUp, 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      path: '/reports' 
    },
    { 
      name: t('active_features'), 
      value: '12', 
      status: t('active'), 
      icon: Puzzle, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100', 
      path: '/features' 
    },
    { 
      name: t('total_revenue'), 
      value: `$${stats?.totalRevenue || 0}`, 
      status: t('active'), 
      icon: Settings2, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100', 
      path: '/settings/invoice' 
    },
  ];

  const featureUsage = [
    { name: 'Asset Management', count: 0, progress: 0 },
    { name: 'Support Tickets', count: 0, progress: 0 },
    { name: 'Income & Expense Tracker', count: 0, progress: 0 },
    { name: 'Invoicing', count: stats?.invoiceCount || 0, progress: stats?.invoiceCount > 0 ? 100 : 0 },
    { name: 'Bills & Payables', count: 0, progress: 0 },
    { name: 'Project Management', count: 0, progress: 0 },
    { name: 'Loans & Debts', count: 0, progress: 0 },
    { name: 'Online Meetings', count: 0, progress: 0 },
  ];

  const chartData = stats?.monthlyRevenue || [
    { name: 'Jan', revenue: 0 },
    { name: 'Feb', revenue: 0 },
    { name: 'Mar', revenue: 0 },
    { name: 'Apr', revenue: 0 },
    { name: 'May', revenue: 0 },
    { name: 'Jun', revenue: 0 },
    { name: 'Jul', revenue: 0 },
    { name: 'Aug', revenue: 0 },
    { name: 'Sep', revenue: 0 },
    { name: 'Oct', revenue: 0 },
    { name: 'Nov', revenue: 0 },
    { name: 'Dec', revenue: 0 },
  ];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('welcome')}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={stat.name} to={stat.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:border-primary transition-all group"
            >
              <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-tight">{stat.name}</p>
                <h3 className="text-2xl font-bold text-text-primary">{stat.value}</h3>
                <p className={`text-xs font-bold flex items-center gap-1 ${stat.status === 'Paid' || stat.status.includes(t('active')) || stat.status === t('up_to_date') ? 'text-green-500' : 'text-blue-500'}`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.status}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          className="lg:col-span-2"
          title={`${t('revenue_overview')} — 2026`}
          extra={
            <div className="flex items-center gap-2">
              <select className="bg-background border border-border rounded-lg px-2 py-1 text-[10px] font-bold text-text-secondary focus:outline-none focus:border-primary">
                <option>2026</option>
                <option>2025</option>
              </select>
              <select className="bg-background border border-border rounded-lg px-2 py-1 text-[10px] font-bold text-text-secondary focus:outline-none focus:border-primary">
                <option>All Clients</option>
                <option>Premium Clients</option>
              </select>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsChartMenuOpen(!isChartMenuOpen)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                <AnimatePresence>
                  {isChartMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsChartMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 p-1"
                      >
                        <button className="w-full text-left px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                          Export CSV
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                          Export PDF
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                          Print Chart
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          }
        >
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E5BFF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E5BFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#64748B" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1E293B', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1E5BFF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)"
                  dot={{ r: 4, fill: '#1E5BFF', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card 
          title={t('feature_usage')}
          extra={<Button variant="ghost" size="sm" className="text-primary hover:text-primary">{t('view_all')}</Button>}
        >
          <div className="space-y-6">
            {featureUsage.map((feature) => (
              <div key={feature.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-text-secondary">{feature.name}</span>
                  <span className="text-text-primary">{feature.count}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${feature.progress}%` }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
