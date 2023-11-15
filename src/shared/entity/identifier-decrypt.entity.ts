import { Transform } from 'class-transformer';
import { decrypt } from 'src/shared/crypt';

export class IdentifierDecrypt {
  @Transform(({ value }) => decrypt(value))
  id: number;
}
