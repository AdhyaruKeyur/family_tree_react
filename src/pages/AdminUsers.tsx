
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/AdminLayout';
import { AddAdminModal } from '@/components/AddAdminModal';
import { EditAdminModal } from '@/components/EditAdminModal';
import { 
  UserPlus, 
  Edit, 
  Trash2,
  Shield,
  Mail,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample admin data
const sampleAdmins = [
  {
    id: '1',
    fullName: 'John Administrator',
    email: 'john.admin@familytree.com',
    role: 'Super Admin',
    permissions: ['users', 'requests', 'admins', 'settings'],
    createdAt: '2023-01-15',
    lastLogin: '2024-01-10'
  },
  {
    id: '2',
    fullName: 'Sarah Manager',
    email: 'sarah.manager@familytree.com',
    role: 'Content Manager',
    permissions: ['users', 'requests'],
    createdAt: '2023-06-20',
    lastLogin: '2024-01-09'
  },
  {
    id: '3',
    fullName: 'Mike Moderator',
    email: 'mike.mod@familytree.com',
    role: 'Moderator',
    permissions: ['requests'],
    createdAt: '2023-09-10',
    lastLogin: '2024-01-08'
  }
];

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [admins, setAdmins] = useState(sampleAdmins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleDeleteAdmin = (adminId: string) => {
    if (confirm('Are you sure you want to delete this admin user?')) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
      toast({
        title: "Admin Deleted",
        description: "Admin user has been successfully deleted.",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-100 text-red-800';
      case 'Content Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Moderator':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Users</h1>
            <p className="text-gray-600">Manage administrator accounts and permissions</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Admins</p>
                  <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Super Admins</p>
                  <p className="text-2xl font-bold text-red-600">
                    {admins.filter(a => a.role === 'Super Admin').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-green-600">2</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin List */}
        <div className="grid gap-4">
          {admins.map((admin) => (
            <Card key={admin.id} className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{admin.fullName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{admin.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getRoleColor(admin.role)}>{admin.role}</Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        Last login: {new Date(admin.lastLogin).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingAdmin(admin)}
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {admin.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddAdminModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onAdminAdded={(newAdmin) => {
          setAdmins([...admins, { ...newAdmin, id: Date.now().toString() }]);
        }}
      />

      {editingAdmin && (
        <EditAdminModal 
          open={!!editingAdmin} 
          onOpenChange={() => setEditingAdmin(null)}
          admin={editingAdmin}
          onAdminUpdated={(updatedAdmin) => {
            setAdmins(admins.map(admin => 
              admin.id === updatedAdmin.id ? updatedAdmin : admin
            ));
            setEditingAdmin(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
