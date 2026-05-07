import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TrialGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    // Admin bypass
    if (user.role === 'admin') return true;

    // Check if subscription is active
    if (user.subscriptionStatus === 'active') return true;

    // Check if trial is still valid
    const now = new Date();
    const trialEndsAt = new Date(user.trialEndsAt);

    if (now > trialEndsAt) {
      throw new ForbiddenException('Trial expired. Please subscribe to continue.');
    }

    return true;
  }
}
