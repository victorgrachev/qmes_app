import React from 'react';
import { Center, Box, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormEnterChat } from '@/features/sign-in-chat';

export const SignInChatPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (externalId: string) => {
    navigate(`/chat/${externalId}`);
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
          <FormEnterChat onSubmit={handleSubmit} />
        </Center>
      </Container>
    </Box>
  );
};
