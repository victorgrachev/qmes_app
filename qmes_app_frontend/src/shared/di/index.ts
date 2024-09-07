import { createContext, useContext, useMemo, Context } from 'react';
import { Injector, TChildContext } from 'typed-inject';

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

const context = createContext<unknown | null>(null);

export const ProvideInjector = context.Provider;

export const useInject = <Type>(token: tokens): Type => {
  const injector = useContext(
    context as Context<Injector<TChildContext<tokens, Type, tokens>>>,
  );

  return useMemo(() => injector.resolve(token), [token]);
};
