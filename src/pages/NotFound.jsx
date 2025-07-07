import React from 'react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-400 to-purple-400 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-2xl animate-pulse -z-10" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-2xl animate-pulse -z-10" />
    <div className="text-center bg-white bg-opacity-90 p-12 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in-up">
      <h1 className="text-9xl font-extrabold text-blue-300 drop-shadow-lg">404</h1>
      <p className="text-3xl mt-4 font-bold text-blue-900">Page Not Found</p>
      <a
        href="/"
        className="mt-8 inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-lg font-bold shadow hover:scale-105 hover:from-blue-700 hover:to-purple-600 transition"
      >
        Go to Home
      </a>
    </div>
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

export default NotFound;