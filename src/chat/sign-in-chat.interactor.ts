import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '@/chat/chat.entity';
import { User } from '@/user/user.entity';
import { ChatStream } from '@/chat/chat-stream';

@Injectable()
export class SignInChatInteractor {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private chatStream: ChatStream,
  ) {}

  async execute(externalId: string, user: User) {
    const [chat] = await this.chatRepository.find({
      where: { externalId },
      relations: { participants: true, messages: true },
      take: 1,
    });

    if (!chat) {
      throw new NotFoundException(
        'Не существует чата с данным идентификатором',
      );
    }

    chat.participants.push(user);

    const { participants } = await this.chatRepository.manager.save(chat);

    this.chatStream.getStreamParticipants(externalId).next(participants);

    return chat;
  }
}
