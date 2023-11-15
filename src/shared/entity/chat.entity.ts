import { Expose, Type } from 'class-transformer';
import { IdentifierEncrypt } from 'src/shared/entity/identifier-encrypt.entity';

export class ChatEntity extends IdentifierEncrypt {
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  type: 'single' | 'group';

  constructor(partial: Partial<ChatEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
