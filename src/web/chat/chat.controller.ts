import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ChatGuard } from '@/web/chat/chat.guard';
import { CurrentUser } from '@/web/user/user.decorator';
import { User } from '@/user/user.entity';
import { ChatSendMessageBodyDto } from '@/web/chat/chat-send-message-body.dto';
import { ApiOkResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ChatCreateResponseDto } from '@/web/chat/chat-create-response.dto';
import { CreateChatInteractor } from '@/chat/create-chat.interactor';
import { SignInChatInteractor } from '@/chat/sign-in-chat.interactor';
import { SignOutChatInteractor } from '@/chat/sign-out-chat.interactor';
import { SendMessageInteractor } from '@/chat/send-message.interactor';
import { ChatStream } from '@/chat/chat-stream';
import { map } from 'rxjs';
import { SignInDto } from '@/web/chat/sign-in-chat.dto';

@ApiTags('QMess')
@Controller('chat')
export class ChatController {
  constructor(
    private createChatInteractor: CreateChatInteractor,
    private signInChatInteractor: SignInChatInteractor,
    private signOutChatInteractor: SignOutChatInteractor,
    private sendMessageInteractor: SendMessageInteractor,
    private chatStream: ChatStream,
  ) {}

  @ApiOkResponse({
    description: 'Чат успешно создан',
    type: ChatCreateResponseDto,
  })
  @Post('create')
  @HttpCode(HttpStatus.OK)
  create(): Promise<ChatCreateResponseDto> {
    return this.createChatInteractor.execute();
  }

  @ApiOkResponse({
    description: 'Успешный вход в чат',
    type: SignInDto,
  })
  @ApiParam({ name: 'externalId', description: 'ID чата' })
  @UseGuards(ChatGuard)
  @Post(':externalId/sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Param('externalId') externalId: string, @CurrentUser() user: User) {
    return this.signInChatInteractor.execute(externalId, user);
  }

  @ApiOkResponse({
    description: 'Успешный выход из чата',
  })
  @ApiParam({ name: 'externalId', description: 'ID чата' })
  @UseGuards(ChatGuard)
  @Post(':externalId/sign-out')
  @HttpCode(HttpStatus.OK)
  signOut(@Param('externalId') externalId: string, @CurrentUser() user: User) {
    return this.signOutChatInteractor.execute(externalId, user);
  }

  @ApiOkResponse({
    description: 'Сообщение отправлено',
  })
  @ApiParam({ name: 'externalId', description: 'ID чата' })
  @UseGuards(ChatGuard)
  @Post(':externalId/send-message')
  @HttpCode(HttpStatus.OK)
  sendMessage(
    @Param('externalId') externalId: string,
    @Body() { message }: ChatSendMessageBodyDto,
    @CurrentUser() user: User,
  ) {
    return this.sendMessageInteractor.execute({
      message,
      chatExternalId: externalId,
      creator: user,
    });
  }

  @ApiOkResponse({
    description: 'Успешная подписка',
  })
  @ApiParam({ name: 'externalId', description: 'ID чата' })
  @Sse(':externalId/subscribe-update-participants')
  subscribeUpdateParticipants(@Param('externalId') externalId: string) {
    return this.chatStream
      .getStreamParticipants(externalId)
      .pipe(map((users) => ({ data: users })));
  }

  @ApiOkResponse({
    description: 'Успешная подписка',
  })
  @ApiParam({ name: 'externalId', description: 'ID чата' })
  @Sse(':externalId/subscribe-update-messages')
  subscribeUpdateMessages(@Param('externalId') externalId: string) {
    return this.chatStream
      .getStreamMessages(externalId)
      .pipe(map((messages) => ({ data: messages })));
  }
}
