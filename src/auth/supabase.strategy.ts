import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { initSecrets } from 'src/shared/crypt';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  constructor(private supabaseService: SupabaseService) {
    super();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async validate(request: Request) {
    const supabase = this.supabaseService.getClient();

    const access_token = this.extractTokenFromHeader(request);
    const refresh_token = request.cookies['refresh_token'];

    const {
      data: { user },
      error,
    } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (!user || error) {
      throw new UnauthorizedException();
    }

    initSecrets(user);

    return user;
  }
}
