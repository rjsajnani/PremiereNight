import axios from 'axios';
import { API_URL, TMDB_API_KEY } from '@env';

const movieClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: TMDB_API_KEY,
  },
});

export default movieClient;
