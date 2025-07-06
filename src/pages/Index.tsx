import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, UserPlus, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample family data - positions will be calculated automatically
const initialFamilyData = [
  {
    id: '1',
    fullName: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1945-03-15',
    age: 78,
    education: 'MBA Business Administration',
    occupation: 'CEO at Smith Enterprises',
    parentIds: [],
    spouseId: '2',
    childrenIds: ['3', '4']
  },
  {
    id: '2',
    fullName: 'Mary Smith',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1948-07-22',
    age: 75,
    education: 'Masters in Literature',
    occupation: 'Retired Teacher',
    parentIds: [],
    spouseId: '1',
    childrenIds: ['3', '4']
  },
  {
    id: '3',
    fullName: 'David Smith',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1975-11-10',
    age: 48,
    education: 'Bachelor of Engineering',
    occupation: 'Software Engineer at Tech Corp',
    parentIds: ['1', '2'],
    spouseId: '5',
    childrenIds: ['6']
  },
  {
    id: '4',
    fullName: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1978-05-18',
    age: 45,
    education: 'Doctor of Medicine',
    occupation: 'Pediatrician at City Hospital',
    parentIds: ['1', '2'],
    spouseId: null,
    childrenIds: ['7']
  },
  {
    id: '5',
    fullName: 'Lisa Smith',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '1977-09-03',
    age: 46,
    education: 'Masters in Marketing',
    occupation: 'Marketing Director',
    parentIds: [],
    spouseId: '3',
    childrenIds: ['6']
  },
  {
    id: '6',
    fullName: 'Emma Smith',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c913?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '2005-12-25',
    age: 18,
    education: 'High School Graduate',
    occupation: 'College Student',
    parentIds: ['3', '5'],
    spouseId: null,
    childrenIds: []
  },
  {
    id: '7',
    fullName: 'Michael Johnson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '2008-08-14',
    age: 15,
    education: 'High School Student',
    occupation: 'Student',
    parentIds: ['4'],
    spouseId: null,
    childrenIds: []
  }
];

// Card component
const FamilyTreeCard = ({ person }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={person.photo}
            alt={person.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">{person.fullName}</h3>
            <p className="text-xs text-gray-500">Age: {person.age}</p>
          </div>
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <p><strong>Education:</strong> {person.education}</p>
          <p><strong>Occupation:</strong> {person.occupation}</p>
          <p><strong>DOB:</strong> {person.dateOfBirth}</p>
        </div>
      </div>
    </div>
  );
};

