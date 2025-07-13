import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

export const login = (username, password) =>
  axios.post(`${API}/api/auth/login`, { username, password });

export const register = (username, password, email) =>
  axios.post(`${API}/api/auth/register`, { username, password, role: 'STUDENT', email });
