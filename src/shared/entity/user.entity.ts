import { Expose, Type } from 'class-transformer';
import { IdentifierEncrypt } from './identifier-encrypt.entity';

export class UserEntity extends IdentifierEncrypt {
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  iqs: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  @Type(() => Date)
  birthday: Date;

  @Expose()
  gender: string;

  constructor(partial: Partial<UserEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
