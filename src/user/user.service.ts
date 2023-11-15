import { Injectable } from '@nestjs/common';
import { initSecrets } from 'src/shared/crypt';
import { UserEntity } from 'src/shared/entity/user.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { BodyUser } from 'src/user/dto/body-create-user.dto';

@Injectable()
export class UserService {
  constructor(private supabaseService: SupabaseService) {}

  async createUser({
    birthday,
    firstName,
    lastName,
    gender,
    email,
    password,
  }: BodyUser) {
    const supabase = this.supabaseService.getClient();

    const { data } = await supabase
      .from('user')
      .insert([
        {
          birthday,
          first_name: firstName,
          last_name: lastName,
          gender,
          iqs: Date.now().toString(),
        },
      ])
      .select()
      .single();

    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { user_info_id: data[0].id } },
    });

    if (error) {
      await supabase.from('user').delete().eq('id', data[0].id);
      throw error;
    }

    initSecrets(user);

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
