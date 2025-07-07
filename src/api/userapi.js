import axios from 'axios';
import { authHeader } from '../utils/authHeader';

export const getUsers = () => axios.get('/api/auth/users');

export const getCurrentUser = (token) =>
  axios.get('/api/users/me', authHeader(token));