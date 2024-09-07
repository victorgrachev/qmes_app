import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  username: string;
}

export class ChatCreateResponseDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Идентификатор' })
  externalId: string;

  @ApiProperty({ description: 'Участники', type: [User] })
  participants: User[];
}
