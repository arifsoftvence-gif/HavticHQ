import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Download, 
  Trash2, 
  Eye,
  Loader2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
  MoreVertical,
  X,
  ArrowUpRight,
  Filter,
  Edit2
} from 'lucide-react';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ConfirmModal from '../components/ConfirmModal';

const Invoices = () => {
  const { t } = useLanguage();
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, id: null });
  const [aiInput, setAIInput] = useState('');
  const [aiParsing, setAIParsing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [formData, setFormData] = useState({
    clientId: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const fetchData = async () => {
    try {
      const [invRes, clientRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/clients')
      ]);
      setInvoices(invRes.data);
      setClients(clientRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAIParse = async () => {
    setAIParsing(true);
    try {
      const { data } = await api.post('/invoices/ai-parse', { input: aiInput });
      setFormData({
        ...formData,
        items: data.items.length > 0 ? data.items : formData.items
      });
      setIsAIModalOpen(false);
      setIsModalOpen(true);
      setAIInput('');
    } catch (err) {
      setIsAIModalOpen(false);
      setIsModalOpen(true);
    } finally {
      setAIParsing(false);
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'description' ? value : parseFloat(value) || 0;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInvoice) {
        await api.put(`/invoices/${editingInvoice._id}`, formData);
      } else {
        await api.post('/invoices', formData);
      }
      setIsModalOpen(false);
      setEditingInvoice(null);
      setFormData({
        clientId: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      clientId: invoice.clientId?._id || invoice.clientId,
      items: invoice.items,
      dueDate: new Date(invoice.dueDate).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/invoices/${confirmConfig.id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      paid: 'success',
      sent: 'primary',
      draft: 'neutral',
      overdue: 'danger',
    };
    return <Badge variant={variants[status] || 'neutral'}>{status.toUpperCase()}</Badge>;
  };

  const exportPDF = (invoice) => {
    setExporting(true);
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(30, 91, 255);
      doc.text('HavticHQ Inc.', 20, 20);
      
      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(`Invoice ID: ${invoice._id}`, 20, 30);
      doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 35);
      doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, 40);
      
      doc.text('Bill To:', 20, 55);
      doc.setFontSize(12);
      doc.text(invoice.clientId?.name || 'N/A', 20, 62);
      doc.setFontSize(10);
      doc.text(invoice.clientId?.email || '', 20, 67);
      
      const tableData = invoice.items.map(item => [
        item.description,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.quantity * item.price).toFixed(2)}`
      ]);
      
      autoTable(doc, {
        startY: 80,
        head: [['Description', 'Qty', 'Price', 'Total']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 91, 255] }
      });
      
      const finalY = doc.lastAutoTable.finalY;
      doc.setFontSize(12);
      doc.text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`, 140, finalY + 20);
      doc.save(`invoice-${invoice._id.slice(-6)}.pdf`);
    } catch (err) {
      console.error('PDF Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv._id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         inv.clientId?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="hover:text-primary cursor-pointer">{t('dashboard')}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">{t('invoices')}</span>
        </nav>
        <div className="flex gap-3">
          <Button onClick={() => { setEditingInvoice(null); setFormData({ clientId: '', items: [{ description: '', quantity: 1, price: 0 }], dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }); setIsModalOpen(true); }} className="gap-2">
            <Plus className="w-4 h-4" /> {t('manual_invoice')}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-secondary" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-xl px-3 py-2 text-sm font-bold text-text-secondary focus:border-primary outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="sent">Sent</option>
            <option value="draft">Draft</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <Card title={t('invoices_list')} subtitle={t('track_manage_billings')}>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-y border-border">
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('invoice_id')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('client')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('amount')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('due_date')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-[10px] font-bold text-text-secondary uppercase tracking-wider text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-text-secondary font-medium">
                    {t('no_invoices_found')}
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary">#{invoice._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-text-secondary uppercase">
                          {invoice.clientId?.name?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-text-primary">{invoice.clientId?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-text-primary">${invoice.totalAmount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => exportPDF(invoice)} className="opacity-0 group-hover:opacity-100" title="Download PDF"><Download className="w-4 h-4" /></Button>
                        <Link to={`/invoices/${invoice._id}`}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100" title="View Details"><Eye className="w-4 h-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(invoice)} className="opacity-0 group-hover:opacity-100" title="Edit"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmConfig({ isOpen: true, id: invoice._id })} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></Button>
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
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
      />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-surface border border-border rounded-2xl p-8 shadow-2xl w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-text-primary">{editingInvoice ? 'Edit Invoice' : t('manual_invoice')}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('select_client')} <span className="text-red-500">*</span></label>
                    <select 
                      required 
                      value={formData.clientId} 
                      onChange={(e) => setFormData({...formData, clientId: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium"
                    >
                      <option value="">{t('select_a_client')}</option>
                      {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('due_date')} <span className="text-red-500">*</span></label>
                    <input 
                      type="date" required 
                      value={formData.dueDate} 
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none transition-all text-sm font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">{t('invoice_items')}</label>
                    <Button type="button" variant="ghost" size="sm" onClick={handleAddItem} className="text-primary hover:bg-primary/5 gap-1">
                      <Plus className="w-3.5 h-3.5" /> {t('add_item')}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-start bg-slate-50 p-3 rounded-lg border border-border">
                        <div className="col-span-6">
                          <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">{t('description')}</label>
                          <input type="text" placeholder="Service description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full bg-white border border-border rounded px-3 py-1.5 text-sm focus:border-primary outline-none" required />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">{t('qty')}</label>
                          <input type="number" placeholder="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-full bg-white border border-border rounded px-3 py-1.5 text-sm focus:border-primary outline-none" required />
                        </div>
                        <div className="col-span-3">
                          <label className="text-[10px] font-bold text-text-secondary uppercase mb-1 block">{t('price')}</label>
                          <input type="number" placeholder="0.00" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="w-full bg-white border border-border rounded px-3 py-1.5 text-sm focus:border-primary outline-none" required />
                        </div>
                        <div className="col-span-1 pt-6">
                          <button type="button" onClick={() => handleRemoveItem(index)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-border">
                  <div className="bg-primary/5 px-6 py-3 rounded-xl border border-primary/10">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{t('total_amount')}</p>
                    <h3 className="text-3xl font-bold text-primary">${formData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</h3>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="px-8">{t('cancel')}</Button>
                    <Button type="submit" className="px-10">{editingInvoice ? 'Update Invoice' : t('save_invoice')}</Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Invoices;
