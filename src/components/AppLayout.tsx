import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from './LoginForm';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '@/pages/Dashboard';
import EmployeeManagement from '@/pages/EmployeeManagement';
import LeaveRequests from '@/pages/LeaveRequests';
import Profile from '@/pages/Profile';
import Attendance from '@/pages/Attendance';
import Onboarding from '@/pages/Onboarding';
import Notification from '@/pages/Notification';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/leave" element={<LeaveRequests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<div className="p-6"><h1 className="text-2xl font-bold">Page Coming Soon</h1><p className="text-gray-600">This page is under development.</p></div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;