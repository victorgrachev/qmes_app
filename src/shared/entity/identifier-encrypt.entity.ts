import { Expose, Transform } from 'class-transformer';
import { encrypt } from 'src/shared/crypt';

export class IdentifierEncrypt {
  @Expose()
  @Transform(({ value }) => encrypt(value))
  id: number;

  constructor(partial: Partial<IdentifierEncrypt>) {
    Object.assign(this, partial);
  }
}
