import { Link } from 'react-router-dom';
import { Star, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/types';
import { cn } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-available text-white';
      case 'busy':
        return 'bg-busy text-white';
      case 'unavailable':
        return 'bg-unavailable text-white';
      default:
        return 'bg-muted';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available Today';
      case 'busy':
        return 'Limited Slots';
      case 'unavailable':
        return 'Not Available';
      default:
        return availability;
    }
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-hover)] group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                doctor.availability === 'available' ? 'bg-available' : 
                doctor.availability === 'busy' ? 'bg-busy' : 'bg-unavailable'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">{doctor.specialization}</p>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-muted-foreground">• {doctor.experience} years exp.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <Badge className={getAvailabilityColor(doctor.availability)}>
              {getAvailabilityText(doctor.availability)}
            </Badge>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>${doctor.consultationFee} consultation</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{doctor.availableSlots.length} slots available</span>
            </div>
          </div>

          <div className="mt-auto">
            <Link to={`/doctor/${doctor.id}`}>
              <Button 
                className="w-full" 
                variant={doctor.availability === 'available' ? 'default' : 'secondary'}
                disabled={doctor.availability === 'unavailable'}
              >
                {doctor.availability === 'unavailable' ? 'Unavailable' : 'View Profile'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};