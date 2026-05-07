import React, { useState } from 'react';
import { ChevronRight, CreditCard, ShieldCheck, Zap, ArrowRight, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useLanguage } from '../context/LanguageContext';

const Gateways = () => {
  const { t } = useLanguage();
  const [connecting, setConnecting] = useState(null);
  const [gatewayStates, setGatewayStates] = useState({
    Stripe: 'Connected',
    PayPal: 'Not Connected',
    Razorpay: 'Not Connected',
  });

  const gateways = [
    { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', description: 'Accept credit cards and local payment methods worldwide.' },
    { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', description: 'Allow customers to pay via PayPal, Venmo, and more.' },
    { name: 'Razorpay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg', description: 'Popular payment gateway for the Indian market.' },
  ];

  const handleConnect = (name) => {
    setConnecting(name);
    setTimeout(() => {
      setGatewayStates(prev => ({
        ...prev,
        [name]: prev[name] === 'Connected' ? 'Not Connected' : 'Connected'
      }));
      setConnecting(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('payment_gateways')}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gateways.map((gateway) => (
          <Card key={gateway.name} className="flex flex-col border hover:border-primary/30 transition-all">
            <div className="h-12 mb-6 flex items-center justify-between">
              <img src={gateway.logo} alt={gateway.name} className="h-6 object-contain" />
              <Badge variant={gatewayStates[gateway.name] === 'Connected' ? 'success' : 'secondary'}>
                {gatewayStates[gateway.name]}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary font-medium mb-6 flex-1">{gateway.description}</p>
            <Button 
              onClick={() => handleConnect(gateway.name)}
              disabled={connecting === gateway.name}
              variant={gatewayStates[gateway.name] === 'Connected' ? 'secondary' : 'primary'} 
              className="w-full gap-2"
            >
              {connecting === gateway.name ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : gatewayStates[gateway.name] === 'Connected' ? (
                <>Manage Connection <ExternalLink className="w-4 h-4" /></>
              ) : (
                <>Connect Now <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </Card>
        ))}
      </div>

      <Card title="Security & Compliance" className="bg-primary/5 border-primary/10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-1">PCI-DSS Compliant</h4>
            <p className="text-sm text-text-secondary font-medium">All payments are processed securely through our partners. We never store sensitive credit card data on our servers.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Gateways;
