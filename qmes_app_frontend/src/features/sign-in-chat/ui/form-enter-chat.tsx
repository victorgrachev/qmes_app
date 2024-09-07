import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { FormEvent } from 'react';

type Props = {
  onSubmit: (externalId: string, event: FormEvent<HTMLFormElement>) => void;
};

export const FormEnterChat: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const externalId = formData.get('externalId');

    if (typeof externalId === 'string') {
      onSubmit(externalId, event);
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
        <FormLabel>Идентификатор чата</FormLabel>
        <Input name="externalId" w={300} />
      </FormControl>
      <Button colorScheme="whiteAlpha" type="submit">
        Войти
      </Button>
    </VStack>
  );
};
