import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import loginBg from '../assets/noqueue.jpg'; // adjust the path as needed

// Optionally, add a logo to src/assets/logo.svg and import it:
// import logo from '../assets/logo.svg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
const API = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
    const { data } = await axios.post(`${API}/api/auth/login`, {
      username,
      password,
    });
      const raw = data.token || data;
      const token = raw.replace(/^Bearer\s/, '');
      const decoded = jwtDecode(token);
      const extractedUsername = decoded.sub;
      const role = decoded.role.replace('ROLE_', '');
      login(token, { username: extractedUsername, role });
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data ||
        'Login failed'
      );
    }
  };
  return (
    <div
      className="min-h-screen flex justify-center items-center relative"
      style={{
        background: `url(${loginBg}) center/cover no-repeat`,
      }}
    >
      <div className="absolute inset-0 bg-purple-800/40 backdrop-blur-sm" />
<div className="relative z-10 w-full max-w-md p-8 bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-white/40">
  <h2 className="text-3xl font-bold text-center text-blue mb-4">Login to SmartQ</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="relative">
      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500" />
      <input
        type="text"
        placeholder="Username"
        className="w-full pl-12 pr-4 py-2 rounded-xl bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="relative">
      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500" />
      <input
        type="password"
        placeholder="Password"
        className="w-full pl-12 pr-4 py-2 rounded-xl bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl shadow-md hover:scale-105 transition"
    >
      Login
    </button>
  </form>
  {error && <p className="mt-4 text-center text-red-200">{error}</p>}
  <p className="mt-6 text-center text-indigo-900">
    Don't have an account?{' '}
    <a href="/register" className="text-indigo-900 font-semibold underline hover:text-indigo-700">
      Register
    </a>
  </p>
</div>
    </div>
  );
};
export default LoginPage; 
