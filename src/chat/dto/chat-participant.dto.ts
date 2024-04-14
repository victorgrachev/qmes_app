import { Expose, Type } from 'class-transformer';
import { ChatDto } from './chat.dto';
import { ParticipantDto } from './participant.dto';

export class ChatParticipantDto extends ChatDto {
  @Expose()
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];

  constructor(partial: Partial<ChatParticipantDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
