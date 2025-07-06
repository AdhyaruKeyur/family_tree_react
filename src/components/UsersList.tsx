
import { UserCard } from './UserCard';

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

interface UsersListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export const UsersList = ({ users, onEditUser, onDeleteUser }: UsersListProps) => {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
};
