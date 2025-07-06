
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button }

 from '@/components/ui/button';
import { 
  User, 
  Users, 
  UserCheck, 
  ClipboardList, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin-users', label: 'Admin Users', icon: UserCheck },
    { path: '/users', label: 'Family Members', icon: Users },
    { path: '/requests', label: 'Requests', icon: ClipboardList },
    { path: '/profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
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
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
