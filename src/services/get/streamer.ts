import { api } from 'services/api';

export async function getStreamer(idStreamer: string) {
  const { data, status } = await api.get(`streams?user_id=${idStreamer}`);

  return { data, status };
}
