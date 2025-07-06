
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Save } from 'lucide-react';

interface PersonalInfoCardProps {
  profileData: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PersonalInfoCard = ({ profileData, onInputChange, onSubmit }: PersonalInfoCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-gray-800">
          <User className="h-5 w-5 mr-2 text-orange-600" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => onInputChange('fullName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={profileData.role}
                readOnly
                className="mt-1 bg-gray-50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
