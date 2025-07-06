import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser?: (userData: any) => void;
}

export const AddUserModal = ({ open, onOpenChange, onAddUser }: AddUserModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    maritalStatus: 'single',
    spouseName: '',
    contact: '',
    email: '',
    dateOfBirth: '',
    hasChildren: 'no',
    childrenCount: 0,
    education: '',
    occupation: '',
    organization: '',
    website: '',
    designation: '',
    requestReason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If onAddUser callback is provided, add the user to the tree
    if (onAddUser) {
      onAddUser(formData);
      toast({
        title: "Family Member Added",
        description: `${formData.fullName} has been added to the family tree.`,
      });
    } else {
      // Fallback for when no callback is provided
      toast({
        title: "Request Submitted",
        description: "Your request to add a family member has been sent to administrators for review.",
      });
    }
    
    onOpenChange(false);
    setFormData({
      fullName: '',
      fatherName: '',
      motherName: '',
      maritalStatus: 'single',
      spouseName: '',
      contact: '',
      email: '',
      dateOfBirth: '',
      hasChildren: 'no',
      childrenCount: 0,
      education: '',
      occupation: '',
      organization: '',
      website: '',
      designation: '',
      requestReason: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            {onAddUser ? 'Add Family Member' : 'Request to Add Family Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="motherName">Mother's Name</Label>
              <Input
                id="motherName"
                value={formData.motherName}
                onChange={(e) => setFormData({...formData, motherName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select 
                value={formData.maritalStatus} 
                onValueChange={(value) => setFormData({...formData, maritalStatus: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="committed">Committed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.maritalStatus === 'married' || formData.maritalStatus === 'committed') && (
              <div>
                <Label htmlFor="spouseName">Spouse Name</Label>
                <Input
                  id="spouseName"
                  value={formData.spouseName}
                  onChange={(e) => setFormData({...formData, spouseName: e.target.value})}
                />
              </div>
            )}

            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              placeholder="Educational background, degrees, institutions..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Job/Business</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="organization">Organization Name</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="requestReason">Reason for Request</Label>
            <Textarea
              id="requestReason"
              value={formData.requestReason}
              onChange={(e) => setFormData({...formData, requestReason: e.target.value})}
              placeholder="Please explain why you want to add this family member..."
              required
            />
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
              {onAddUser ? 'Add Member' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
