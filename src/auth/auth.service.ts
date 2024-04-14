import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  signIn(email: string, password: string) {
    const supabase = this.supabaseService.getClient();
    return supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    const supabase = this.supabaseService.getClient();

    return supabase.auth.signOut();
  }
}
