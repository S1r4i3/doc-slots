import { Calendar, Users, Clock, Search as SearchIcon } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { DoctorCard } from '@/components/DoctorCard';
import { useAppointment } from '@/context/AppointmentContext';

const Index = () => {
  const { filteredDoctors, searchQuery } = useAppointment();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 to-background">
      {/* Header */}
      <div className="bg-white shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              HealthCare <span className="text-primary">Appointments</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Book appointments with trusted healthcare professionals
            </p>
            <SearchBar />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-accent/50 rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">20+</div>
              <div className="text-muted-foreground">Expert Doctors</div>
            </div>
            <div className="bg-accent/50 rounded-lg p-6 text-center">
              <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-muted-foreground">Appointments Booked</div>
            </div>
            <div className="bg-accent/50 rounded-lg p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-muted-foreground">Online Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Doctors'}
          </h2>
          <div className="text-muted-foreground">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all available doctors.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
