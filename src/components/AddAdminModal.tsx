
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AddAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminAdded: (admin: any) => void;
}

const permissions = [
  { id: 'users', label: 'Manage Users' },
  { id: 'requests', label: 'Manage Requests' },
  { id: 'admins', label: 'Manage Admins' },
  { id: 'settings', label: 'System Settings' }
];

export const AddAdminModal = ({ open, onOpenChange, onAdminAdded }: AddAdminModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    permissions: [] as string[]
  });

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
    
    const newAdmin = {
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    };
    
    onAdminAdded(newAdmin);
    
    toast({
      title: "Admin Added",
      description: "New administrator has been successfully added.",
    });
    
    onOpenChange(false);
    setFormData({
      fullName: '',
      email: '',
      role: '',
      permissions: []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            Add New Admin
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
                <SelectValue placeholder="Select role" />
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
              Add Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
