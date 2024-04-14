import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private supabaseService: SupabaseService) {}

  async save(user: CreateUserDto) {
    const supabase = this.supabaseService.getClient();

    const { data } = await supabase
      .from('user')
      .insert([
        {
          birthday: user.birthday.toDateString(),
          first_name: user.firstName,
          last_name: user.lastName,
          gender: user.gender,
          iqs: Date.now().toString(),
        },
      ])
      .select()
      .single()
      .throwOnError();

    const { error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: { data: { user_info_id: data.id } },
    });

    if (error) {
      await supabase.from('user').delete().eq('id', data.id);
      throw error;
    }

    return plainToInstance(User, data, { excludeExtraneousValues: true });
  }

  async update(user: UpdateUserDto, id: number) {
    const supabase = this.supabaseService.getClient();

    const updateUser: any = {
      ...user,
    };

    if (Reflect.has(updateUser, 'firstName') && updateUser.firstName) {
      Reflect.set(updateUser, 'first_name', user.firstName);
      Reflect.deleteProperty(updateUser, 'firstName');
    }

    if (Reflect.has(updateUser, 'lastName') && updateUser.lastName) {
      Reflect.set(updateUser, 'last_name', user.lastName);
      Reflect.deleteProperty(updateUser, 'lastName');
    }

    if (Reflect.has(updateUser, 'birthday') && updateUser.birthday) {
      Reflect.set(updateUser, 'birthday', user.birthday.toDateString());
      Reflect.deleteProperty(updateUser, 'birthday');
    }

    const { data } = await supabase
      .from('user')
      .update(updateUser)
      .eq('id', id)
      .select()
      .single()
      .throwOnError();

    return plainToInstance(User, data, { excludeExtraneousValues: true });
  }
}
