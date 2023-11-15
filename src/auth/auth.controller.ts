import {
  Body,
  Controller,
  Post,
  Res,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/shared/decorator/public.decorator';
import { AuthService } from './auth.service';
import { BodySignDto } from './dto/body-sign.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() body: BodySignDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, error } = await this.authService.signInWithPassword(body);

    if (error) {
      throw new UnauthorizedException();
    }

    const {
      session: { refresh_token, expires_at, access_token, token_type },
    } = data;

    response.cookie('refresh_token', refresh_token, {
      maxAge: expires_at,
    });

    return { access_token, token_type };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const { error } = await this.authService.signOut();

    if (error) {
      return new ServiceUnavailableException();
    }

    response.clearCookie('refresh_token');
  }
}
