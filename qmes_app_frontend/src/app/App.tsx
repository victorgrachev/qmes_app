import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { MainPage } from '@/pages/main-page';
import { CreateChatPage } from '@/pages/create-chat-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  { path: '/chat/create', element: <CreateChatPage /> },
  { path: '/chat/enter', element: <div>1</div> },
  { path: '/chat/:externalId', element: <div>2</div> },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
