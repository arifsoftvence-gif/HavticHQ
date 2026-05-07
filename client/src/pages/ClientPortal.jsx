import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Download,
  Plus
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { motion } from 'framer-motion';

const ClientPortal = () => {
  const stats = [
    { name: 'Active Projects', value: '0', icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Pending Invoices', value: '0', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Total Spent', value: '$0', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Open Support', value: '0', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Welcome Back, Client!</h1>
          <p className="text-text-secondary text-sm font-medium">Manage your projects and invoices here.</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> New Support Ticket</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-2xl font-bold text-text-primary">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Active Projects" extra={<Button variant="ghost" size="sm" className="text-primary">View All</Button>}>
          <div className="space-y-4">
            {[].length === 0 ? (
              <p className="text-center py-8 text-text-secondary text-sm font-medium">No active projects found.</p>
            ) : [].map((project, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-border hover:border-primary transition-all group">
                {/* ... existing project card ... */}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Invoices" extra={<Button variant="ghost" size="sm" className="text-primary">Pay All</Button>}>
          <div className="space-y-4">
            {[].length === 0 ? (
              <p className="text-center py-8 text-text-secondary text-sm font-medium">No recent invoices found.</p>
            ) : [].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-all border-b border-border last:border-0">
                {/* ... existing invoice item ... */}
              </div>
            ))}
            <Button variant="secondary" className="w-full mt-2 gap-2 text-xs">
              <Download className="w-3.5 h-3.5" /> Download Full Statement
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientPortal;
