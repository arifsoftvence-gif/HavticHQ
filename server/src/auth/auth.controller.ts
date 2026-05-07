import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: any) {
    return this.authService.signup(userData);
  }

  @Post('login')
  async login(@Body() credentials: any) {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
