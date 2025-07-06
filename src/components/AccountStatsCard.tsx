
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountStatsCardProps {
  stats: {
    daysActive: number;
    requestsProcessed: number;
    usersManaged: number;
  };
}

export const AccountStatsCard = ({ stats }: AccountStatsCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Account Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.daysActive}</p>
            <p className="text-sm text-gray-600">Days Active</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.requestsProcessed}</p>
            <p className="text-sm text-gray-600">Requests Processed</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.usersManaged}</p>
            <p className="text-sm text-gray-600">Users Managed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
