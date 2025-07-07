import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:9095/api/slots/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch {
      alert('Failed to fetch bookings');
    }
  };

  const cancelBooking = async (slotId) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const response = await axios.put(
        `http://localhost:9095/api/slots/cancel/${slotId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Cancellation failed');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateTime = (dateTimeStr) => {
    const d = new Date(dateTimeStr);
    return {
      date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      time: d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // --- NEW: capture "now" once per render
  const now = new Date();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url('/mnt/data/3134ea65-ac3d-4b1f-a399-a089e9912c57.png')` }}
    >
      <div className="absolute inset-0 bg-white/15 -z-10" />

      <div className="w-full max-w-4xl p-8 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          My Booked Slots
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((slot) => {
              const start = formatDateTime(slot.startTime);
              const end = formatDateTime(slot.endTime);

              // --- NEW: determine if slot is still cancellable
              const slotEnd = new Date(slot.endTime);
              const isFuture = slotEnd > now;

              return (
                <li
                  key={slot.id}
                  className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-md flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="mb-4 md:mb-0 space-y-2">
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold">
                      {start.date}
                    </div>
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold">
                      {start.time} – {end.time}
                    </div>
                    <p className="text-sm text-gray-600">
                      Status:{' '}
                      <strong
                        className={
                          slot.status === 'CANCELLED_BY_ADMIN'
                            ? 'text-red-600'
                            : slot.status === 'BOOKED'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }
                      >
                        {slot.status.replaceAll('_', ' ')}
                      </strong>
                    </p>
                  </div>
                {isFuture ? (
                // only future slots get a Cancel button
                <button
                onClick={() => cancelBooking(slot.id)}
                className="mt-3 md:mt-0 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                >
                Cancel
                </button>
                ) : (
                // restyled badge for past/ongoing sessions
                <span
                className="
                mt-3 md:mt-0
                inline-flex items-center
                bg-red-500 text-white
                px-4 py-2
                rounded-full
                font-semibold
                shadow-sm
                "
                >
                <span className="mr-2">⏱️</span>
                Session Completed
                </span>
                )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MyBookingsPage;
