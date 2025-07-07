import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import bgImage from '../../assets/offce.jpg'; // Adjust path as needed

const isPastDate = (inputDate) => {
  const selected = new Date(inputDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
};

const ManageSlotsPage = () => {
  const { token } = useAuth();
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState(null);

  // Compute tomorrow's date for min attribute
  const tomorrowStr = (() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
  })();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const handleCreate = async () => {
    if (!date || isPastDate(date)) {
      setMessage({ type: 'error', text: 'Please select a valid future date.' });
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:9095/api/slots/admin/create/${date}`,
        {},
        config
      );
      setSlots(res.data);
      setMessage({ type: 'success', text: 'Slots created successfully.' });
    } catch (err) {
      const errorText =
        err.response?.data?.message || err.response?.data || 'Failed to create slots';
      setMessage({ type: 'error', text: errorText.toString() });
    }
  };

  const handleDelete = async () => {
    if (!date || isPastDate(date)) {
      setMessage({ type: 'error', text: 'Please select a valid future date.' });
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:9095/api/slots/admin/delete/${date}`,
        config
      );
      setSlots([]);
      setMessage({
        type: 'success',
        text: res.data.message || 'Slots deleted successfully',
      });
    } catch (err) {
      const errorText =
        err.response?.data?.message || err.response?.data || 'Failed to delete slots';
      setMessage({ type: 'error', text: errorText.toString() });
    }
  };

  return (
    <div
      className="min-h-screen pt-20 flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm -z-10" />

      <div className="w-full max-w-2xl p-8 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in-up relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
          Manage Slots
        </h2>

        <input
          type="date"
          min={tomorrowStr}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-6 p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Create Slots
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete Slots
          </button>
        </div>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.type === 'error' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message.text}
          </p>
        )}

        {slots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="p-4 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-xl shadow-lg text-indigo-900 flex items-center gap-4 transition-transform hover:scale-105"
              >
                <span className="text-3xl">👥</span>
                <div>
                  <p className="font-semibold">
                    {slot.startTime} → {slot.endTime}
                  </p>
                  <p className="text-sm italic">Status: {slot.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ManageSlotsPage;
