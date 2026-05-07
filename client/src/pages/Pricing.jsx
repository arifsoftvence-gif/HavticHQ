import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Zap, Rocket, Building } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
  const [loading, setLoading] = useState(null);
  const { user } = useAuth();

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      icon: Zap,
      features: ['Unlimited Invoices', '10 Clients', 'Basic Analytics', 'Email Support'],
      color: 'blue'
    },
    {
      name: 'Pro',
      price: '$79',
      icon: Rocket,
      features: ['Unlimited Invoices', 'Unlimited Clients', 'Advanced Analytics', 'AI Assistant', 'Priority Support'],
      popular: true,
      color: 'purple'
    },
    {
      name: 'Business',
      price: '$199',
      icon: Building,
      features: ['Everything in Pro', 'Multi-user Access', 'API Access', 'Dedicated Manager'],
      color: 'cyan'
    }
  ];

  const handleSubscribe = async (planType) => {
    setLoading(planType);
    try {
      await api.post('/subscriptions/subscribe', { planType: planType.toLowerCase() });
      const updatedUser = { ...user, subscriptionStatus: 'active' };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-white">Choose Your Plan</h1>
        <p className="text-white/40 max-w-2xl mx-auto">
          Scale your financial management with our flexible subscription plans. Upgrade now to unlock the full power of AI-driven billing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-white/5 backdrop-blur-lg border rounded-2xl p-8 shadow-xl relative flex flex-col ${plan.popular ? 'border-primary border-opacity-50 scale-105' : 'border-white/10'}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
            )}
            <div className="mb-8 text-white">
              <plan.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-white/40 ml-2">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                  <Check className="w-4 h-4 text-green-500" /> {feature}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(plan.name)} disabled={loading} className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-primary text-white hover:opacity-90' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
              {loading === plan.name ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : `Upgrade to ${plan.name}`}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
