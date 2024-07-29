export const createUser = async (username: string) => {
  const response = await fetch('/api/user/create', {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};
