import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) })
  trialEndsAt: Date;

  @Prop({ default: 'trialing' })
  subscriptionStatus: string; // trialing, active, expired, cancelled
}

export const UserSchema = SchemaFactory.createForClass(User);
