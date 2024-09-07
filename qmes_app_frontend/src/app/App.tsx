import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { MainPage } from '@/pages/main-page';
import { CreateChatPage } from '@/pages/create-chat-page';
import { SignInChatPage } from '@/pages/sign-in-chat-page';
import { ChatPage } from '@/pages/chat-page';
import { ProvideInjector, tokens } from '@/shared/di';
import { createInjector } from 'typed-inject';
import {
  chatControllerCreate,
  chatControllerSignIn,
  userControllerCreate,
  chatControllerSignOut,
  chatControllerSendMessage,
} from '@/shared/api/index.js';
import { CreateChatInteractorImpl } from '@/features/create-chat';
import { SignInChatInteractorImpl } from '@/features/sign-in-chat';
import { SignOutChatInteractorImpl } from '@/features/sign-out-chat';
import { SubscribeUpdateParticipantsInteractorImpl } from '@/features/subscribe-update-participants';
import { SubscribeUpdateMessagesInteractorImpl } from '@/features/subscribe-update-messages';
import { SendMessageInteractorImpl } from '@/features/send-message';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  { path: '/chat/create', element: <CreateChatPage /> },
  { path: '/chat/enter', element: <SignInChatPage /> },
  { path: '/chat/:externalId', element: <ChatPage /> },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

const injector = createInjector()
  .provideValue(tokens.signInChatGateway, chatControllerSignIn)
  .provideValue(tokens.signOutChatGateway, chatControllerSignOut)
  .provideValue(tokens.createChatGateway, chatControllerCreate)
  .provideValue(tokens.createUserGateway, userControllerCreate)
  .provideValue(tokens.sendMessageGateway, chatControllerSendMessage)
  .provideClass(tokens.createChatInteractor, CreateChatInteractorImpl)
  .provideClass(tokens.signInChatInteractor, SignInChatInteractorImpl)
  .provideClass(tokens.signOutChatInteractor, SignOutChatInteractorImpl)
  .provideClass(
    tokens.subscribeUpdateParticipantsInteractor,
    SubscribeUpdateParticipantsInteractorImpl,
  )
  .provideClass(
    tokens.subscribeUpdateMessagesInteractor,
    SubscribeUpdateMessagesInteractorImpl,
  )
  .provideClass(tokens.sendMessageInteractor, SendMessageInteractorImpl);

export const App = () => {
  return (
    <ProvideInjector value={injector}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ProvideInjector>
  );
};
