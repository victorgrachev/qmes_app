import { Injectable } from '@nestjs/common';
import { CreateChatInteractor } from '@/chat/create-chat.interactor';
import { User } from '@/user/user.entity';

@Injectable()
export class ChatService {
  constructor(private createChatInteractor: CreateChatInteractor) {}

  createChat(creator: User) {
    return this.createChatInteractor.execute(creator);
  }
}
