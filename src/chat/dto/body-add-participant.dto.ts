import { Expose, Transform } from 'class-transformer';
import { decrypt } from 'src/shared/crypt';

export class BodyAddParticipant {
  @Expose()
  @Transform(({ value }) => decrypt(value))
  chatId: number;

  @Expose()
  usersIqs: string[];
}
