import axios from 'axios';

export const login = (username, password) =>
  axios.post('/api/auth/login', { username, password });

export const register = (username, password, email) =>
  axios.post('/api/auth/register', { username, password, role: 'STUDENT', email });