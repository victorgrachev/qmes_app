import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { FormEvent } from 'react';

type Props = {
  onSubmit: (username: string, event: FormEvent<HTMLFormElement>) => void;
};

export const FormCreateUser: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get('username');

    if (typeof username === 'string') {
      onSubmit(username, event);
    }
  };

  return (
    <VStack
      as="form"
      spacing={5}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onSubmit={handleSubmit}
    >
      <FormControl isRequired>
        <FormLabel>Введите имя пользователя</FormLabel>
        <Input name="username" />
      </FormControl>
      <Button colorScheme="whiteAlpha" type="submit">
        Войти
      </Button>
    </VStack>
  );
};
