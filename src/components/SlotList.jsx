// import React from 'react';

// const SlotList = ({ slots, onBook }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {slots.map((slot) => (
//       <div key={slot.id} className="bg-white shadow rounded p-4 flex justify-between items-center">
//         <div>
//           <p className="font-semibold">
//             {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
//           </p>
//           <p className="text-sm text-gray-500">Status: {slot.status}</p>
//         </div>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={() => onBook(slot.id)}
//         >
//           {slot.status === 'AVAILABLE' ? 'Book' : 'N/A'}
//         </button>
//       </div>
//     ))}
//   </div>
// );

// export default SlotList;
import React from 'react';

const SlotList = ({ slots, onBook }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
    {slots.map((slot) => (
      <div
        key={slot.id}
        className="bg-white bg-opacity-90 border-2 border-blue-100 p-6 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-105 hover:shadow-2xl duration-200"
      >
        <div>
          <p className="font-semibold text-lg text-blue-800">
            {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-500">Status: {slot.status}</p>
        </div>
        <button
          className={`px-6 py-2 rounded-lg font-bold shadow transition-all duration-200 
            ${slot.status === 'AVAILABLE' ? 'bg-gradient-to-r from-blue-600 to-purple-500 text-white hover:from-blue-700 hover:to-purple-600 hover:scale-110' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={() => onBook(slot.id)}
          disabled={slot.status !== 'AVAILABLE'}
        >
          {slot.status === 'AVAILABLE' ? 'Book' : 'N/A'}
        </button>
      </div>
    ))}
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

export default SlotList;