import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '@/chat/chat.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateChatInteractor {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  execute() {
    return this.chatRepository.save({
      externalId: randomUUID(),
      participants: [],
      messages: [],
    });
  }
}
