import { tokens } from '@/shared/di';
import type { chatControllerSendMessage } from '@/shared/api';

export interface SendMessageInteractor {
  execute(externalId: string, message: string): void;
}

export class SendMessageInteractorImpl implements SendMessageInteractor {
  static inject = [tokens.sendMessageGateway] as const;

  constructor(private sendMessageGateway: typeof chatControllerSendMessage) {}

  execute(externalId: string, message: string) {
    this.sendMessageGateway({ path: { externalId }, body: { message } });
  }
}
