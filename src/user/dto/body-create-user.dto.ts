import { Expose } from 'class-transformer';

export class BodyUser {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  birthday: string;

  @Expose()
  gender: 'male' | 'female';

  @Expose()
  email: string;

  @Expose()
  password: string;
}
