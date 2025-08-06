import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Clock, Calendar, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();

  const adminStats = [
    { title: 'Total Employees', value: '247', icon: <Users className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Present Today', value: '231', icon: <CheckCircle className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Pending Leave', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'text-orange-600' },
    { title: 'Open Tickets', value: '8', icon: <AlertCircle className="w-6 h-6" />, color: 'text-red-600' },
  ];

  const managerStats = [
    { title: 'Team Members', value: '15', icon: <Users className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Team Present', value: '14', icon: <CheckCircle className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Leave Requests', value: '3', icon: <Calendar className="w-6 h-6" />, color: 'text-orange-600' },
    { title: 'Performance Reviews', value: '5', icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-600' },
  ];

  const employeeStats = [
    { title: 'Hours This Month', value: '168', icon: <Clock className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Leave Balance', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Training Progress', value: '75%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-600' },
    { title: 'Open Tickets', value: '2', icon: <AlertCircle className="w-6 h-6" />, color: 'text-orange-600' },
  ];

  const getStats = () => {
    if (hasRole('admin')) return adminStats;
    if (hasRole('manager')) return managerStats;
    return employeeStats;
  };

  const stats = getStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your HR activities</p>
        </div>
        <Badge variant="outline" className="capitalize">
          {user?.role} View
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New employee onboarded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Leave request approved</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Performance review due</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <Clock className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-sm font-medium">Clock In/Out</p>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-sm font-medium">Request Leave</p>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <AlertCircle className="w-5 h-5 text-orange-600 mb-2" />
                <p className="text-sm font-medium">Submit Ticket</p>
              </button>
              <button className="p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-sm font-medium">View Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;