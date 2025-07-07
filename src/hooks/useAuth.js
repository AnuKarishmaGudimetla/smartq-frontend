// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// `useAuth()` is now shorthand for `useContext(AuthContext)`
const useAuth = () => useContext(AuthContext);
export default useAuth;
