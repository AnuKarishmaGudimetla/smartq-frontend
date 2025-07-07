import axios from 'axios';
import { authHeader } from '../utils/authHeader';

export const getAvailableSlots = (date, token) =>
  axios.get(`/api/slots/available/${date}`, authHeader(token));

export const bookSlot = (slotId, token) =>
  axios.post(`/api/slots/book/${slotId}`, {}, authHeader(token));

export const cancelSlot = (slotId, token) =>
  axios.put(`/api/slots/cancel/${slotId}`, {}, authHeader(token));

export const getMyBookings = (token) =>
  axios.get('/api/slots/my', authHeader(token));

export const getAllSlots = (token) =>
  axios.get('/api/slots/admin/all', authHeader(token));

export const createSlots = (date, token) =>
  axios.post(`/api/slots/admin/create/${date}`, {}, authHeader(token));

export const deleteSlotsByDate = (date, token) =>
  axios.delete(`/api/slots/admin/delete/${date}`, authHeader(token));