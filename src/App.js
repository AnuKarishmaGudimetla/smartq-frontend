// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Navbar />
     
        <AppRoutes />
  
    </AuthProvider>
  );
}

export default App;
