import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EnterChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat/enter');
  };

  return (
    <Button colorScheme="whiteAlpha" size="lg" onClick={handleClick}>
      Войти в чат
    </Button>
  );
};
