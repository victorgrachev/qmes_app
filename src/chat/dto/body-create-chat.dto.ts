import { Expose } from 'class-transformer';

export class BodyCreateChat {
  @Expose()
  type: string;

  @Expose()
  iqs: string;

  @Expose()
  name: string;
}
