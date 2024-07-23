import { Controller, Post, UseGuards } from '@nestjs/common';
import { ChatService } from '@/chat/chat.service';
import { ChatGuard } from '@/web/chat/chat.guard';
import { User } from '@/web/user/user.decorator';
import { User as UserEntity } from '@/user/user.entity';

@UseGuards(ChatGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  create(@User() creator: UserEntity) {
    return this.chatService.createChat(creator);
  }
}
