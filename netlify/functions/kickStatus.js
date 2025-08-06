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

exports.handler = async function () {
  await initializeFetch();

  if (cachedData && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
    return {
      statusCode: 200,
      body: JSON.stringify(cachedData),
    };
  }

  try {
    const username = 'lannik';
    const response = await fetch(`https://kick.com/api/v1/channels/${username}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da Kick: ${response.statusText}`);
    }

    const data = await response.json();
    const isLive = !!data.livestream;

    const result = {
      isLive,
      viewerCount: isLive ? data.livestream.viewer_count : 0,
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
