import { tokens } from '@/shared/di';
import type { chatControllerCreate, userControllerCreate } from '@/shared/api';
import { NavigateFunction } from 'react-router-dom';

export interface CreateChatInteractor {
  execute(
    username: string,
    navigate: NavigateFunction,
    chatExternalId?: string | null,
  ): Promise<void>;
}

export class CreateChatInteractorImpl implements CreateChatInteractor {
  static inject = [tokens.createChatGateway, tokens.createUserGateway] as const;

  constructor(
    private createChatGateway: typeof chatControllerCreate,
    private createUserGateway: typeof userControllerCreate,
  ) {}

  async execute(
    username: string,
    navigate: NavigateFunction,
    chatExternalId?: string,
  ): Promise<void> {
    if (chatExternalId) {
      await this.createUserGateway({
        body: {
          username,
          chatExternalId,
        },
      });

      navigate(`/chat/${chatExternalId}`);

      return;
    }

    const {
      data: { externalId },
    } = await this.createChatGateway();

    await this.createUserGateway({
      body: { username, chatExternalId: externalId },
    });

    navigate(`/chat/${externalId}`);
  }
}
