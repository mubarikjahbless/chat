import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser, Public } from '../../common/decorators';
import { AuthService } from './auth.service';
import { User } from '../../common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() credentials) {
    return await this.authService.login(credentials);
  }

  @Post('logout')
  async logout(@CurrentUser() user) {
    return this.authService.logout(user);
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() signUp: User) {
    return this.authService.createUser(signUp);
  }

  @Get('users')
  @Public()
  async getAllUser() {
    return await this.authService.getUsers();
  }
}
