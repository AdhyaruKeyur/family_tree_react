
import { Card, CardContent } from '@/components/ui/card';
import { UsersIcon, Mail, Calendar } from 'lucide-react';

interface UserStatsProps {
  totalUsers: number;
  marriedUsers: number;
  usersWithChildren: number;
}

export const UserStats = ({ totalUsers, marriedUsers, usersWithChildren }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Married</p>
              <p className="text-2xl font-bold text-red-600">{marriedUsers}</p>
            </div>
            <Mail className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">With Children</p>
              <p className="text-2xl font-bold text-green-600">{usersWithChildren}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
