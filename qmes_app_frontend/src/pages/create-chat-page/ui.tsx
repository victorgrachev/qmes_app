import React from 'react';
import { Center, Box, Container } from '@chakra-ui/react';
import { FormCreateUser } from '@/features/create-user';
import { createUserModel } from '@/features/create-user';
import { createChatModel } from '@/features/create-chat';
import { useNavigate } from 'react-router-dom';

export const CreateChatPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (username: string) => {
    await createUserModel.createUser(username);

    const chat = await createChatModel.createChat();

    navigate(`/chat/${chat.externalId}`);
  };

  return (
    <Box
      as="main"
      h="100dvh"
      overflow="hidden"
      bg="blackAlpha.800"
      textColor="White"
    >
      <Container maxW="md" h="100%">
        <Center h="100%">
          <FormCreateUser onSubmit={handleSubmit} />
        </Center>
      </Container>
    </Box>
  );
};
