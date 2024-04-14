import { Expose } from 'class-transformer';

export class BodyCreateChatDto {
  @Expose()
  type: string;

  @Expose()
  iqs: string;

  @Expose()
  name: string;
}
