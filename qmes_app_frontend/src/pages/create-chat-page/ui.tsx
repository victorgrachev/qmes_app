import React from 'react';
import { Center, Box, Container } from '@chakra-ui/react';
import { FormCreateUser } from '@/features/create-user';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tokens, useInject } from '@/shared/di';

export const CreateChatPage = () => {
  const createChatInteractor = useInject(tokens.createChatInteractor);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleSubmit = (username: string) => {
    createChatInteractor.execute(
      username,
      navigate,
      searchParams.get('chatExternalId'),
    );
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
