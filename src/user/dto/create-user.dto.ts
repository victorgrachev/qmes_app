import { Expose, Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsNotEmpty()
  birthday: Date;

  @Expose()
  @IsNotEmpty()
  gender: 'male' | 'female';

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
