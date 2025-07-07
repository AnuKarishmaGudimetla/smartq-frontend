import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminDashboard;

