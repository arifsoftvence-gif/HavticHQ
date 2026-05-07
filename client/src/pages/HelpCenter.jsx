import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, BookOpen, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const HelpCenter = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">{t('help')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Knowledge Base Links */}
        <div className="md:col-span-1 space-y-4">
          <Card className="hover:border-primary transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">Documentation</h3>
              <p className="text-xs text-text-secondary">Learn how to use HavticHQ</p>
            </div>
          </Card>
          <Card className="hover:border-primary transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm">FAQs</h3>
              <p className="text-xs text-text-secondary">Answers to common questions</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="md:col-span-2" title="Contact Support">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Message Sent!</h2>
                <p className="text-text-secondary text-sm">Our support team will get back to you within 24 hours.</p>
              </div>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Send another message</Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-tight">Subject</label>
                  <select className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-medium">
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-tight">Urgency</label>
                  <select className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm font-medium">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High (Urgent)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-tight">Message</label>
                <textarea 
                  rows="5"
                  required
                  placeholder="Describe your problem or question in detail..."
                  className="w-full p-4 bg-background border border-border rounded-2xl focus:outline-none focus:border-primary text-sm font-medium resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button variant="primary" type="submit" className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
