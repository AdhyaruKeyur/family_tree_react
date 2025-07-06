
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeOff, Eye, Save } from 'lucide-react';

interface PasswordChangeCardProps {
  profileData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  onInputChange: (field: string, value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PasswordChangeCard = ({ 
  profileData, 
  showPassword, 
  onInputChange, 
  onTogglePassword, 
  onSubmit 
}: PasswordChangeCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-gray-800">
          <EyeOff className="h-5 w-5 mr-2 text-orange-600" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={profileData.currentPassword}
                onChange={(e) => onInputChange('currentPassword', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={onTogglePassword}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={profileData.newPassword}
              onChange={(e) => onInputChange('newPassword', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={profileData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            type="submit"
            className="bg-orange-600 hover:bg-orange-700"
            disabled={!profileData.currentPassword || !profileData.newPassword}
          >
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
