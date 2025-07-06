
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface EditAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: any;
  onAdminUpdated: (admin: any) => void;
}

const permissions = [
  { id: 'users', label: 'Manage Users' },
  { id: 'requests', label: 'Manage Requests' },
  { id: 'admins', label: 'Manage Admins' },
  { id: 'settings', label: 'System Settings' }
];

export const EditAdminModal = ({ open, onOpenChange, admin, onAdminUpdated }: EditAdminModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    permissions: [] as string[]
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions || []
      });
    }
  }, [admin]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedAdmin = {
      ...admin,
      ...formData
    };
    
    onAdminUpdated(updatedAdmin);
    
    toast({
      title: "Admin Updated",
      description: "Administrator has been successfully updated.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            Edit Admin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value) => setFormData({...formData, role: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Content Manager">Content Manager</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="space-y-2 mt-2">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(permission.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={permission.id} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Update Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
