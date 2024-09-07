import { ApiProperty } from '@nestjs/swagger';

export class UserCreateResponseDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  username: string;
}
