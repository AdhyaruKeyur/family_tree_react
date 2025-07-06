
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface Person {
  id: string;
  fullName: string;
  photo: string;
  dateOfBirth: string;
  age: number;
  education: string;
  occupation: string;
  parentIds: string[];
  spouseId: string | null;
  childrenIds: string[];
  position: { x: number; y: number };
}

interface FamilyTreeCardProps {
  person: Person;
}

export const FamilyTreeCard = ({ person }: FamilyTreeCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Link to={`/user/${person.id}`}>
      <Card className="w-72 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-orange-200 hover:border-orange-400 group cursor-pointer">
        <CardContent className="p-4">
          {/* Profile Photo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={person.photo}
                alt={person.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-orange-200 group-hover:border-orange-400 transition-colors"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-center text-gray-800 mb-3 group-hover:text-orange-700 transition-colors">
            {person.fullName}
          </h3>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-orange-500" />
              <span>{formatDate(person.dateOfBirth)} (Age {person.age})</span>
            </div>

            <div className="flex items-start text-gray-600">
              <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
              <span className="line-clamp-2">{person.education}</span>
            </div>

            <div className="flex items-start text-gray-600">
              <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
              <span className="line-clamp-2">{person.occupation}</span>
            </div>
          </div>

          {/* Relationship Badges */}
          <div className="flex flex-wrap gap-1 mt-4">
            {person.spouseId && (
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 hover:bg-red-200">
                Married
              </Badge>
            )}
            {person.childrenIds.length > 0 && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                {person.childrenIds.length} {person.childrenIds.length === 1 ? 'Child' : 'Children'}
              </Badge>
            )}
            {person.parentIds.length > 0 && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                Child
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
