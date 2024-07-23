import { Module } from '@nestjs/common';
import { CreateChatInteractor } from '@/chat/create-chat.interactor';
import { ChatService } from '@/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '@/chat/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [CreateChatInteractor, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