// Add User Modal Component (using your provided component structure)
const AddUserModal = ({ open, onOpenChange, onAddUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    maritalStatus: 'single',
    spouseName: '',
    contact: '',
    email: '',
    dateOfBirth: '',
    education: '',
    occupation: '',
    organization: '',
    website: '',
    designation: '',
    requestReason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAddUser) {
      onAddUser(formData);
      // Toast notification would go here if we had the toast hook
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
      education: '',
      occupation: '',
      organization: '',
      website: '',
      designation: '',
      requestReason: ''
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-orange-700">Add Family Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Father's Name</label>
              <input
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mother's Name</label>
              <input
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Marital Status</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="separated">Separated</option>
                <option value="committed">Committed</option>
              </select>
            </div>

            {(formData.maritalStatus === 'married' || formData.maritalStatus === 'committed') && (
              <div>
                <label className="block text-sm font-medium mb-1">Spouse Name</label>
                <input
                  value={formData.spouseName}
                  onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <textarea
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="Educational background, degrees, institutions..."
              className="w-full border rounded px-3 py-2 h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job/Business</label>
              <input
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Organization Name</label>
              <input
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <input
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason for Request</label>
            <textarea
              value={formData.requestReason}
              onChange={(e) => setFormData({ ...formData, requestReason: e.target.value })}
              placeholder="Please explain why you want to add this family member..."
              required
              className="w-full border rounded px-3 py-2 h-20"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CARD_WIDTH = 280;
const CARD_HEIGHT = 140;
const HORIZONTAL_SPACING = 350;
const VERTICAL_SPACING = 200;

const FamilyTree = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [familyData, setFamilyData] = useState(initialFamilyData);

  const navigate = useNavigate();
  // Function to calculate generations and positions
  const calculateLayout = () => {
    const generations = new Map();
    const processed = new Set();

    // Find root members (those with no parents)
    const roots = familyData.filter(person => person.parentIds.length === 0);

    // Assign generation levels
   const assignGeneration = (person, level = 0) => {
  if (processed.has(person.id)) return;

  // 1. Check if person has no parents but has spouse with known parents
  if (person.parentIds.length === 0 && person.spouseId) {
    const spouse = familyData.find(p => p.id === person.spouseId);

    if (spouse && spouse.parentIds.length > 0) {
      // Try to infer generation level from spouse's parents
      for (let [lvl, members] of generations.entries()) {
        const spouseParentsInLevel = members.filter(m => spouse.parentIds.includes(m.id));
        if (spouseParentsInLevel.length > 0) {
          level = lvl + 1;
          break;
        }
      }
    }
  }

  // Only now mark as processed
  processed.add(person.id);

  // Add person to the generation map
  if (!generations.has(level)) {
    generations.set(level, []);
  }

  // Avoid duplicate addition
  if (!generations.get(level).some(p => p.id === person.id)) {
    generations.get(level).push(person);
  }

  // Recursively assign children to next generation
  person.childrenIds.forEach(childId => {
    const child = familyData.find(p => p.id === childId);
    if (child) {
      assignGeneration(child, level + 1);
    }
  });
};

    // Start with root members
    roots.forEach(root => assignGeneration(root, 0));

    // Calculate positions for each generation
    const positionedMembers = [];
    const generationArray = Array.from(generations.entries()).sort((a, b) => a[0] - b[0]);

    generationArray.forEach(([level, members]) => {
      // Group spouses together and arrange them properly
      const arranged = [];
      const processed = new Set();

      members.forEach(member => {
        if (processed.has(member.id)) return;

        if (member.spouseId) {
          const spouse = members.find(m => m.id === member.spouseId);
          if (spouse) {
            // Add both spouses as a pair
            arranged.push([member, spouse]);
            processed.add(member.id);
            processed.add(spouse.id);
          } else {
            // Spouse is in different generation or doesn't exist in this level
            arranged.push([member]);
            processed.add(member.id);
          }
        } else {
          arranged.push([member]);
          processed.add(member.id);
        }
      });

      // Calculate positions with proper spacing for spouses
      const baseSpacing = HORIZONTAL_SPACING;
      let currentX = 100;

      arranged.forEach((group, groupIndex) => {
        const y = 50 + (level * VERTICAL_SPACING);

        if (group.length === 2) {
          // Spouse pair - place them side by side with less spacing
          const spouse1 = group[0];
          const spouse2 = group[1];

          positionedMembers.push({
            ...spouse1,
            position: { x: currentX, y }
          });
          positionedMembers.push({
            ...spouse2,
            position: { x: currentX + CARD_WIDTH + 60, y } // 60px gap between spouses
          });

          currentX += (CARD_WIDTH * 2) + 60 + baseSpacing; // Move to next position
        } else {
          // Single person
          positionedMembers.push({
            ...group[0],
            position: { x: currentX, y }
          });

          currentX += CARD_WIDTH + baseSpacing;
        }
      });
    });

    return positionedMembers;
  };

  const positionedFamilyData = calculateLayout();

  // Function to add a new family member
  const addFamilyMember = (newMember) => {
    const newId = (Math.max(...familyData.map(p => parseInt(p.id))) + 1).toString();

    // Find parents
    const parents = familyData.filter(p =>
      (newMember.fatherName && p.fullName.toLowerCase().includes(newMember.fatherName.toLowerCase())) ||
      (newMember.motherName && p.fullName.toLowerCase().includes(newMember.motherName.toLowerCase()))
    );

    const member = {
      id: newId,
      fullName: newMember.fullName,
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      dateOfBirth: newMember.dateOfBirth,
      age: new Date().getFullYear() - new Date(newMember.dateOfBirth).getFullYear(),
      education: newMember.education || 'Not specified',
      occupation: newMember.occupation || 'Not specified',
      parentIds: parents.map(p => p.id),
      spouseId: null,
      childrenIds: [],
      contact: newMember.contact || '',
      email: newMember.email || '',
      organization: newMember.organization || '',
      designation: newMember.designation || '',
      website: newMember.website || '',
      maritalStatus: newMember.maritalStatus || 'single'
    };

    // Handle spouse creation if married/committed and spouse name provided
    let updatedFamily = [...familyData];
    let spouseId = null;

    if ((newMember.maritalStatus === 'married' || newMember.maritalStatus === 'committed') && newMember.spouseName) {
      // Check if spouse already exists
      const existingSpouse = familyData.find(p =>
        p.fullName.toLowerCase().includes(newMember.spouseName.toLowerCase())
      );

      if (existingSpouse) {
        // Link to existing spouse
        spouseId = existingSpouse.id;
        member.spouseId = spouseId;

        // Update existing spouse to link back
        updatedFamily = updatedFamily.map(person =>
          person.id === existingSpouse.id ? { ...person, spouseId: newId } : person
        );
      } else {
        // Create new spouse
        const spouseNewId = (Math.max(...updatedFamily.map(p => parseInt(p.id))) + 2).toString();
        const spouse = {
          id: spouseNewId,
          fullName: newMember.spouseName,
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          dateOfBirth: newMember.dateOfBirth, // Same age for now
          age: new Date().getFullYear() - new Date(newMember.dateOfBirth).getFullYear(),
          education: 'Not specified',
          occupation: 'Not specified',
          parentIds: [],
          spouseId: newId,
          childrenIds: [],
          contact: '',
          email: '',
          organization: '',
          designation: '',
          website: '',
          maritalStatus: newMember.maritalStatus
        };

        member.spouseId = spouseNewId;
        updatedFamily.push(spouse);
      }
    }

    // Update parent's children arrays
    updatedFamily = updatedFamily.map(person => {
      if (parents.some(p => p.id === person.id)) {
        return {
          ...person,
          childrenIds: [...person.childrenIds, newId]
        };
      }
      return person;
    });

    setFamilyData([...updatedFamily, member]);
  };

  // Function to render connection lines
  const renderConnections = () => {
    const connections = [];

    // Parent-child connections
    positionedFamilyData.forEach(person => {
      person.childrenIds.forEach(childId => {
        const child = positionedFamilyData.find(p => p.id === childId);
        if (child) {
          const parentX = person.position.x + CARD_WIDTH / 2;
          const parentY = person.position.y + CARD_HEIGHT;
          const childX = child.position.x + CARD_WIDTH / 2;
          const childY = child.position.y;

          const midY = parentY + (childY - parentY) / 2;

          connections.push(
            <g key={`parent-child-${person.id}-${childId}`}>
              <path
                d={`M ${parentX} ${parentY} L ${parentX} ${midY} L ${childX} ${midY} L ${childX} ${childY}`}
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <circle cx={childX} cy={childY - 8} r="4" fill="#10b981" />
            </g>
          );
        }
      });
    });

    // Spouse connections
    const processedSpouses = new Set();
    positionedFamilyData.forEach(person => {
      if (person.spouseId) {
        const spouse = positionedFamilyData.find(p => p.id === person.spouseId);
        const pairKey = [person.id, person.spouseId].sort().join('-');

        if (spouse && !processedSpouses.has(pairKey)) {
          processedSpouses.add(pairKey);

          // Calculate connection points between spouses
          const person1Right = person.position.x + CARD_WIDTH;
          const person1CenterY = person.position.y + CARD_HEIGHT / 2;
          const person2Left = spouse.position.x;
          const person2CenterY = spouse.position.y + CARD_HEIGHT / 2;

          // Only draw connection if they're side by side (not overlapping generations)
          // if (Math.abs(person1CenterY - person2CenterY) < 50) {
          connections.push(
            <g key={`spouse-${pairKey}`}>
              <line
                x1={person1Right + 10}
                y1={person1CenterY}
                x2={person2Left - 10}
                y2={person2CenterY}
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="10,5"
              />
              <circle
                cx={(person1Right + person2Left) / 2}
                cy={(person1CenterY + person2CenterY) / 2}
                r="12"
                fill="white"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <text
                x={(person1Right + person2Left) / 2}
                y={(person1CenterY + person2CenterY) / 2 + 4}
                textAnchor="middle"
                fontSize="14"
                fill="#ef4444"
              >
                ♥
              </text>
            </g>
          );
          // }
        }
      }
    });

    return connections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Family Tree</h1>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowAddUser(true)}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Family Tree Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Family Tree</h2>
          <p className="text-gray-600">
            Family members are automatically arranged by generation and relationships
          </p>
        </div>

        {/* Family Tree Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
          <div className="relative" style={{ minWidth: '1200px', minHeight: '600px' }}>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderConnections()}
            </svg>

            {/* Family Member Cards */}
            {positionedFamilyData.map(person => (
              <div
                key={person.id}
                className="absolute transition-all duration-300 hover:scale-105 hover:z-10"
                style={{
                  left: person.position.x,
                  top: person.position.y
                }}
              >
                <FamilyTreeCard person={person} />
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 max-w-md mx-auto">
          <h3 className="font-semibold text-center mb-3">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-8 h-4 mr-3 relative">
                <div className="w-full h-0.5 bg-green-500 absolute top-1/2 transform -translate-y-1/2"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
              </div>
              <span className="text-sm">Parent-Child</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-4 mr-3 relative">
                <div className="w-full h-0.5 bg-red-500 absolute top-1/2 transform -translate-y-1/2" style={{ strokeDasharray: '4,2' }}></div>
                <div className="w-3 h-3 bg-white border-2 border-red-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                  <span className="text-xs text-red-500">♥</span>
                </div>
              </div>
              <span className="text-sm">Spouse</span>
            </div>
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      <AddUserModal
        open={showAddUser}
        onOpenChange={setShowAddUser}
        onAddUser={addFamilyMember}
      />
    </div>
  );
};

export default FamilyTree;