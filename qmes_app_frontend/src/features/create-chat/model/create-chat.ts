export const createChat = async () => {
  const response = await fetch('/api/chat/create', {
    method: 'POST',
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};
