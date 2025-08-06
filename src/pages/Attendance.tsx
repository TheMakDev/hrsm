import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const Attendance: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [history, setHistory] = useState<{ type: 'in' | 'out'; time: string; date: string }[]>([]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleClockIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setIsCheckedIn(true);
    setHistory(prev => [...prev, { type: 'in', time: now.toLocaleTimeString(), date: formatDate(now) }]);
  };

  const handleClockOut = () => {
    const now = new Date();
    setIsCheckedIn(false);
    setCheckInTime(null);
    setHistory(prev => [...prev, { type: 'out', time: now.toLocaleTimeString(), date: formatDate(now) }]);
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <div className="flex items-center gap-2 mt-1">
              {isCheckedIn ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Checked In
                  </Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-600" />
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Checked Out
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        {checkInTime && (
          <div>
            <p className="text-sm text-gray-600">Check-in Time</p>
            <p className="font-semibold text-gray-900">{checkInTime}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>Office Location Verified</span>
        </div>

        <div className="flex gap-2">
          {!isCheckedIn ? (
            <Button onClick={handleClockIn} className="flex-1">
              Clock In
            </Button>
          ) : (
            <Button onClick={handleClockOut} variant="outline" className="flex-1">
              Clock Out
            </Button>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">This Week</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Hours Worked</p>
              <p className="font-semibold">38.5h</p>
            </div>
            <div>
              <p className="text-gray-500">Overtime</p>
              <p className="font-semibold">2.5h</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Attendance History</p>
          <ul className="space-y-1 text-sm text-gray-800">
            {history.length === 0 && <li>No attendance history yet.</li>}
            {history.map((entry, index) => (
              <li key={index} className="flex items-center gap-2">
                {entry.type === 'in' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span>
                  {entry.type === 'in' ? 'Checked In' : 'Checked Out'} at {entry.time} on {entry.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Attendance;