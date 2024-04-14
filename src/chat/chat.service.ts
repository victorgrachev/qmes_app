// import { Injectable } from '@nestjs/common';
// import { EncryptService } from 'src/encrypt/encrypt.service';
// import { SupabaseService } from 'src/supabase/supabase.service';
// // import { UserEntity } from 'src/user/entities/user.entity';
// import { ChatMapper } from './chat.mapper';
// import { ChatEntity } from './entities/chat.entity';

// @Injectable()
// export class ChatService {
//   constructor(
//     private supabaseService: SupabaseService,
//     private chatMapper: ChatMapper,
//     private encryptService: EncryptService,
//   ) {}

//   create() {}

//   async createChat(name: string) {
//     const supabase = this.supabaseService.getClient();
//     const currentUser = await this.supabaseService.getCurrentUser();

//     const { data } = await supabase
//       .from('chat')
//       .insert([{ name, type: 'group' }])
//       .select()
//       .single();

//     await supabase
//       .from('participant_chat')
//       .insert([{ chat_id: data.id, user_id: currentUser.id }]);

//     return this.chatMapper.mapToChatDto(
//       new ChatEntity({
//         createdAt: new Date(data.created_at),
//         id: data.id,
//         name: data.name,
//         type: data.type,
//       }),
//     );
//   }

//   async createSingleChat(iqs: string) {
//     const supabase = this.supabaseService.getClient();
//     const currentUser = await this.supabaseService.getCurrentUser();

//     const { data: user } = await supabase
//       .from('user')
//       .select('first_name, last_name, id')
//       .eq('iqs', iqs)
//       .single();

//     const { data } = await supabase
//       .from('chat')
//       .insert([
//         { name: `${user.first_name} ${user.last_name}`, type: 'single' },
//       ])
//       .select()
//       .single();

//     await supabase.from('participant_chat').insert([
//       { chat_id: data.id, user_id: user.id },
//       { chat_id: data.id, user_id: currentUser.id },
//     ]);

//     return this.chatMapper.mapToChatDto(
//       new ChatEntity({
//         createdAt: new Date(data.created_at),
//         id: data.id,
//         name: data.name,
//         type: data.type,
//       }),
//     );
//   }

//   async addParticipants(chatId: string, usersIqs: string[]) {
//     const supabase = this.supabaseService.getClient();
//     const decryptChatId = this.encryptService.decrypt(chatId);

//     const { data: usersId } = await supabase
//       .from('user')
//       .select('id')
//       .in('iqs', usersIqs);

//     const { data: usersIdChat } = await supabase
//       .from('participant_chat')
//       .select('user_id')
//       .eq('chat_id', decryptChatId);

//     const newParticipants = usersId.filter(
//       ({ id }) => !usersIdChat.some(({ user_id }) => user_id === id),
//     );

//     if (newParticipants.length > 0) {
//       await supabase
//         .from('participant_chat')
//         .insert(
//           usersId.map(({ id }) => ({ chat_id: decryptChatId, user_id: id })),
//         );
//     }
//   }

//   async getChats() {
//     const supabase = this.supabaseService.getClient();
//     const currentUser = await this.supabaseService.getCurrentUser();

//     const { data: chats } = await supabase
//       .from('participant_chat')
//       .select('chat (*)')
//       .eq('user_id', currentUser.id);

//     const chatsEntity = chats.map(({ chat }) => {
//       const data = Array.isArray(chat) ? chat[0] : chat;

//       return new ChatEntity({
//         createdAt: new Date(data.created_at),
//         id: data.id,
//         name: data.name,
//         type: data.type,
//       });
//     });

//     const chatParticipants = new Map<number, UserEntity[]>();

//     for (const chat of chatsEntity) {
//       const { data: participants } = await supabase
//         .from('participant_chat')
//         .select('user (*)')
//         .eq('chat_id', chat.id);

//       chatParticipants.set(
//         chat.id,
//         participants.map(({ user: data }) => {
//           const user = Array.isArray(data) ? data[0] : data;

//           return new UserEntity({
//             id: user.id,
//             createdAt: new Date(user.created_at),
//             firstName: user.first_name,
//             lastName: user.last_name,
//             birthday: new Date(user.birthday),
//             gender: user.gender,
//             iqs: user.iqs,
//           });
//         }),
//       );
//     }

//     return chatsEntity.map((chat) =>
//       this.chatMapper.mapToChatParticipantsDto(
//         chat,
//         chatParticipants.get(chat.id),
//       ),
//     );
//   }
// }
