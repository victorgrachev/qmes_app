export interface SubscribeUpdateMessagesInteractor {
  execute(
    externalId: string,
    updateView: (
      messages: {
        id: number;
        creator: { id: number; username: string };
        message: string;
      }[],
    ) => void,
  ): () => void;
}

export class SubscribeUpdateMessagesInteractorImpl
  implements SubscribeUpdateMessagesInteractor
{
  execute(
    externalId: string,
    updateView: (
      messages: {
        id: number;
        creator: { id: number; username: string };
        message: string;
      }[],
    ) => void,
  ) {
    const server = new EventSource(
      `/api/chat/${externalId}/subscribe-update-messages`,
    );

    server.onmessage = (event) => {
      updateView(JSON.parse(event.data));
    };

    return () => {
      server.close();
    };
  }
}
