import React, { useState, useEffect } from 'react';
import { ChevronRight, Save, Image, Type, Palette, Layout, Eye, CheckCircle2, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { useLanguage } from '../context/LanguageContext';

const InvoiceSettings = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('invoice_settings');
    return saved ? JSON.parse(saved) : {
      primaryColor: '#1E5BFF',
      font: 'Inter',
      template: 'Modern',
      showLogo: true,
      footerText: 'Thank you for your business!',
      companyName: 'HavticHQ Inc.',
      companyAddress: '123 Business St, New York, NY',
      taxRate: 0,
      currency: 'USD'
    };
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('invoice_settings', JSON.stringify(settings));
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('invoice_settings')}</span>
        </nav>
        <Button onClick={handleSave} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Settings Panel */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-10">
          <Card title="Design Customization">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-text-secondary uppercase">Primary Theme Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="w-12 h-12 rounded-lg border-0 p-0 cursor-pointer overflow-hidden shadow-sm"
                  />
                  <input 
                    type="text" 
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="bg-background border border-border rounded-lg px-4 py-2 text-sm font-bold text-text-primary focus:border-primary outline-none flex-1 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-text-secondary uppercase">Typography</label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <select 
                      value={settings.font}
                      onChange={(e) => setSettings({...settings, font: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:border-primary outline-none cursor-pointer"
                    >
                      <option>Inter</option>
                      <option>Poppins</option>
                      <option>Roboto</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-text-secondary uppercase">Template Style</label>
                  <div className="relative">
                    <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <select 
                      value={settings.template}
                      onChange={(e) => setSettings({...settings, template: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:border-primary outline-none cursor-pointer"
                    >
                      <option>Modern</option>
                      <option>Professional</option>
                      <option>Minimal</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Display Company Logo</h4>
                  <p className="text-xs text-text-secondary">Show your brand logo on invoices</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings.showLogo ? 'bg-primary' : 'bg-slate-300'}`} onClick={() => setSettings({...settings, showLogo: !settings.showLogo})}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.showLogo ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Business Details">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Company Name</label>
                <input 
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Company Address</label>
                <input 
                  type="text"
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase">Default Tax Rate (%)</label>
                  <input 
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value) || 0})}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase">Currency</label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Footer Information">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Footer Note</label>
                <textarea 
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl p-4 text-sm font-medium h-24 focus:border-primary outline-none resize-none"
                  placeholder="Additional notes or payment instructions..."
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="bg-slate-200 rounded-2xl p-8 overflow-y-auto hidden lg:flex flex-col items-center sticky top-0 h-full">
          <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-6">
            <Eye className="w-3 h-3" /> Live Preview
          </div>
          <div className="w-full max-w-[500px] aspect-[1/1.414] bg-white shadow-2xl rounded-sm p-10 flex flex-col scale-[0.8] origin-top">
            <div className="flex justify-between items-start mb-12">
              <div>
                {settings.showLogo && (
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4" style={{ backgroundColor: settings.primaryColor }}>{settings.companyName.charAt(0)}</div>
                )}
                <h3 className="font-bold text-lg leading-tight">{settings.companyName}</h3>
                <p className="text-[10px] text-text-secondary">{settings.companyAddress}</p>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-slate-800">Invoice</h1>
                <p className="text-[10px] font-bold text-text-secondary mt-1 uppercase">#INV-2026-001</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-[8px] font-bold text-text-secondary uppercase mb-2">Bill To:</p>
                <h4 className="text-xs font-bold">Acme Corporation</h4>
                <p className="text-[8px] text-text-secondary">456 Client Avenue, San Francisco, CA</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-bold text-text-secondary uppercase mb-2">Issue Date:</p>
                <p className="text-xs font-bold">May 07, 2026</p>
                <p className="text-[8px] font-bold text-text-secondary uppercase mt-4 mb-2">Due Date:</p>
                <p className="text-xs font-bold" style={{ color: settings.primaryColor }}>May 21, 2026</p>
              </div>
            </div>

            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-[8px] font-bold text-text-secondary uppercase text-left">Description</th>
                  <th className="py-2 text-[8px] font-bold text-text-secondary uppercase text-right">Qty</th>
                  <th className="py-2 text-[8px] font-bold text-text-secondary uppercase text-right">Price</th>
                  <th className="py-2 text-[8px] font-bold text-text-secondary uppercase text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="py-4 text-xs font-medium">Monthly SaaS Subscription</td>
                  <td className="py-4 text-xs font-medium text-right">1</td>
                  <td className="py-4 text-xs font-medium text-right">$300.00</td>
                  <td className="py-4 text-xs font-bold text-right">$300.00</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-auto ml-auto w-40 space-y-2 border-t pt-4 border-slate-100">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-text-secondary font-bold uppercase">Subtotal</span>
                <span className="font-bold">$300.00</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-text-secondary font-bold uppercase">Tax ({settings.taxRate}%)</span>
                <span className="font-bold">${(300 * settings.taxRate / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-slate-50 px-2 rounded mt-2">
                <span className="text-[10px] font-bold uppercase">Total</span>
                <span className="text-lg font-bold" style={{ color: settings.primaryColor }}>${(300 + (300 * settings.taxRate / 100)).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-[10px] text-text-secondary font-medium leading-relaxed italic">{settings.footerText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSettings;
