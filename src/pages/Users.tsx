
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/AdminLayout';
import { AddUserAdminModal } from '@/components/AddUserAdminModal';
import { EditUserAdminModal } from '@/components/EditUserAdminModal';
import { UserStats } from '@/components/UserStats';
import { UserSearch } from '@/components/UserSearch';
import { UsersList } from '@/components/UsersList';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Expanded sample user data for admin view
const sampleUsers = [
  {
    id: '1',
    fullName: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    fatherName: 'Robert Smith',
    motherName: 'Helen Smith',
    maritalStatus: 'married',
    spouseName: 'Mary Smith',
    contact: '+1-555-0123',
    email: 'john.smith@email.com',
    dateOfBirth: '1945-03-15',
    age: 78,
    hasChildren: 'yes',
    children: ['David Smith', 'Sarah Johnson'],
    education: 'MBA Business Administration - Harvard Business School',
    occupation: 'CEO',
    organization: 'Smith Enterprises',
    designation: 'Chief Executive Officer',
    website: 'https://smithenterprises.com'
  },
  {
    id: '2',
    fullName: 'Mary Smith',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face',
    fatherName: 'William Johnson',
    motherName: 'Patricia Johnson',
    maritalStatus: 'married',
    spouseName: 'John Smith',
    contact: '+1-555-0124',
    email: 'mary.smith@email.com',
    dateOfBirth: '1948-07-22',
    age: 75,
    hasChildren: 'yes',
    children: ['David Smith', 'Sarah Johnson'],
    education: 'Masters in Literature - Columbia University',
    occupation: 'Retired Teacher',
    organization: 'City Public School',
    designation: 'Former Principal',
    website: ''
  }
];

const Users = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this family member?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: "Family member has been successfully deleted.",
      });
    }
  };

  const marriedUsers = users.filter(u => u.maritalStatus === 'married').length;
  const usersWithChildren = users.filter(u => u.hasChildren === 'yes').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Family Members</h1>
            <p className="text-gray-600">Manage family tree members and their information</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Stats */}
        <UserStats 
          totalUsers={users.length}
          marriedUsers={marriedUsers}
          usersWithChildren={usersWithChildren}
        />

        {/* Search */}
        <UserSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Users List */}
        <UsersList 
          users={filteredUsers}
          onEditUser={setEditingUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>

      {/* Modals */}
      <AddUserAdminModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onUserAdded={(newUser) => {
          setUsers([...users, { ...newUser, id: Date.now().toString() }]);
        }}
      />

      {editingUser && (
        <EditUserAdminModal 
          open={!!editingUser} 
          onOpenChange={() => setEditingUser(null)}
          user={editingUser}
          onUserUpdated={(updatedUser) => {
            setUsers(users.map(user => 
              user.id === updatedUser.id ? updatedUser : user
            ));
            setEditingUser(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Users;
