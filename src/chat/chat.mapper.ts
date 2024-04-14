// import { Injectable } from '@nestjs/common';
// import { EncryptService } from 'src/encrypt/encrypt.service';
// import { UserEntity } from 'src/user/entities/user.entity';
// import { ChatParticipantDto } from './dto/chat-participant.dto';
// import { ChatDto } from './dto/chat.dto';
// import { ParticipantDto } from './dto/participant.dto';
// import { ChatEntity } from './entities/chat.entity';

// @Injectable()
// export class ChatMapper {
//   constructor(private encryptService: EncryptService) {}

//   mapToChatDto({ id, createdAt, name, type }: ChatEntity) {
//     return new ChatDto({
//       id: this.encryptService.encrypt(id),
//       createdAt,
//       name,
//       type,
//     });
//   }

//   mapToChatParticipantsDto(chat: ChatEntity, participants: UserEntity[]) {
//     return new ChatParticipantDto({
//       id: this.encryptService.encrypt(chat.id),
//       createdAt: chat.createdAt,
//       name: chat.name,
//       type: chat.type,
//       participants: participants.map(
//         ({ id, createdAt, birthday, firstName, gender, iqs, lastName }) =>
//           new ParticipantDto({
//             id: this.encryptService.encrypt(id),
//             createdAt,
//             birthday,
//             firstName,
//             gender,
//             iqs,
//             lastName,
//           }),
//       ),
//     });
//   }
// }
