import { NavigateFunction } from 'react-router-dom';
import { tokens } from '@/shared/di';
import { chatControllerSignIn, chatControllerSignOut } from '@/shared/api';

export interface SignInChatInteractor {
  execute(
    externalId: string,
    navigator: NavigateFunction,
  ): Promise<{
    id: number;
    externalId: string;
    participants: { id: number; username: string }[];
    messages: {
      id: number;
      creator: { id: number; username: string };
      message: string;
    }[];
  }>;
}

export class SignInChatInteractorImpl implements SignInChatInteractor {
  static inject = [
    tokens.signInChatGateway,
    tokens.signOutChatGateway,
  ] as const;

  constructor(
    private signInChatGateway: typeof chatControllerSignIn,
    private signOutChatGateway: typeof chatControllerSignOut,
  ) {}

  async execute(externalId: string, navigate: NavigateFunction) {
    const { response, data } = await this.signInChatGateway({
      path: { externalId },
    });

    if (!response.ok && (response.status === 401 || response.status === 404)) {
      if (response.status === 401) {
        navigate(`/chat/create?chatExternalId=${externalId}`);
        await this.signOutChatGateway({ path: { externalId } });
      } else if (response.status === 404) {
        navigate('/');
      }
    }

    return data;
  }
}
