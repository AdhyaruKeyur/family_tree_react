
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EditRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const EditRequestModal = ({ open, onOpenChange, user }: EditRequestModalProps) => {
  const { toast } = useToast();
  const [requestData, setRequestData] = useState({
    requestType: 'edit',
    requestedChanges: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, this would send to API
    toast({
      title: "Edit Request Submitted",
      description: `Your request to edit ${user.fullName}'s profile has been sent to administrators for review.`,
    });
    
    onOpenChange(false);
    setRequestData({
      requestType: 'edit',
      requestedChanges: '',
      reason: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-700">
            Request Profile Edit
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Requesting changes for: <strong>{user?.fullName}</strong>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="requestedChanges">Requested Changes *</Label>
            <Textarea
              id="requestedChanges"
              placeholder="Please describe what information needs to be updated..."
              value={requestData.requestedChanges}
              onChange={(e) => setRequestData({...requestData, requestedChanges: e.target.value})}
              required
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="reason">Reason for Changes *</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why these changes are needed..."
              value={requestData.reason}
              onChange={(e) => setRequestData({...requestData, reason: e.target.value})}
              required
              rows={3}
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
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
