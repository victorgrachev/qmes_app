import { Injectable } from '@nestjs/common';
import { ChatEntity } from 'src/shared/entity/chat.entity';
import { UserEntity } from 'src/shared/entity/user.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ChatParticipant } from './dto/chat-participant.dto';

@Injectable()
export class ChatService {
  constructor(private supabaseService: SupabaseService) {}

  async createChat(name: string) {
    const supabase = this.supabaseService.getClient();
    const currentUser = await this.supabaseService.getCurrentUser();

    const { data } = await supabase
      .from('chat')
      .insert([{ name, type: 'group' }])
      .select()
      .single();

    await supabase
      .from('participant_chat')
      .insert([{ chat_id: data.id, user_id: currentUser.id }]);

    return new ChatEntity({
      createdAt: new Date(data.created_at),
      id: data.id,
      name: data.name,
      type: data.type,
    });
  }

  async createSingleChat(iqs: string) {
    const supabase = this.supabaseService.getClient();
    const currentUser = await this.supabaseService.getCurrentUser();

    const { data: user } = await supabase
      .from('user')
      .select('first_name, last_name, id')
      .eq('iqs', iqs)
      .single();

    const { data } = await supabase
      .from('chat')
      .insert([
        { name: `${user.first_name} ${user.last_name}`, type: 'single' },
      ])
      .select()
      .single();

    await supabase.from('participant_chat').insert([
      { chat_id: data.id, user_id: user.id },
      { chat_id: data.id, user_id: currentUser.id },
    ]);

    return new ChatEntity({
      createdAt: new Date(data.created_at),
      id: data.id,
      name: data.name,
      type: data.type,
    });
  }

  async addParticipants(chatId: number, usersIqs: string[]) {
    const supabase = this.supabaseService.getClient();

    const { data: usersId } = await supabase
      .from('user')
      .select('id')
      .in('iqs', usersIqs);

    const { data: usersIdChat } = await supabase
      .from('participant_chat')
      .select('user_id')
      .eq('chat_id', chatId);

    const newParticipants = usersId.filter(
      ({ id }) => !usersIdChat.some(({ user_id }) => user_id === id),
    );

    if (newParticipants.length > 0) {
      await supabase
        .from('participant_chat')
        .insert(usersId.map(({ id }) => ({ chat_id: chatId, user_id: id })));
    }
  }

  async getChats() {
    const supabase = this.supabaseService.getClient();
    const currentUser = await this.supabaseService.getCurrentUser();

    const { data: chats } = await supabase
      .from('participant_chat')
      .select('chat (*)')
      .eq('user_id', currentUser.id);

    const resultChats: ChatParticipant[] = [];

    for (const { chat } of chats) {
      const chatInfo = Array.isArray(chat) ? chat[0] : chat;
      const resultChat = new ChatParticipant({
        chat: {
          id: chatInfo.id,
          createdAt: new Date(chatInfo.created_at),
          name: chatInfo.name,
          type: chatInfo.type,
        },
        participants: [],
      });

      const { data: participants } = await supabase
        .from('participant_chat')
        .select('user (*)')
        .eq('chat_id', chatInfo.id);

      resultChat.participants.push(
        ...participants.map(({ user }) => {
          const userInfo = Array.isArray(user) ? user[0] : user;

          return new UserEntity({
            id: userInfo.id,
            createdAt: new Date(userInfo.created_at),
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            iqs: userInfo.iqs,
            birthday: new Date(userInfo.birthday),
            gender: userInfo.gender,
          });
        }),
      );

      resultChats.push(resultChat);
    }

    return resultChats;
  }
}
