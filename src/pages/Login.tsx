
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: "Login Successful",
          description: "Welcome back, Administrator!",
        });
        navigate('/dashboard');
      } else if (credentials.username === 'user' && credentials.password === 'user') {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Try admin/admin or user/user",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Family Tree
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to manage your family tree</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>Admin: username: <code>admin</code>, password: <code>admin</code></div>
                <div>User: username: <code>user</code>, password: <code>user</code></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
