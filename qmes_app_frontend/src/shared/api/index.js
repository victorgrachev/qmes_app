import { request } from './request';

export function userControllerCreate(params) {
  return request('post', `/api/user/create`, {
    header: { accept: 'application/json', 'Content-Type': 'application/json' },
  })(params);
}

export function chatControllerCreate() {
  return request('post', `/api/chat/create`, {
    header: { 'Content-Type': 'application/json' },
  })();
}

export function chatControllerSignIn(params) {
  return request('post', `/api/chat/${params.path.externalId}/sign-in`, {
    header: { 'Content-Type': 'application/json' },
  })(params);
}

export function chatControllerSignOut(params) {
  return request(
    'post',
    `/api/chat/${params.path.externalId}/sign-out`,
  )(params);
}

export function chatControllerSendMessage(params) {
  return request('post', `/api/chat/${params.path.externalId}/send-message`, {
    header: { accept: 'application/json', 'Content-Type': 'application/json' },
  })(params);
}

export function chatControllerSubscribeUpdateParticipants(params) {
  return request(
    'get',
    `/api/chat/${params.path.externalId}/subscribe-update-participants`,
  )(params);
}

export function chatControllerSubscribeUpdateMessages(params) {
  return request(
    'get',
    `/api/chat/${params.path.externalId}/subscribe-update-messages`,
  )(params);
}
