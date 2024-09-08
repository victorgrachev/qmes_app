type RequestResult<Data> = Promise<{ response: Response; data: Data; }>;

type UserControllerCreateParams0 = { "body"?: { "username": string; "chatExternalId": string; }; };
type UserControllerCreateResult0 = RequestResult<{ "id": number; "username": string; }>;
export function userControllerCreate(params: UserControllerCreateParams0): UserControllerCreateResult0;

type ChatControllerCreateResult0 = RequestResult<{ "id": number; "externalId": string; "participants": ({ "id": number; "username": string; })[]; }>;
export function chatControllerCreate(): ChatControllerCreateResult0;

type ChatControllerSignInParams0 = { "path": { "externalId": string; }; };
type ChatControllerSignInResult0 = RequestResult<{ "id": number; "externalId": string; "participants": ({ "id": number; "username": string; })[]; "messages": ({ "id": number; "creator": { "id": number; "username": string; }; "message": string; })[]; }>;
export function chatControllerSignIn(params: ChatControllerSignInParams0): ChatControllerSignInResult0;

type ChatControllerSignOutParams0 = { "path": { "externalId": string; }; };
type ChatControllerSignOutResult0 = RequestResult<null>;
export function chatControllerSignOut(params: ChatControllerSignOutParams0): ChatControllerSignOutResult0;

type ChatControllerSendMessageParams0 = { "path": { "externalId": string; }; "body"?: { "message": string; }; };
type ChatControllerSendMessageResult0 = RequestResult<null>;
export function chatControllerSendMessage(params: ChatControllerSendMessageParams0): ChatControllerSendMessageResult0;

type ChatControllerSubscribeUpdateParticipantsParams0 = { "path": { "externalId": string; }; };
type ChatControllerSubscribeUpdateParticipantsResult0 = RequestResult<null>;
export function chatControllerSubscribeUpdateParticipants(params: ChatControllerSubscribeUpdateParticipantsParams0): ChatControllerSubscribeUpdateParticipantsResult0;

type ChatControllerSubscribeUpdateMessagesParams0 = { "path": { "externalId": string; }; };
type ChatControllerSubscribeUpdateMessagesResult0 = RequestResult<null>;
export function chatControllerSubscribeUpdateMessages(params: ChatControllerSubscribeUpdateMessagesParams0): ChatControllerSubscribeUpdateMessagesResult0;

