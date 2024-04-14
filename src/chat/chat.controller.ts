// import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
// // import { BodyAddParticipantDto } from 'src/chat/dto/body-add-participant.dto';
// import { ChatService } from './chat.service';
// import { BodyCreateChatDto } from './dto/body-create-chat.dto';

// @Controller('chat')
// @SerializeOptions({ excludeExtraneousValues: true })
// export class ChatController {
//   constructor(private chatService: ChatService) {}

//   @Post('create')
//   create(@Body() { type, iqs, name }: BodyCreateChatDto) {
//     if (type === 'single') {
//       return this.chatService.createSingleChat(iqs);
//     }

//     return this.chatService.createChat(name);
//   }

//   // @Post('add-participant')
//   // addParticipantToChat(@Body() { chatId, usersIqs }: BodyAddParticipantDto) {
//   //   this.chatService.addParticipants(chatId, usersIqs);
//   // }

//   // @Get('get-chats')
//   // getChats() {
//   //   return this.chatService.getChats();
//   // }
// }
