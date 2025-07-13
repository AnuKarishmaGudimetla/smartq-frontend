import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API = process.env.REACT_APP_API_BASE_URL;

export const getUsers = () => axios.get(`${API}/api/auth/users`);

export const getCurrentUser = (token) =>
  axios.get(`${API}/api/users/me`, authHeader(token));
