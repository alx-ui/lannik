import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'lannik';
    const response = await fetch(`https://kick.com/api/v1/channels/${username}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da Kick: ${response.statusText}`);
    }

    const data = await response.json();
    const isLive = !!data.livestream;

    return NextResponse.json({
      isLive,
      viewerCount: isLive ? data.livestream.viewer_count : 0,
    });
  } catch (error) {
    console.error('Erro ao verificar status da Kick:', error);
    return NextResponse.json({ isLive: false });
  }
}
