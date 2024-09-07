import { Module } from '@nestjs/common';
import { CreateChatInteractor } from '@/chat/create-chat.interactor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '@/chat/chat.entity';
import { SignInChatInteractor } from '@/chat/sign-in-chat.interactor';
import { UserModule } from '@/user/user.module';
import { SignOutChatInteractor } from '@/chat/sign-out-chat.interactor';
import { SendMessageInteractor } from '@/chat/send-message.interactor';
import { ChatStream } from '@/chat/chat-stream';
import { MessageModule } from '@/message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UserModule, MessageModule],
  providers: [
    CreateChatInteractor,
    SignInChatInteractor,
    SignOutChatInteractor,
    SendMessageInteractor,
    ChatStream,
  ],
  exports: [
    CreateChatInteractor,
    SignInChatInteractor,
    SignOutChatInteractor,
    SendMessageInteractor,
    ChatStream,
  ],
})
export class ChatModule {}
