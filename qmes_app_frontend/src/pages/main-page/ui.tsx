import { Box, Center, Heading, Icon, VStack } from '@chakra-ui/react';
import { PiChatTeardropFill } from 'react-icons/pi';
import React from 'react';
import { CreateChat } from '@/features/create-chat';
import { ChatEnter } from '@/features/chat-enter';

export const MainPage = () => {
  return (
    <VStack h="100dvh" overflow="hidden" bg="blackAlpha.800" textColor="White">
      <Box as="header" p={5} flexGrow={0} flexShrink={0}>
        <Heading size="lg">
          <Center gap={2}>
            <Icon as={PiChatTeardropFill} />
            QMes
          </Center>
        </Heading>
      </Box>
      <Center as="main" gap={2} flexGrow={1} flexShrink={1} overflow="auto">
        <CreateChat />
        <ChatEnter />
      </Center>
    </VStack>
  );
};
