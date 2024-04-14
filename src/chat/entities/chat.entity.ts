import { Expose, Type } from 'class-transformer';

export class ChatEntity {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  type: 'single' | 'group';

  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }
}
