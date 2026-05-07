import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';
import { Client, ClientDocument } from '../clients/schemas/client.schema';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(userId: string, invoiceData: any): Promise<InvoiceDocument> {
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const createdInvoice = new this.invoiceModel({ ...invoiceData, userId, totalAmount });
    return createdInvoice.save();
  }

  async findAll(userId: string): Promise<InvoiceDocument[]> {
    return this.invoiceModel.find({ userId: userId as any }).populate('clientId').exec();
  }

  async findOne(id: string, userId: string): Promise<InvoiceDocument | null> {
    return this.invoiceModel.findOne({ _id: id, userId: userId as any } as any).populate('clientId').exec();
  }

  async update(id: string, userId: string, updateData: any): Promise<InvoiceDocument | null> {
    if (updateData.items) {
      updateData.totalAmount = updateData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
    return this.invoiceModel.findOneAndUpdate({ _id: id, userId: userId as any } as any, updateData, { new: true }).exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    return this.invoiceModel.deleteOne({ _id: id, userId: userId as any } as any).exec();
  }

  async parseAIInput(input: string) {
    const lines = input.split(/[,\n]/);
    const items = lines.map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;

      const priceMatch = trimmedLine.match(/(\$?\d+(\.\d+)?)/);
      if (priceMatch) {
        const priceStr = priceMatch[0];
        const price = parseFloat(priceStr.replace('$', ''));
        const description = trimmedLine.replace(priceStr, '').trim();
        return { description: description || 'Unnamed Item', quantity: 1, price };
      }
      return null;
    }).filter(item => item !== null);

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { items, totalAmount };
  }

  async getStats(userId: string) {
    const [invoices, clientCount] = await Promise.all([
      this.invoiceModel.find({ userId: userId as any }).exec(),
      this.clientModel.countDocuments({ userId: userId as any }).exec(),
    ]);
    
    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.totalAmount, 0);
    const pendingAmount = invoices.filter(i => i.status !== 'paid').reduce((acc, i) => acc + i.totalAmount, 0);
    
    const paidCount = invoices.filter(i => i.status === 'paid').length;
    const unpaidCount = invoices.filter(i => i.status !== 'paid').length;
    const invoiceCount = invoices.length;

    const monthlyRevenue: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      const monthRevenue = invoices
        .filter(inv => inv.status === 'paid' && new Date((inv as any).createdAt).getMonth() === d.getMonth())
        .reduce((acc, inv) => acc + inv.totalAmount, 0);
      monthlyRevenue.push({ name: monthName, revenue: monthRevenue });
    }

    return {
      totalRevenue,
      pendingAmount,
      paidCount,
      unpaidCount,
      invoiceCount,
      clientCount,
      monthlyRevenue,
    };
  }
}
