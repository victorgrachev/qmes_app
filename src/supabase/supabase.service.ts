import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.entity';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {}

  getClient() {
    if (this.client) {
      return this.client;
    }

    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    this.client = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    return this.client;
  }
}
