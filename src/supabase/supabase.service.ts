import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserEntity } from 'src/shared/entity/user.entity';
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

  async getCurrentUser() {
    const {
      data: {
        user: { user_metadata },
      },
    } = await this.client.auth.getUser();

    const { data } = await this.client
      .from('user')
      .select('*')
      .eq('id', user_metadata.user_info_id)
      .single();

    return new UserEntity({
      id: data.id,
      createdAt: new Date(data.created_at),
      firstName: data.first_name,
      lastName: data.last_name,
      birthday: new Date(data.birthday),
      gender: data.gender,
      iqs: data.iqs,
    });
  }
}
