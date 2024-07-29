import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat/create');
  };

  return (
    <Button colorScheme="whiteAlpha" size="lg" onClick={handleClick}>
      Создать чат
    </Button>
  );
};
