import { Subject } from 'rxjs';
import { User } from '@/user/user.entity';
import { Message } from '@/message/message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatStream {
  private streamsParticipants = new Map<string, Subject<User[]>>();

  private streamsMessages = new Map<string, Subject<Message[]>>();

  getStreamParticipants(externalId: string) {
    if (!this.streamsParticipants.has(externalId)) {
      this.streamsParticipants.set(externalId, new Subject<User[]>());
    }

    return this.streamsParticipants.get(externalId);
  }

  getStreamMessages(externalId: string) {
    if (!this.streamsMessages.has(externalId)) {
      this.streamsMessages.set(externalId, new Subject<Message[]>());
    }

    return this.streamsMessages.get(externalId);
  }
}
