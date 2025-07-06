
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/AdminLayout';
import { 
  ClipboardList,
  Eye,
  Check,
  X,
  Clock,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample request data
const sampleRequests = [
  {
    id: '1',
    type: 'edit',
    status: 'pending',
    submittedBy: 'John Smith Jr.',
    targetUser: 'John Smith',
    requestedChanges: 'Update contact information and occupation details',
    reason: 'Recently changed jobs and moved to new address',
    submittedDate: '2024-01-15',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'add',
    status: 'approved',
    submittedBy: 'Mary Johnson',
    targetUser: 'New Family Member',
    requestedChanges: 'Add new family member - Sarah Johnson (daughter)',
    reason: 'Recently married into the family',
    submittedDate: '2024-01-10',
    priority: 'high'
  },
  {
    id: '3',
    type: 'delete',
    status: 'rejected',
    submittedBy: 'Admin User',
    targetUser: 'Old Record',
    requestedChanges: 'Remove duplicate family member record',
    reason: 'Found duplicate entry in system',
    submittedDate: '2024-01-08',
    priority: 'low'
  }
];

const Requests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState(sampleRequests);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const handleApproveRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    toast({
      title: "Request Approved",
      description: "The request has been approved and processed.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    toast({
      title: "Request Rejected",
      description: "The request has been rejected.",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Requests Management</h1>
          <p className="text-gray-600">Review and manage family tree modification requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {requests.filter(r => r.status === 'approved').length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {requests.filter(r => r.status === 'rejected').length}
                  </p>
                </div>
                <X className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Requests</h2>
            <div className="grid gap-4">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="bg-white/80 backdrop-blur-sm border-orange-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-gray-800">
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                        </CardTitle>
                        <p className="text-sm text-gray-600">Target: {request.targetUser}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityBadgeColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusBadgeColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Requested Changes:</p>
                        <p className="text-sm text-gray-600">{request.requestedChanges}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Reason:</p>
                        <p className="text-sm text-gray-600">{request.reason}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-1" />
                          <span>Submitted by: {request.submittedBy}</span>
                          <span className="ml-4">Date: {request.submittedDate}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Processed Requests</h2>
            <div className="grid gap-4">
              {processedRequests.map((request) => (
                <Card key={request.id} className="bg-white/80 backdrop-blur-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request - {request.targetUser}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{request.requestedChanges}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Submitted by {request.submittedBy} on {request.submittedDate}
                        </p>
                      </div>
                      <Badge className={getStatusBadgeColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Requests;
