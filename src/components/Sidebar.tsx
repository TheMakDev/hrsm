import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, Users, UserPlus, Clock, Calendar, 
  Star, HelpCircle, BookOpen, FileText, BarChart3, 
  User, Settings, Bell, LogOut 
} from 'lucide-react';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Employee Management', path: '/employees', icon: <Users className="w-5 h-5" />, roles: ['admin'] },
  { name: 'Onboarding', path: '/onboarding', icon: <UserPlus className="w-5 h-5" />, roles: ['admin', 'manager'] },
  { name: 'Attendance', path: '/attendance', icon: <Clock className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Leave Requests', path: '/leave', icon: <Calendar className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Performance', path: '/performance', icon: <Star className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Help Desk', path: '/tickets', icon: <HelpCircle className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Learning', path: '/learning', icon: <BookOpen className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Documents', path: '/documents', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Reports', path: '/reports', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin', 'manager'] },
  { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
  { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" />, roles: ['admin'] },
  { name: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" />, roles: ['admin', 'manager', 'employee'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout, hasAnyRole } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    hasAnyRole(item.roles)
  );

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 lg:static lg:inset-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">HRMS</h1>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            ×
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={onClose}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;