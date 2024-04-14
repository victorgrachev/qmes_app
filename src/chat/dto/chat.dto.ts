import { Expose, Type } from 'class-transformer';

export class ChatDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  type: 'single' | 'group';

  constructor(partial: Partial<ChatDto>) {
    Object.assign(this, partial);
  }
}
