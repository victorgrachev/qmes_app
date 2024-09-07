import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Имя пользователя' })
  username: string;
}

class Message {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Создатель', type: User })
  creator: User;

  @ApiProperty({ description: 'Сообщение' })
  message: string;
}

export class SignInDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'Идентификатор' })
  externalId: string;

  @ApiProperty({
    description: 'Участники',
    type: [User],
  })
  participants: User[];

  @ApiProperty({ description: 'Сообщения', type: [Message] })
  messages: Message[];
}
