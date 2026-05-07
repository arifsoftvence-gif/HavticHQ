import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    private usersService: UsersService,
  ) { }

  async create(userId: string, planType: string): Promise<SubscriptionDocument> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month plans by default

    const createdSubscription = new this.subscriptionModel({
      userId,
      planType,
      startDate,
      endDate,
      status: 'active',
    });

    await this.usersService.update(userId, {
      subscriptionStatus: 'active',
    });

    return createdSubscription.save();
  }

  async findActive(userId: string): Promise<SubscriptionDocument | null> {
    return this.subscriptionModel.findOne({ userId, status: 'active' } as any).exec();
  }
}
