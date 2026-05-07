import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('subscribe')
  async subscribe(@Request() req, @Body('planType') planType: string) {
    return this.subscriptionsService.create(req.user.id || req.user._id, planType);
  }
}
