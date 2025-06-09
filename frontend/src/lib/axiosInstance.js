import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finmate-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
