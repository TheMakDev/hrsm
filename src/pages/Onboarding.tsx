import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Onboarding: React.FC = () => {
  const [form, setForm] = useState({
    employeeName: '',
    joiningDate: '',
    department: '',
    jobRole: '',
    onboardingNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (value: string) => {
    setForm({ ...form, department: value });
  };

  const handleSubmit = () => {
    console.log('Onboarding form submitted:', form);
    // API call to backend or other logic
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Onboarding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input id="employeeName" name="employeeName" value={form.employeeName} onChange={handleChange} placeholder="Enter employee name" />
          </div>
          <div>
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input id="joiningDate" name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={handleDepartmentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Input id="jobRole" name="jobRole" value={form.jobRole} onChange={handleChange} placeholder="Enter job role" />
          </div>
          <div>
            <Label htmlFor="onboardingNotes">Onboarding Notes</Label>
            <Textarea id="onboardingNotes" name="onboardingNotes" value={form.onboardingNotes} onChange={handleChange} placeholder="Additional notes for onboarding..." />
          </div>
          <Button onClick={handleSubmit} className="w-full">Submit Onboarding</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;