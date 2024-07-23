import { Injectable } from '@nestjs/common';
import { User } from '@/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '@/chat/chat.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateChatInteractor {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async execute(creator: User) {
    return await this.chatRepository.save({
      creator,
      externalId: randomUUID().replace(/-/g, ''),
      participants: [creator],
    });
  }
}
