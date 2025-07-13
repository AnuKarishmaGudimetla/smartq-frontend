import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const API = process.env.REACT_APP_API_BASE_URL;
const AvailableSlotsPage = () => {
  const { token } = useAuth();
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [message, setMessage] = useState('');
  const [minDate, setMinDate] = useState('');

  // Compute tomorrow’s date for the min attribute
  useEffect(() => {
  const today = new Date();
  setMinDate(today.toISOString().slice(0, 10)); // ✅ Allow today
  }, []);
  // Function to fetch slots for a given date
  const fetchSlots = async (dateStr) => {
    try {
      const response = await axios.get(
  `${API}/api/slots/available/${dateStr}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const availableSlots = response.data.filter((s) => s.status === 'AVAILABLE');
      setSlots(availableSlots);
      setMessage(availableSlots.length === 0 ? 'No slots available on this date.' : '');
    } catch (err) {
      console.error('Failed to fetch slots:', err.response || err);
      setMessage('Failed to fetch slots.');
      setSlots([]);
    }
  };
  useEffect(() => {
    if (!selectedDate) return;
    fetchSlots(selectedDate);
  }, [selectedDate, token]);

  const bookSlot = async (slotId) => {
    try {
      const res = await axios.post(
        `http://localhost:9095/api/slots/book/${slotId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchSlots(selectedDate);
    } catch (err) {
      console.error('Booking failed:', err.response || err);
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="p-6 animate-fade-in-up">
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6 drop-shadow-lg">
          Available Slots
        </h2>
        <div className="flex justify-center mb-6">
          <input
            type="date"
            className="border-2 border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate} // disables today and past
          />
        </div>
        {message && (
          <p className="text-red-500 text-center mb-4">{message}</p>
        )}

        {slots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="bg-gradient-to-br from-blue-50 via-white to-purple-100 border border-blue-300 p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300"
>

                <p className="font-semibold text-lg text-blue-800">
                  {new Date(slot.startTime).toLocaleTimeString()} -{' '}
                  {new Date(slot.endTime).toLocaleTimeString()}
                </p>
                <p className="text-gray-600">Status: {slot.status}</p>
                <button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-blue-700 hover:to-purple-600 transition"
                  onClick={() => bookSlot(slot.id)}
                  disabled={slot.status !== 'AVAILABLE'}
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}  
        }
      `}</style>
    </div>
  );
};

export default AvailableSlotsPage;
