import { auth } from 'services/api';

const payload = new URLSearchParams();

payload.append('client_id', import.meta.env.VITE_TWITCH_CLIENT_ID);
payload.append('client_secret', import.meta.env.VITE_TWITCH_CLIENT_SECRET);
payload.append('grant_type', import.meta.env.VITE_TWITCH_GRANT_TYPE);

export const authTwitch = async () => {
  const { data, status } = await auth.post('', payload);
  return { data, status };
};
