let fetch;

let cachedData = null;
let lastFetch = null;
const CACHE_DURATION = 30000; // 30 segundos

async function initializeFetch() {
  if (!fetch) {
    const nodeFetch = await import('node-fetch');
    fetch = nodeFetch.default;
  }
}

async function getTwitchToken() {
  await initializeFetch();
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  const data = await response.json();
  return data.access_token;
}

exports.handler = async function () {
  await initializeFetch();

  if (cachedData && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
    return {
      statusCode: 200,
      body: JSON.stringify(cachedData),
    };
  }

  try {
    const token = await getTwitchToken();
    const response = await fetch('https://api.twitch.tv/helix/streams?user_login=lannik1', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const result = {
      isLive: data.data.length > 0,
      viewerCount: data.data.length > 0 ? data.data[0].viewer_count : 0,
      lastedUpdatedAt: Date.now(),
    };

    cachedData = result;
    lastFetch = Date.now();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ isLive: false, error: error.message }),
    };
  }
};
