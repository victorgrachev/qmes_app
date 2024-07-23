import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { MainPage } from '@/pages/main';

const router = createBrowserRouter([
  {
    path: '/main',
    element: <MainPage />,
  },
  { path: '/join-chat/:externalId', element: <div>Hello test!</div> },
  {
    path: '*',
    element: <Navigate to="/main" />,
  },
]);

export const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
