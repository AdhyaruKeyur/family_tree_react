
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  fullName: string;
  photo: string;
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  spouseName: string;
  contact: string;
  email: string;
  dateOfBirth: string;
  age: number;
  hasChildren: string;
  children: string[];
  education: string;
  occupation: string;
  organization: string;
  designation: string;
  website: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user.photo}
              alt={user.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.designation} at {user.organization}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right text-sm text-gray-600">
              <p>Age: {user.age}</p>
              <p>Status: {user.maritalStatus}</p>
              <p>Children: {user.hasChildren === 'yes' ? user.children.length : 0}</p>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(user)}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(user.id)}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Father:</span>
              <p className="text-gray-600">{user.fatherName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Mother:</span>
              <p className="text-gray-600">{user.motherName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Contact:</span>
              <p className="text-gray-600">{user.contact}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
