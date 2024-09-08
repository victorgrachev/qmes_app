import { createContext, useContext, useMemo } from 'react';

export const enum tokens {
  createChatInteractor = 'createChatInteractor',
  createChatGateway = 'createChatGateway',
  createUserGateway = 'createUserGateway',
  signInChatInteractor = 'signInChatInteractor',
  signOutChatInteractor = 'signOutChatInteractor',
  signInChatGateway = 'signInChatGateway',
  signOutChatGateway = 'signOutChatGateway',
  sendMessageGateway = 'sendMessageGateway',
  subscribeUpdateParticipantsInteractor = 'subscribeUpdateParticipantsInteractor',
  subscribeUpdateMessagesInteractor = 'subscribeUpdateMessagesInteractor',
  sendMessageInteractor = 'sendMessageInteractor',
}

const context = createContext<RootInjector | null>(null);

export const ProvideInjector = context.Provider;

export const useInject = <TypeToken extends tokens>(token: TypeToken) => {
  const injector = useContext(context)!;

  return useMemo(() => injector.resolve(token), [token]);
};
