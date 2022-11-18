import axios from 'axios';

const bearerToken = 'Bearer ' + localStorage.getItem('@lannik:token');

export const auth = axios.create({
  baseURL: `https://id.twitch.tv/oauth2/token`,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export const api = axios.create({
  baseURL: `https://api.twitch.tv/helix`,
  headers: {
    Authorization: bearerToken,
    'Client-Id': 'guyuch9qhk91l1la1r7cackurfv4vb',
  },
});
