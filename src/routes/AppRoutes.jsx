import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFound from '../pages/NotFound';

import StudentDashboard from '../pages/student/StudentDashboard';
import AvailableSlotsPage from '../pages/student/AvailableSlotsPage';
import MyBookingsPage from '../pages/student/MyBookingsPage';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageSlotsPage from '../pages/admin/ManageSlotsPage';
import UserBookingsPage from '../pages/admin/UserBookingsPage';
import HomePage from '../pages/HomePage';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Student routes with nested layout */}
      <Route
        path="/student"
        element={
          user && user.role === 'STUDENT' ? (
            <StudentDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<AvailableSlotsPage />} />
        <Route path="available-slots" element={<AvailableSlotsPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
      </Route>

      {/* Admin routes with nested layout */}
      <Route
        path="/admin"
        element={
          user && user.role === 'ADMIN' ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<ManageSlotsPage />} />
        <Route path="manage-slots" element={<ManageSlotsPage />} />
        <Route path="user-bookings" element={<UserBookingsPage />} />
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'ADMIN' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/student" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

