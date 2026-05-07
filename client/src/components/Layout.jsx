import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="ml-64 pt-20 p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
