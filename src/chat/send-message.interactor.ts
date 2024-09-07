import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Chat } from '@/chat/chat.entity';
import { User } from '@/user/user.entity';
import { Message } from '@/message/message.entity';
import { ChatStream } from '@/chat/chat-stream';

@Injectable()
export class SendMessageInteractor {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectDataSource() private dataSource: DataSource,
    private chatStream: ChatStream,
  ) {}

  async execute({
    chatExternalId,
    creator,
    message,
  }: {
    chatExternalId: string;
    creator: User;
    message: string;
  }) {
    const [chat] = await this.chatRepository.find({
      where: { externalId: chatExternalId },
      relations: { messages: true },
      take: 1,
    });

    if (!chat) {
      throw new NotFoundException(
        'Не существует чата с данным идентификатором',
      );
    }

    const newMessage = new Message();

    newMessage.message = message;
    newMessage.creator = creator;

    chat.messages.push(await this.dataSource.manager.save(newMessage));

    const { messages } = await this.chatRepository.manager.save(chat);

    this.chatStream.getStreamMessages(chatExternalId).next(messages);
  }
}
