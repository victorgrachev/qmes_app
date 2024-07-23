import { Box, Container, Heading } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import React from 'react';

export const MainPage = () => {
  return (
    <>
      <Box
        as="header"
        p={5}
        textAlign="center"
        bg="#0F0F0F"
        textColor="#FFFFFF"
      >
        <PhoneIcon />
        <Heading size="lg">QMes</Heading>
      </Box>
      <Container as="main">Body</Container>
    </>
  );
};
