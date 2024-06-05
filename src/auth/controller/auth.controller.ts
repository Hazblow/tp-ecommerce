import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Post, UseGuards,
} from '@nestjs/common';
import { AuthService } from '../use-case/auth.service';
import { AuthGuard } from '../auth.guard';
import { CurrentUser } from '../user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
