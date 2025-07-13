import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API = process.env.REACT_APP_API_BASE_URL;

export const getAvailableSlots = (date, token) =>
  axios.get(`${API}/api/slots/available/${date}`, authHeader(token));

export const bookSlot = (slotId, token) =>
  axios.post(`${API}/api/slots/book/${slotId}`, {}, authHeader(token));

export const cancelSlot = (slotId, token) =>
  axios.put(`${API}/api/slots/cancel/${slotId}`, {}, authHeader(token));

export const getMyBookings = (token) =>
  axios.get(`${API}/api/slots/my`, authHeader(token));

export const getAllSlots = (token) =>
  axios.get(`${API}/api/slots/admin/all`, authHeader(token));

export const createSlots = (date, token) =>
  axios.post(`${API}/api/slots/admin/create/${date}`, {}, authHeader(token));

export const deleteSlotsByDate = (date, token) =>
  axios.delete(`${API}/api/slots/admin/delete/${date}`, authHeader(token));
