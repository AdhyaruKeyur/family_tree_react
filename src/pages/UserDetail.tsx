
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EditRequestModal } from '@/components/EditRequestModal';
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Heart,
  Edit,
  Globe
} from 'lucide-react';

// Sample user data - in real app this would come from API
const sampleUsers = {
  '1': {
    id: '1',
    fullName: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1945-03-15',
    age: 78,
    fatherName: 'Robert Smith',
    motherName: 'Helen Smith',
    maritalStatus: 'married',
    spouseName: 'Mary Smith',
    contact: '+1-555-0123',
    email: 'john.smith@email.com',
    hasChildren: 'yes',
    children: ['David Smith', 'Sarah Johnson'],
    education: ['MBA Business Administration - Harvard Business School (1970)', 'Bachelor of Commerce - University of Chicago (1968)'],
    occupation: 'CEO',
    organization: 'Smith Enterprises',
    designation: 'Chief Executive Officer',
    website: 'https://smithenterprises.com'
  },
  '2': {
    id: '2',
    fullName: 'Mary Smith',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1948-07-22',
    age: 75,
    fatherName: 'William Johnson',
    motherName: 'Margaret Johnson',
    maritalStatus: 'married',
    spouseName: 'John Smith',
    contact: '+1-555-0124',
    email: 'mary.smith@email.com',
    hasChildren: 'yes',
    children: ['David Smith', 'Sarah Johnson'],
    education: ['Masters in Literature - Columbia University (1972)', 'Bachelor of Arts - Vassar College (1970)'],
    occupation: 'Retired Teacher',
    organization: 'Springfield Elementary',
    designation: 'Former Principal',
    website: ''
  },
  '3': {
    id: '3',
    fullName: 'David Smith',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1975-11-10',
    age: 48,
    fatherName: 'John Smith',
    motherName: 'Mary Smith',
    maritalStatus: 'married',
    spouseName: 'Lisa Smith',
    contact: '+1-555-0456',
    email: 'david.smith@email.com',
    hasChildren: 'yes',
    children: ['Emma Smith'],
    education: ['Bachelor of Engineering - MIT (1998)', 'Masters in Computer Science - Stanford (2000)'],
    occupation: 'Software Engineer',
    organization: 'Tech Corp',
    designation: 'Senior Software Engineer',
    website: 'https://davidsmith.dev'
  },
  '4': {
    id: '4',
    fullName: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1978-05-18',
    age: 45,
    fatherName: 'John Smith',
    motherName: 'Mary Smith',
    maritalStatus: 'single',
    spouseName: '',
    contact: '+1-555-0789',
    email: 'sarah.johnson@email.com',
    hasChildren: 'yes',
    children: ['Michael Johnson'],
    education: ['Doctor of Medicine - Johns Hopkins (2002)', 'Bachelor of Science - Harvard (1999)'],
    occupation: 'Pediatrician',
    organization: 'City Hospital',
    designation: 'Senior Pediatrician',
    website: 'https://drsarahjohnson.com'
  },
  '5': {
    id: '5',
    fullName: 'Lisa Smith',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '1977-09-03',
    age: 46,
    fatherName: 'Michael Brown',
    motherName: 'Susan Brown',
    maritalStatus: 'married',
    spouseName: 'David Smith',
    contact: '+1-555-0321',
    email: 'lisa.smith@email.com',
    hasChildren: 'yes',
    children: ['Emma Smith'],
    education: ['Masters in Marketing - Northwestern (2001)', 'Bachelor of Business - UCLA (1999)'],
    occupation: 'Marketing Director',
    organization: 'Creative Agency',
    designation: 'Senior Marketing Director',
    website: 'https://lisasmith.marketing'
  },
  '6': {
    id: '6',
    fullName: 'Emma Smith',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '2005-12-25',
    age: 18,
    fatherName: 'David Smith',
    motherName: 'Lisa Smith',
    maritalStatus: 'single',
    spouseName: '',
    contact: '+1-555-0654',
    email: 'emma.smith@email.com',
    hasChildren: 'no',
    children: [],
    education: ['High School Graduate - Springfield High (2023)'],
    occupation: 'College Student',
    organization: 'State University',
    designation: 'Freshman',
    website: ''
  },
  '7': {
    id: '7',
    fullName: 'Michael Johnson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    dateOfBirth: '2008-08-14',
    age: 15,
    fatherName: 'Unknown',
    motherName: 'Sarah Johnson',
    maritalStatus: 'single',
    spouseName: '',
    contact: '+1-555-0987',
    email: 'michael.johnson@email.com',
    hasChildren: 'no',
    children: [],
    education: ['High School Student - Springfield High'],
    occupation: 'Student',
    organization: 'Springfield High School',
    designation: 'Student',
    website: ''
  }
};

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEditRequest, setShowEditRequest] = useState(false);

  const user = sampleUsers[id as keyof typeof sampleUsers];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">The requested family member could not be found.</p>
            <Button onClick={() => navigate('/')} className="bg-orange-600 hover:bg-orange-700">
              Return to Family Tree
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Family Tree
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <img
                    src={user.photo}
                    alt={user.fullName}
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.fullName}</h1>
                  <p className="text-lg text-gray-600 mb-4">{user.designation} at {user.organization}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                      Age {user.age}
                    </Badge>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
                      {user.maritalStatus === 'married' ? 'Married' : user.maritalStatus}
                    </Badge>
                    {user.hasChildren === 'yes' && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {user.children.length} {user.children.length === 1 ? 'Child' : 'Children'}
                      </Badge>
                    )}
                  </div>

                  <Button 
                    onClick={() => setShowEditRequest(true)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Request Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Users className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <span className="font-medium">Date of Birth:</span>
                    <p className="text-gray-600">{new Date(user.dateOfBirth).toLocaleDateString()} (Age {user.age})</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <span className="font-medium">Phone:</span>
                    <p className="text-gray-600">{user.contact}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>

                {user.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-3 text-gray-500" />
                    <div>
                      <span className="font-medium">Website:</span>
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 ml-2"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Heart className="h-5 w-5 mr-2" />
                  Family Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-medium">Father:</span>
                  <p className="text-gray-600">{user.fatherName}</p>
                </div>

                <div>
                  <span className="font-medium">Mother:</span>
                  <p className="text-gray-600">{user.motherName}</p>
                </div>

                {user.maritalStatus === 'married' && (
                  <div>
                    <span className="font-medium">Spouse:</span>
                    <p className="text-gray-600">{user.spouseName}</p>
                  </div>
                )}

                {user.hasChildren === 'yes' && (
                  <div>
                    <span className="font-medium">Children:</span>
                    <div className="mt-1">
                      {user.children.map((child, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-1">
                          {child}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.education.map((edu, index) => (
                    <div key={index} className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-gray-700">{edu}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-medium">Occupation:</span>
                  <p className="text-gray-600">{user.occupation}</p>
                </div>

                <div>
                  <span className="font-medium">Organization:</span>
                  <p className="text-gray-600">{user.organization}</p>
                </div>

                <div>
                  <span className="font-medium">Designation:</span>
                  <p className="text-gray-600">{user.designation}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Request Modal */}
      <EditRequestModal 
        open={showEditRequest} 
        onOpenChange={setShowEditRequest}
        user={user}
      />
    </div>
  );
};

export default UserDetail;
