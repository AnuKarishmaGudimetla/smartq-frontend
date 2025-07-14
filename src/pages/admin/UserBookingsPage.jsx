import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import bgImage from '../../assets/offce.jpg';
const API = process.env.REACT_APP_API_BASE_URL;
const UserBookingsPage = () => {
  const { token, user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all slots (booked & cancelled)
  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        `${API}/api/slots/admin/all`,
         { headers: { Authorization: `Bearer ${token}` } }
      );
      setSlots(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user bookings:', err.response || err);
      setError(err.response?.data?.message || 'Failed to fetch slots');
      setSlots([]);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') fetchSlots();
    // eslint-disable-next-line
  }, []);

  if (user?.role !== 'ADMIN') {
    return (
      <p className="text-red-500 text-center mt-10">
        You are not authorized to view this page.
      </p>
    );
  }

  const now = new Date();
  // Only future slots
  const futureSlots = slots.filter(slot => new Date(slot.startTime) > now);

  // Split slots into booked and cancelled
  const bookedSlots = futureSlots.filter(slot => slot.status === 'BOOKED');
  const cancelledSlots = futureSlots.filter(
    slot => slot.status === 'CANCELLED' || slot.status === 'CANCELLED_BY_ADMIN'
  );

  const cancelBooking = async (slotId) => {
    if (!window.confirm('Confirm cancellation by admin?')) return;
    try {
      const res = await axios.put(
      `${API}/api/slots/cancel/${slotId}`,  
      {},
      { headers: { Authorization: `Bearer ${token}` } }
  );
      alert(res.data.message);
      fetchSlots();
    } catch (err) {
      console.error('Cancellation failed:', err.response || err);
      setError(err.response?.data?.message || 'Cancellation failed');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();
  const formatTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="min-h-screen pt-20 flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-400 to-purple-400 opacity-80 -z-10" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-2xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-2xl animate-pulse -z-10" />

      <div className="w-full max-w-5xl p-8 bg-white bg-opacity-90 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-8 drop-shadow-lg">
          Upcoming Booked & Cancelled Slots
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booked slots column */}
          <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
              Booked Slots
            </h3>
            {bookedSlots.length === 0 ? (
              <p className="text-center text-gray-500">No upcoming booked slots.</p>
            ) : (
              <ul className="space-y-4">
                {bookedSlots.map(slot => (
                  <li
                    key={slot.id}
                    className="bg-blue-50 p-4 rounded-xl shadow flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-semibold text-lg text-blue-800">
                        {formatDate(slot.startTime)}{' '}
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Booked by: {slot.bookedBy || slot.bookedUser?.username || '---'}
                      </p>
                    </div>
                    <button
                      onClick={() => cancelBooking(slot.id)}
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-lg font-bold shadow hover:scale-105 hover:from-red-700 hover:to-pink-600 transition"
                    >
                      Cancel
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cancelled slots column */}
          <div className="bg-white rounded-xl shadow p-6 border-t-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-700 mb-4 text-center">
              Cancelled Slots
            </h3>
            {cancelledSlots.length === 0 ? (
              <p className="text-center text-gray-500">No upcoming cancelled slots.</p>
            ) : (
              <ul className="space-y-4">
                {cancelledSlots.map(slot => (
                  <li
                    key={slot.id}
                    className="bg-red-50 p-4 rounded-xl shadow flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-semibold text-lg text-red-800">
                        {formatDate(slot.startTime)}{' '}
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Booked by: {slot.bookedBy || slot.bookedUser?.username || '---'}
                      </p>
                    </div>
                    <span className="mt-4 inline-block px-3 py-1 rounded-full bg-red-200 text-red-800 font-semibold text-sm text-center">
                      Cancelled
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
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

export default UserBookingsPage;
