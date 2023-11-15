import { Injectable } from '@nestjs/common';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signInWithPassword(credentials: SignInWithPasswordCredentials) {
    const supabase = this.supabaseService.getClient();

    return supabase.auth.signInWithPassword(credentials);
  }

  signOut() {
    const supabase = this.supabaseService.getClient();

    return supabase.auth.signOut();
  }
}
