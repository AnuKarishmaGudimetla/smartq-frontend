// import React from 'react';

// const BookingList = ({ bookings, onCancel }) => (
//   <ul className="space-y-4">
//     {bookings.map((slot) => (
//       <li key={slot.id} className="border p-4 rounded flex justify-between items-center">
//         <div>
//           <p className="font-medium">
//             {new Date(slot.startTime).toLocaleDateString()} {' '}
//             {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
//           </p>
//           <p className="text-sm text-gray-600">Status: {slot.status}</p>
//         </div>
//         <button
//           className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           onClick={() => onCancel(slot.id)}
//         >
//           Cancel
//         </button>
//       </li>
//     ))}
//   </ul>
// );

// export default BookingList;
import React from 'react';

const BookingList = ({ bookings, onCancel }) => (
  <ul className="space-y-6 animate-fade-in-up">
    {bookings.map((slot) => (
      <li
        key={slot.id}
        className="bg-white bg-opacity-90 border-2 border-green-100 p-5 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
      >
        <div>
          <p className="font-semibold text-lg text-green-800">
            {new Date(slot.startTime).toLocaleDateString()} {' '}
            {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-600">Status: {slot.status}</p>
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold shadow hover:from-red-600 hover:to-pink-600 transition"
          onClick={() => onCancel(slot.id)}
        >
          Cancel
        </button>
      </li>
    ))}
    <style>
      {`
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}
    </style>
  </ul>
);

export default BookingList;