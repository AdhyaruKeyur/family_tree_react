
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EditUserAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onUserUpdated: (user: any) => void;
}

export const EditUserAdminModal = ({ open, onOpenChange, user, onUserUpdated }: EditUserAdminModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    photo: '',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    spouseName: '',
    contact: '',
    email: '',
    dateOfBirth: '',
    hasChildren: '',
    children: '',
    education: '',
    occupation: '',
    organization: '',
    designation: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        photo: user.photo || '',
        fatherName: user.fatherName || '',
        motherName: user.motherName || '',
        maritalStatus: user.maritalStatus || '',
        spouseName: user.spouseName || '',
        contact: user.contact || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        hasChildren: user.hasChildren || '',
        children: Array.isArray(user.children) ? user.children.join(', ') : '',
        education: user.education || '',
        occupation: user.occupation || '',
        organization: user.organization || '',
        designation: user.designation || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the full name and email address.",
        variant: "destructive"
      });
      return;
    }

    // Calculate age from date of birth
    const age = formData.dateOfBirth ? 
      new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() : user.age;

    // Process children string into array
    const childrenArray = formData.children ? 
      formData.children.split(',').map(child => child.trim()).filter(child => child) : [];

    const updatedUser = {
      ...user,
      ...formData,
      age,
      children: childrenArray
    };

    onUserUpdated(updatedUser);
    
    toast({
      title: "Family Member Updated",
      description: `${formData.fullName}'s information has been successfully updated.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            Edit Family Member
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Editing: <strong>{user?.fullName}</strong>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.photo}
                onChange={(e) => handleInputChange('photo', e.target.value)}
              />
            </div>
          </div>

          {/* Family Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Family Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select 
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange('maritalStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="spouseName">Spouse Name</Label>
                <Input
                  id="spouseName"
                  value={formData.spouseName}
                  onChange={(e) => handleInputChange('spouseName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hasChildren">Has Children</Label>
                <Select 
                  value={formData.hasChildren}
                  onValueChange={(value) => handleInputChange('hasChildren', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="children">Children Names (comma separated)</Label>
                <Input
                  id="children"
                  placeholder="John Jr., Mary, etc."
                  value={formData.children}
                  onChange={(e) => handleInputChange('children', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
            
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                placeholder="Degree - Institution"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
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
              Update Family Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
