import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { SupabaseService } from 'src/supabase/supabase.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-supabase') {
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

    if (!user?.user_metadata?.user_info_id || error) {
      throw new UnauthorizedException();
    }

    const { data } = await supabase
      .from('user')
      .select()
      .eq('id', user.user_metadata.user_info_id)
      .single();

    return plainToInstance(User, data, { excludeExtraneousValues: true });
  }
}
