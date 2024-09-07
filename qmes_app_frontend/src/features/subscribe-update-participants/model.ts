export interface SubscribeUpdateParticipantsInteractor {
  execute(
    externalId: string,
    updateView: (participants: { id: number; username: string }[]) => void,
  ): () => void;
}

export class SubscribeUpdateParticipantsInteractorImpl
  implements SubscribeUpdateParticipantsInteractor
{
  execute(
    externalId: string,
    updateView: (participants: { id: number; username: string }[]) => void,
  ) {
    const server = new EventSource(
      `/api/chat/${externalId}/subscribe-update-participants`,
    );

    server.onmessage = (event) => {
      updateView(JSON.parse(event.data) as { id: number; username: string }[]);
    };

    return () => {
      server.close();
    };
  }
}
