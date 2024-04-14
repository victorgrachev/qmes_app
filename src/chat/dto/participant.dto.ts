import { Expose, Type } from 'class-transformer';

export class ParticipantDto {
  @Expose()
  id: string;

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

  constructor(partial: Partial<ParticipantDto>) {
    Object.assign(this, partial);
  }
}
