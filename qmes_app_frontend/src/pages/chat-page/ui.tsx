import {
  Box,
  Flex,
  Heading,
  Icon,
  Textarea,
  IconButton,
  List,
  ListItem,
  Spinner,
  Divider,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import ResizeTextarea from 'react-textarea-autosize';
import { tokens, useInject } from '@/shared/di';
import useSWR from 'swr';
import { FormEvent, useEffect, useRef } from 'react';

export const ChatPage = () => {
  const { externalId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const signInChatInteractor = useInject(tokens.signInChatInteractor);

  const signOutChatInteractor = useInject(tokens.signOutChatInteractor);

  const subscribeUpdateParticipantsInteractor = useInject(
    tokens.subscribeUpdateParticipantsInteractor,
  );

  const subscribeUpdateMessagesInteractor = useInject(
    tokens.subscribeUpdateMessagesInteractor,
  );

  const sendMessageInteractor = useInject(tokens.sendMessageInteractor);

  const {
    isValidating,
    data: { participants = [], messages = [] } = {},
    mutate,
  } = useSWR(
    externalId ? [externalId, 'sign-in'] : null,
    ([externalId]) => signInChatInteractor.execute(externalId, navigate),
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: true,
    },
  );

  useEffect(() => {
    const closeUpdateParticipants =
      subscribeUpdateParticipantsInteractor.execute(
        externalId!,
        (participants) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mutate((currentData) => ({ ...currentData, participants }), {
            revalidate: false,
          });
        },
      );

    const closeUpdateMessages = subscribeUpdateMessagesInteractor.execute(
      externalId!,
      (messages) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mutate((currentData) => ({ ...currentData, messages }), {
          revalidate: false,
        });
      },
    );

    window.addEventListener('unload', () => {
      signOutChatInteractor.execute(externalId!);
    });

    return () => {
      closeUpdateParticipants();
      closeUpdateMessages();
      signOutChatInteractor.execute(externalId!);
    };
  }, [
    signOutChatInteractor,
    externalId,
    subscribeUpdateParticipantsInteractor,
    subscribeUpdateMessagesInteractor,
    mutate,
  ]);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const message = formData.get('message') as string;

    event.currentTarget['message'].value = '';

    sendMessageInteractor.execute(externalId!, message);
  };

  if (isValidating) {
    return (
      <Box
        as="main"
        h="100dvh"
        overflow="hidden"
        bg="blackAlpha.800"
        textColor="White"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={5}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box
      as="main"
      h="100dvh"
      overflow="hidden"
      bg="blackAlpha.800"
      textColor="White"
      p={5}
    >
      <Flex h="100%" w="100%" gap={5}>
        {isMobile ? (
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Участники</DrawerHeader>
              <DrawerBody>
                <List spacing={3} overflow="auto">
                  {participants.map(({ id, username }) => (
                    <ListItem key={id}>{username}</ListItem>
                  ))}
                </List>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : (
          <>
            <Flex flex="0 1 200px" direction="column" gap={5}>
              <Heading size="md">Участники</Heading>
              <List spacing={3} overflow="auto">
                {participants.map(({ id, username }) => (
                  <ListItem key={id}>{username}</ListItem>
                ))}
              </List>
            </Flex>
            <Divider orientation="vertical" />
          </>
        )}
        <Flex flex="1 1 auto" direction="column" gap={5}>
          <Flex justifyContent="space-between" alignItems="center" gap={5}>
            <Heading size="md">Сообщения</Heading>
            {isMobile && (
              <Button ref={btnRef} colorScheme="whiteAlpha" onClick={onOpen}>
                Участники
              </Button>
            )}
          </Flex>
          <List spacing={3} overflow="auto" flex="1 1 auto">
            {messages.map(({ id, creator, message }) => (
              <ListItem key={id}>{`${creator.username}: ${message}`}</ListItem>
            ))}
          </List>
          <Divider orientation="horizontal" />
          <form onSubmit={handleSendMessage}>
            <Flex gap={5}>
              <Textarea
                name="message"
                placeholder="Введите сообщение"
                minRows={1}
                resize="none"
                minH="unset"
                maxH="200px"
                background="White"
                color="Black"
                as={ResizeTextarea}
              />
              <IconButton
                icon={<Icon as={FiSend} />}
                type="submit"
                aria-label="Send message"
              />
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};
