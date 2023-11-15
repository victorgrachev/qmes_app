import { Expose, Type } from 'class-transformer';
import { UserEntity } from 'src/shared/entity/user.entity';
import { ChatEntity } from '../../shared/entity/chat.entity';

export class ChatParticipant {
  @Expose()
  @Type(() => ChatEntity)
  chat: ChatEntity;

  @Expose()
  @Type(() => UserEntity)
  participants: UserEntity[];

  constructor(partial: Partial<ChatParticipant>) {
    Object.assign(this, partial);
  }
}
