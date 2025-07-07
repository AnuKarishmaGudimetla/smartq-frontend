import React, { useState } from 'react';
import axios from 'axios';
// Optionally, add a logo to src/assets/logo.svg and import it:
// import logo from '../assets/logo.svg';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
  e.preventDefault();
  setError(null);
  console.log("Registering with:", { username, email, password, role });

  try {
    const res = await axios.post(
      'http://localhost:9095/api/auth/register',
      { username, password, email, role },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("Registration success:", res.data);
    window.location.href = '/login';
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    setError(
      err.response?.data?.message ||
      JSON.stringify(err.response?.data) ||
      err.message ||
      'Registration failed'
    );
  }
};

  return (
  <div
    className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
    style={{ backgroundImage: `url(https://bing.com/th/id/OIG2.BnVA4YIJVPs0xm0Hz0KM?cb=thvnextc2&pid=ImgGn)` }}
  >
    {/* Blur overlay */}
    <div className="absolute inset-0 bg-blue-800/50 backdrop-blur-sm z-0" />

    {/* Glassy register form */}
    <div className="relative z-10 w-full max-w-md p-10 bg-white/60 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/40 animate-fade-in-up">
      <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-4 drop-shadow-xl">
        📝 Create Account
      </h2>
      <p className="text-center text-indigo-700 mb-6 font-medium">
        Register for your SmartQ slot booking account
      </p>
      {error && <p className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded-md">⚠️ {error}</p>}

      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="text"
          placeholder="Username"
          className="w-full pl-4 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-indigo-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-4 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-indigo-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-4 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-indigo-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full pl-4 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-indigo-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3 rounded-2xl font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-gray-800">
        Already have an account?{' '}
        <a href="/login" className="text-indigo-600 font-semibold hover:underline">
          Login
        </a>
      </p>
    </div>

    {/* Animation style */}
    <style>
      {`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}
    </style>
  </div>
);
};

export default RegisterPage;