import { Module } from '@nestjs/common/';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  imports: [SupabaseModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
