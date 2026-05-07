import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(userId: string, clientData: any): Promise<ClientDocument> {
    const createdClient = new this.clientModel({ ...clientData, userId });
    return createdClient.save();
  }

  async findAll(userId: string): Promise<ClientDocument[]> {
    return this.clientModel.find({ userId: userId as any }).exec();
  }

  async findOne(id: string, userId: string): Promise<ClientDocument | null> {
    return this.clientModel.findOne({ _id: id, userId: userId as any } as any).exec();
  }

  async update(id: string, userId: string, updateData: any): Promise<ClientDocument | null> {
    return this.clientModel.findOneAndUpdate({ _id: id, userId: userId as any } as any, updateData, { new: true }).exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    return this.clientModel.deleteOne({ _id: id, userId: userId as any } as any).exec();
  }
}
