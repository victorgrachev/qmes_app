import { ApiProperty } from '@nestjs/swagger';

export class ChatSendMessageBodyDto {
  @ApiProperty({ description: 'Сообщение' })
  message: string;
}
