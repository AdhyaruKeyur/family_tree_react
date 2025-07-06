
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/AdminLayout';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PersonalInfoCard } from '@/components/PersonalInfoCard';
import { PasswordChangeCard } from '@/components/PasswordChangeCard';
import { AccountStatsCard } from '@/components/AccountStatsCard';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@familytree.com',
    phone: '+1-555-0100',
    role: 'Administrator',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const accountStats = {
    daysActive: 15,
    requestsProcessed: 8,
    usersManaged: 12
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for password change
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would send to API
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    // Clear password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <ProfileHeader 
          title="Profile Settings"
          description="Manage your administrator account settings"
        />

        <PersonalInfoCard
          profileData={{
            fullName: profileData.fullName,
            email: profileData.email,
            phone: profileData.phone,
            role: profileData.role
          }}
          onInputChange={handleInputChange}
          onSubmit={handleSaveProfile}
        />

        <PasswordChangeCard
          profileData={{
            currentPassword: profileData.currentPassword,
            newPassword: profileData.newPassword,
            confirmPassword: profileData.confirmPassword
          }}
          showPassword={showPassword}
          onInputChange={handleInputChange}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSubmit={handleSaveProfile}
        />

        <AccountStatsCard stats={accountStats} />
      </div>
    </AdminLayout>
  );
};

export default Profile;
