import React from 'react';
import { ChevronRight, Plus, Puzzle, Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Features = () => {
  const features = [
    { name: 'Asset Management', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Support Tickets', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Income & Expense Tracker', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Invoicing', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Bills & Payables', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Project Management', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Loans & Debts', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
    { name: 'Online Meetings', status: 'Active', price: '$0.00', frequency: 'Monthly', date: '01 Jan 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">Features</span>
        </nav>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Feature
        </Button>
      </div>

      <Card title="Manage Features" subtitle="Enable or disable features for your platform and manage pricing.">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-border">
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Feature Name</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Pricing</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {features.map((feature, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <Puzzle className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-text-primary">{feature.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-text-primary">{feature.price}</p>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">{feature.frequency}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary font-medium">
                    {feature.date}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success">{feature.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Features;
