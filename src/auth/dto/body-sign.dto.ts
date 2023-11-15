import { Expose } from 'class-transformer';

export class BodySignDto {
  @Expose()
  email: string;

  @Expose()
  password: string;
}
