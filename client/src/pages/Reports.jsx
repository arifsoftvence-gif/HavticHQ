import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart3, TrendingUp, Download, Calendar, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';

const Reports = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  
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

  useEffect(() => {
    fetchStats();
  }, []);

  const COLORS = ['#1E5BFF', '#94A3B8', '#EF4444', '#10B981'];

  const revenueData = stats?.monthlyStats || [
    { name: 'Jan', amount: 0 },
    { name: 'Feb', amount: 0 },
    { name: 'Mar', amount: 0 },
  ];

  const pieData = [
    { name: 'Paid', value: stats?.paidCount || 0 },
    { name: 'Pending', value: stats?.pendingCount || 0 },
    { name: 'Overdue', value: stats?.overdueCount || 0 },
  ];

  const handleExport = () => {
    // Basic CSV export simulation
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Invoices', stats?.totalInvoices],
      ['Total Revenue', `$${stats?.totalRevenue}`],
      ['Paid Invoices', stats?.paidCount],
      ['Pending Invoices', stats?.pendingCount],
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "havtichq_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('reports')}</span>
        </nav>
        <Button onClick={handleExport} className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${stats?.totalRevenue?.toLocaleString()}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Invoices', value: stats?.totalInvoices, icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Paid Rate', value: `${Math.round((stats?.paidCount / stats?.totalInvoices) * 100) || 0}%`, icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Overdue', value: stats?.overdueCount, icon: BarChart3, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-xl font-bold text-text-primary">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Revenue Trend">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="revenue" fill="#1E5BFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Invoice Status Distribution">
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
