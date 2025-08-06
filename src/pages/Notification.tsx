import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    id: 1,
    title: 'Leave Request Approved',
    description: 'Your leave request for 5th - 7th Aug has been approved.',
    date: 'Aug 5, 2025',
    status: 'approved'
  },
  {
    id: 2,
    title: 'Clock In Reminder',
    description: 'You haven’t clocked in today. Please remember to do so.',
    date: 'Aug 6, 2025',
    status: 'reminder'
  },
  {
    id: 3,
    title: 'Profile Update Needed',
    description: 'Please complete your onboarding profile before Friday.',
    date: 'Aug 4, 2025',
    status: 'warning'
  }
];

const Notification: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications to display.</p>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className="border p-4 rounded-md space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-semibold text-gray-800">{note.title}</h4>
                <Badge variant="secondary" className={
                  note.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : note.status === 'reminder'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }>
                  {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{note.description}</p>
              <p className="text-xs text-gray-400">{note.date}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Notification;
