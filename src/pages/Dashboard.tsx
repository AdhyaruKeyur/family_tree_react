
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  Settings,
  LogOut,
  BarChart3,
  User
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalUsers: 47,
    pendingRequests: 12,
    adminUsers: 3,
    approvedRequests: 156
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-orange-600 hover:text-orange-700">
              View Family Tree
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Administrator</h2>
          <p className="text-gray-600">Manage your family tree and user requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-3xl font-bold text-red-600">{stats.pendingRequests}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admin Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.adminUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Requests</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approvedRequests}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin-users">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700 group-hover:text-orange-800">
                  <UserCheck className="h-6 w-6 mr-3" />
                  Admin Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Manage administrator accounts and permissions</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/users">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700 group-hover:text-orange-800">
                  <Users className="h-6 w-6 mr-3" />
                  Family Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Add, edit, and manage family tree members</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/requests">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700 group-hover:text-orange-800">
                  <ClipboardList className="h-6 w-6 mr-3" />
                  Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Review and approve user requests</p>
                {stats.pendingRequests > 0 && (
                  <div className="mt-2">
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {stats.pendingRequests} pending
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link to="/profile">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700 group-hover:text-orange-800">
                  <Settings className="h-6 w-6 mr-3" />
                  Profile & Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Manage your profile and system settings</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
