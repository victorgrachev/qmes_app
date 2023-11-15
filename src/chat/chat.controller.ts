import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { BodyAddParticipant } from 'src/chat/dto/body-add-participant.dto';
import { ChatService } from './chat.service';
import { BodyCreateChat } from './dto/body-create-chat.dto';

@Controller('chat')
@SerializeOptions({ excludeExtraneousValues: true })
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  createChat(@Body() { type, iqs, name }: BodyCreateChat) {
    if (type === 'single') {
      return this.chatService.createSingleChat(iqs);
    }

    return this.chatService.createChat(name);
  }

  @Post('add-participant')
  addParticipantToChat(@Body() { chatId, usersIqs }: BodyAddParticipant) {
    this.chatService.addParticipants(chatId, usersIqs);
  }

  @Get('get-chats')
  getChats() {
    return this.chatService.getChats();
  }
}
