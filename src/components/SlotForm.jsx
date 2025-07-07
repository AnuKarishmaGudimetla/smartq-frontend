// import React, { useState } from 'react';
// import DatePicker from './DatePicker';

// const SlotForm = ({ onCreate, onDelete }) => {
//   const [date, setDate] = useState('');

//   return (
//     <div className="flex items-center space-x-2 mb-4">
//       <DatePicker value={date} onChange={setDate} />
//       <button
//         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         onClick={() => onCreate(date)}
//       >
//         Create Slots
//       </button>
//       <button
//         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         onClick={() => onDelete(date)}
//       >
//         Delete Slots
//       </button>
//     </div>
//   );
// };

// export default SlotForm;


import React, { useState } from 'react';
import DatePicker from './DatePicker';

const SlotForm = ({ onCreate, onDelete }) => {
  const [date, setDate] = useState('');

  return (
    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 mb-6 animate-fade-in-up">
      <DatePicker value={date} onChange={setDate} />
      <button
        className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-bold shadow hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200"
        onClick={() => onCreate(date)}
      >
        Create Slots
      </button>
      <button
        className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold shadow hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-all duration-200"
        onClick={() => onDelete(date)}
      >
        Delete Slots
      </button>
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
    </div>
  );
};

export default SlotForm;