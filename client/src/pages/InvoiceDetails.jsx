import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Mail, 
  ArrowLeft,
  Loader2,
  FileText
} from 'lucide-react';
import api from '../api';
import { useLanguage } from '../context/LanguageContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const InvoiceDetails = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const { data } = await api.get(`/invoices/${id}`);
        setInvoice(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portal/checkout/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportPDF = (isPrint = false) => {
    if (!invoice) return;
    setExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add Company Info
      doc.setFontSize(20);
      doc.setTextColor(30, 91, 255); // Primary color
      doc.text('HavticHQ Inc.', 20, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('123 Business St, New York, NY 10001', 20, 28);
      doc.text('support@havtichq.com', 20, 33);
      
      doc.setTextColor(0);
      doc.setFontSize(24);
      doc.text('INVOICE', 140, 25);
      doc.setFontSize(10);
      doc.text(`#${invoice._id.slice(-6).toUpperCase()}`, 140, 32);
      
      // Divider
      doc.setDrawColor(230);
      doc.line(20, 45, 190, 45);
      
      // Client Info
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('BILL TO:', 20, 55);
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.text(invoice.clientId?.name || 'N/A', 20, 62);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(invoice.clientId?.email || '', 20, 68);
      doc.text(invoice.clientId?.address || '', 20, 73);
      
      // Invoice Dates
      doc.text('ISSUE DATE:', 140, 55);
      doc.setTextColor(0);
      doc.text(new Date(invoice.createdAt).toLocaleDateString(), 140, 62);
      doc.setTextColor(100);
      doc.text('DUE DATE:', 140, 70);
      doc.setTextColor(30, 91, 255);
      doc.text(new Date(invoice.dueDate).toLocaleDateString(), 140, 77);
      
      const tableData = invoice.items.map(item => [
        item.description,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.quantity * item.price).toFixed(2)}`
      ]);
      
      autoTable(doc, {
        startY: 90,
        head: [['Description', 'Qty', 'Price', 'Total']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 91, 255] },
        styles: { fontSize: 9 }
      });
      
      const finalY = doc.lastAutoTable.finalY;
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text('Total Amount:', 130, finalY + 20);
      doc.setTextColor(30, 91, 255);
      doc.text(`$${invoice.totalAmount.toFixed(2)}`, 170, finalY + 20);
      
      if (isPrint) {
        doc.autoPrint();
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.print();
        } else {
          // If popup is blocked, just save it
          doc.save(`invoice-${invoice._id.slice(-6)}.pdf`);
        }
      } else {
        doc.save(`invoice-${invoice._id.slice(-6)}.pdf`);
      }
    } catch (error) {
      console.error('PDF Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!invoice) return (
    <div className="text-center py-12">
      <p className="text-text-secondary font-medium">Invoice not found.</p>
      <Link to="/invoices" className="text-primary hover:underline mt-4 inline-block">Back to Invoices</Link>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary cursor-pointer">{t('dashboard')}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/invoices" className="hover:text-primary cursor-pointer">{t('invoices')}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary font-bold">#{invoice._id.slice(-6).toUpperCase()}</span>
        </nav>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => exportPDF(true)} disabled={exporting} className="gap-2">
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />} {t('print')}
          </Button>
          <Button onClick={() => exportPDF(false)} disabled={exporting} className="gap-2">
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} {t('download')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6">H</div>
                  <h2 className="text-2xl font-black text-text-primary">HavticHQ Inc.</h2>
                  <p className="text-sm text-text-secondary font-medium">123 Business St, New York, NY 10001</p>
                  <p className="text-sm text-text-secondary font-medium">support@havtichq.com</p>
                </div>
                <div className="text-right">
                  <h1 className="text-4xl font-black text-text-primary uppercase tracking-tighter mb-2">Invoice</h1>
                  <p className="text-sm font-bold text-text-secondary uppercase">#{invoice._id.slice(-6).toUpperCase()}</p>
                  <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'} className="mt-4 px-4 py-1 uppercase">{invoice.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 mb-16 pb-12 border-b border-border">
                <div>
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">{t('client')}:</p>
                  <h4 className="text-lg font-bold text-text-primary">{invoice.clientId?.name}</h4>
                  <p className="text-sm text-text-secondary font-medium">{invoice.clientId?.address || 'No address provided'}</p>
                  <p className="text-sm text-text-secondary font-medium">{invoice.clientId?.email}</p>
                </div>
                <div className="text-right">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Issue Date:</p>
                      <p className="text-sm font-bold text-text-primary">{new Date(invoice.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">{t('due_date')}:</p>
                      <p className="text-sm font-bold text-primary">{new Date(invoice.dueDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b-2 border-text-primary">
                    <th className="py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-left">{t('description')}</th>
                    <th className="py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">{t('qty')}</th>
                    <th className="py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">{t('price')}</th>
                    <th className="py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">{t('amount')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-6 text-sm font-bold text-text-primary">{item.description}</td>
                      <td className="py-6 text-sm font-medium text-text-secondary text-right">{item.quantity}</td>
                      <td className="py-6 text-sm font-medium text-text-secondary text-right">${item.price.toFixed(2)}</td>
                      <td className="py-6 text-sm font-bold text-text-primary text-right">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ml-auto w-full max-w-xs space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary font-bold uppercase">Subtotal</span>
                  <span className="text-text-primary font-bold">${invoice.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary font-bold uppercase">Tax (0%)</span>
                  <span className="text-text-primary font-bold">$0.00</span>
                </div>
                <div className="flex justify-between items-center py-4 px-6 bg-slate-50 border border-border rounded-xl mt-4">
                  <span className="text-xs font-black text-text-secondary uppercase tracking-widest">{t('total_amount')}</span>
                  <span className="text-2xl font-black text-primary">${invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-20 pt-12 border-t border-border">
                <p className="text-xs text-text-secondary font-medium leading-relaxed italic text-center">
                  Thank you for your business. Please make payment by the due date to avoid service interruption.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Payment Link">
            <div className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                  <Copy className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Share with client</p>
                  <p className="text-xs font-bold text-text-primary truncate">havtichq.com/portal/checkout/{invoice._id}</p>
                </div>
              </div>
              <Button onClick={handleCopyLink} variant={copied ? 'secondary' : 'primary'} className="w-full gap-2 font-bold uppercase tracking-widest text-xs py-3">
                {copied ? <><Check className="w-4 h-4" /> Link Copied</> : <><Copy className="w-4 h-4" /> Copy Link</>}
              </Button>
            </div>
          </Card>

          <Card title="Invoice History">
            <div className="space-y-4">
              {[
                { event: 'Invoice Created', date: new Date(invoice.createdAt).toLocaleDateString(), time: new Date(invoice.createdAt).toLocaleTimeString(), icon: FileText },
                { event: 'Email Sent to Client', date: new Date(invoice.createdAt).toLocaleDateString(), time: new Date(invoice.createdAt).toLocaleTimeString(), icon: Mail },
                { event: 'Invoice Viewed', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), icon: Check },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < 2 && <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />}
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-border flex items-center justify-center shrink-0 relative z-10">
                    <log.icon className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">{log.event}</p>
                    <p className="text-[10px] text-text-secondary font-medium">{log.date} at {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
