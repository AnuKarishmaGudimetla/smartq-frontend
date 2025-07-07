import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: `url('https://bing.com/th/id/OIG2.rTr_gUI0PWlO42A74pVG?cb=thvnextc2&pid=ImgGn') center/cover no-repeat`,
      }}
    >
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-400 to-purple-400 opacity-80 -z-10" />
      <div className="relative z-10">
        <main className="p-6 max-w-4xl mx-auto mt-8 bg-white/30 rounded-xl shadow-xl backdrop-blur-sm animate-fade-in-up">
  <Outlet />
</main>


      </div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-300 rounded-full opacity-40 blur-2xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10 animate-pulse" />
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

export default StudentDashboard;