import { Expose, Type } from 'class-transformer';

export class User {
  @Expose()
  id: number;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @Expose()
  @Type(() => Date)
  birthday: Date;

  @Expose()
  gender: 'male' | 'female';

  @Expose()
  iqs: string;

  constructor(partial: Partial<User>) {
    Object.assign({}, partial);
  }
}
