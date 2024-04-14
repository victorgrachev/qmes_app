import { Expose } from 'class-transformer';

export class BodyAddParticipantDto {
  @Expose()
  chatId: string;

  @Expose()
  usersIqs: string[];
}
