
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const UserSearch = ({ searchTerm, onSearchChange }: UserSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search family members..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
