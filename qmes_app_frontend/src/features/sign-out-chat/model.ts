import { tokens } from '@/shared/di';
import { chatControllerSignOut } from '@/shared/api';

export interface SignOutChatInteractor {
  execute(externalId: string): Promise<void>;
}

export class SignOutChatInteractorImpl implements SignOutChatInteractor {
  static inject = [tokens.signOutChatGateway] as const;

  constructor(private signOutChatGateway: typeof chatControllerSignOut) {}

  async execute(externalId: string) {
    await this.signOutChatGateway({ path: { externalId } });
  }
}
