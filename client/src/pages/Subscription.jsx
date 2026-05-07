import React from 'react';
import { ChevronRight, CreditCard, Check, ShieldCheck, Zap, ArrowRight, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Subscription = () => {
  const plans = [
    { name: 'Starter', price: '$0', features: ['Up to 5 clients', 'Basic invoicing', 'Email support', '1 Project board'] },
    { name: 'Professional', price: '$29', features: ['Unlimited clients', 'AI Invoice generator', 'Priority support', '5 Project boards', 'Custom branding'], current: true },
    { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'White-labeling', 'API Access', 'Dedicated manager', 'SLA Guarantee'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">My Subscription</span>
        </nav>
        <Badge variant="primary" className="px-4 py-1.5 text-xs">Trial ends in 14 days</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative overflow-hidden ${plan.current ? 'border-primary ring-1 ring-primary' : ''}`}
          >
            {plan.current && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-[10px] font-bold uppercase py-1 px-4 rounded-bl-xl shadow-lg">Current Plan</div>
              </div>
            )}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary font-medium">/month</span>
                </div>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.current ? 'secondary' : 'primary'} 
                className="w-full gap-2"
                disabled={plan.current}
              >
                {plan.current ? 'Active Now' : 'Upgrade Plan'} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Payment Method" extra={<Button variant="ghost" size="sm" className="text-primary"><Plus className="w-4 h-4" /> Add New</Button>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border group hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white border border-border rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-800 italic">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Visa ending in 4242</p>
                  <p className="text-xs text-text-secondary font-medium">Expires 12/2026</p>
                </div>
              </div>
              <Badge variant="success">Primary</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border group hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white border border-border rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-red-600 italic">MASTERCARD</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Mastercard ending in 5555</p>
                  <p className="text-xs text-text-secondary font-medium">Expires 08/2027</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Billing History" extra={<Button variant="ghost" size="sm" className="text-primary">View All</Button>}>
          <div className="space-y-3">
            {[
              { date: 'May 01, 2026', amount: '$29.00', status: 'Paid', id: 'INV-2026-102' },
              { date: 'Apr 01, 2026', amount: '$29.00', status: 'Paid', id: 'INV-2026-084' },
              { date: 'Mar 01, 2026', amount: '$29.00', status: 'Paid', id: 'INV-2026-056' },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{invoice.id}</p>
                    <p className="text-xs text-text-secondary font-medium">{invoice.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">{invoice.amount}</p>
                  <Badge variant="success" className="mt-1">{invoice.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
