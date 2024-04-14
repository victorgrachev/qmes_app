import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const {
      data: {
        session: { refresh_token, expires_at, access_token, token_type },
      },
      error,
    } = await this.authService.signIn(email, password);

    if (!access_token || error) {
      throw new UnauthorizedException();
    }

    return { refresh_token, expires_at, access_token, token_type };
  }
}
