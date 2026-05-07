import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Mail, 
  Phone, 
  MapPin,
  Trash2,
  Edit2,
  Loader2,
  ChevronRight,
  MoreVertical,
  X,
  Camera,
  Search
} from 'lucide-react';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ConfirmModal from '../components/ConfirmModal';

const Clients = () => {
  const { t } = useLanguage();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Confirm Modal State
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, id: null });

  const fetchClients = async () => {
    try {
      const { data } = await api.get('/clients');
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingClient) {
        await api.put(`/clients/${editingClient._id}`, formData);
      } else {
        await api.post('/clients', formData);
      }
      setIsModalOpen(false);
      setEditingClient(null);
      setFormData({ name: '', email: '', phone: '', address: '' });
      fetchClients();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/clients/${confirmConfig.id}`);
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone || '',
      address: client.address || ''
    });
    setIsModalOpen(true);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('clients')}</span>
        </nav>
        <Button onClick={() => { setEditingClient(null); setFormData({ name: '', email: '', phone: '', address: '' }); setIsModalOpen(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> {t('new_client')}
        </Button>
      </div>

      <div className="bg-surface p-4 rounded-2xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <Card title={t('all_clients_title')} subtitle={t('manage_relationships')}>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-border">
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('client_name')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('contact_info')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-text-secondary font-medium">
                    No clients found. Add your first client to get started!
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm uppercase">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">{client.name}</p>
                          <p className="text-xs text-text-secondary">{client.address || 'No address'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-text-secondary" /> {client.email}
                        </p>
                        {client.phone && (
                          <p className="text-xs text-text-secondary flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" /> {client.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success">{t('active')}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(client)} className="opacity-0 group-hover:opacity-100" title="Edit"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmConfig({ isOpen: true, id: client._id })} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4 text-text-secondary" /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? All associated data will be removed."
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-surface border border-border rounded-2xl p-8 shadow-2xl w-full max-w-xl relative z-10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-text-primary">{editingClient ? 'Edit Client' : t('add_new_client')}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!editingClient && (
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-border flex items-center justify-center text-text-secondary group-hover:border-primary transition-colors">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{t('client_logo_optional')}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('client_name')} <span className="text-red-500">*</span></label>
                    <input 
                      type="text" required 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('contact_info')} (Email) <span className="text-red-500">*</span></label>
                    <input 
                      type="email" required 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('phone_number')}</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium" 
                      placeholder="+1 234 567 890" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('address')}</label>
                    <input 
                      type="text" 
                      value={formData.address} 
                      onChange={(e) => setFormData({...formData, address: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium" 
                      placeholder="New York, USA" 
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-border">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">{t('cancel')}</Button>
                  <Button type="submit" disabled={submitting} className="flex-1">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('save_client')}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Clients;
