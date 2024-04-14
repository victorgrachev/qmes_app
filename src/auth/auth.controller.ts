import {
  Controller,
  Post,
  Req,
  Res,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    response.cookie('refresh_token', req.user.refresh_token, {
      maxAge: req.user.expires_at,
    });

    console.log(req);

    return {
      access_token: req.user.access_token,
      token_type: req.user.token_type,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const { error } = await this.authService.signOut();

    if (error) {
      throw new ServiceUnavailableException();
    }

    response.clearCookie('refresh_token');
  }
}
