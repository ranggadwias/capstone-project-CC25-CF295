import axios from 'axios';

const api = axios.create({
  baseURL: 'https://capstone-project-cc25-cf295-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
