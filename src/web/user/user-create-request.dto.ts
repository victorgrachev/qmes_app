import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDtoRequest {
  @ApiProperty({ description: 'Имя пользователя' })
  username: string;

  @ApiProperty({
    description:
      'Идентификатор чата, участником которого является пользователь',
  })
  chatExternalId: string;
}
