import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppointment } from '@/context/AppointmentContext';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppointment();

  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search doctors or specializations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 h-12 text-base shadow-sm"
      />
    </div>
  );
};