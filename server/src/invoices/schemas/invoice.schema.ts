import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class InvoiceItem {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  clientId: MongooseSchema.Types.ObjectId;

  @Prop({ type: [InvoiceItem], required: true })
  items: InvoiceItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'draft' })
  status: string; // draft, sent, paid, overdue

  @Prop({ required: true })
  dueDate: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
