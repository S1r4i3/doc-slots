import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, DollarSign, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppointmentForm } from '@/components/AppointmentForm';
import { useAppointment } from '@/context/AppointmentContext';
import { cn } from '@/lib/utils';

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { getDoctorById } = useAppointment();
  
  const doctor = id ? getDoctorById(id) : undefined;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Doctor Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-accent mx-auto md:mx-0"
                    />
                    <div className={cn(
                      "absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white",
                      doctor.availability === 'available' ? 'bg-available' : 
                      doctor.availability === 'busy' ? 'bg-busy' : 'bg-unavailable'
                    )} />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                    <p className="text-xl text-primary mb-4">{doctor.specialization}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-muted-foreground">Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{doctor.experience}</span>
                        <span className="text-muted-foreground">Years Experience</span>
                      </div>
                    </div>
                    
                    <Badge className={getAvailabilityColor(doctor.availability)}>
                      {getAvailabilityText(doctor.availability)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  About Dr. {doctor.name.split(' ')[1]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-muted-foreground">{doctor.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Biography</h4>
                    <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-1">Consultation Fee</h4>
                    <p className="text-2xl font-bold text-primary">${doctor.consultationFee}</p>
                  </div>
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-1">Available Slots</h4>
                    <p className="text-2xl font-bold text-secondary">{doctor.availableSlots.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Form */}
          <div className="lg:col-span-1">
            {doctor.availability !== 'unavailable' ? (
              <AppointmentForm doctor={doctor} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Currently Unavailable</h3>
                  <p className="text-muted-foreground">
                    Dr. {doctor.name.split(' ')[1]} is not taking appointments at the moment. 
                    Please check back later or contact our support team.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;