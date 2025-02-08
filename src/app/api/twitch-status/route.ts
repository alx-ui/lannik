import { NextResponse } from 'next/server';

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

async function getTwitchToken() {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getTwitchToken();
    const response = await fetch('https://api.twitch.tv/helix/streams?user_login=lannik1', {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const isLive = data.data.length > 0;

    return NextResponse.json({ isLive });
  } catch (error) {
    console.error('Erro ao verificar status da Twitch:', error);
    return NextResponse.json({ isLive: false });
  }
}
