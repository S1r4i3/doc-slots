import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppointment } from '@/context/AppointmentContext';
import { useToast } from '@/hooks/use-toast';
import { Doctor, AppointmentFormData } from '@/types';

interface AppointmentFormProps {
  doctor: Doctor;
  onSuccess?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor, onSuccess }) => {
  const { addAppointment } = useAppointment();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const [errors, setErrors] = useState<Partial<AppointmentFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentFormData> = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Name is required';
    }
    
    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email';
    }
    
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Date is required';
    }
    
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      addAppointment({
        doctorId: doctor.id,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        status: 'confirmed',
      });

      setIsSubmitted(true);
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${doctor.name} has been confirmed.`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-available rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Appointment Confirmed!</h3>
          <p className="text-muted-foreground mb-4">
            Your appointment with {doctor.name} on {formData.appointmentDate} at {formData.appointmentTime} has been confirmed.
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to {formData.patientEmail}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Book Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="patientName"
              type="text"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              placeholder="Enter your full name"
              className={errors.patientName ? 'border-destructive' : ''}
            />
            {errors.patientName && (
              <p className="text-sm text-destructive">{errors.patientName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientEmail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="patientEmail"
              type="email"
              value={formData.patientEmail}
              onChange={(e) => handleInputChange('patientEmail', e.target.value)}
              placeholder="Enter your email address"
              className={errors.patientEmail ? 'border-destructive' : ''}
            />
            {errors.patientEmail && (
              <p className="text-sm text-destructive">{errors.patientEmail}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Appointment Date</Label>
            <Input
              id="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
              min={today}
              className={errors.appointmentDate ? 'border-destructive' : ''}
            />
            {errors.appointmentDate && (
              <p className="text-sm text-destructive">{errors.appointmentDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Available Time Slots
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={formData.appointmentTime === slot ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleInputChange('appointmentTime', slot)}
                  className="h-10"
                >
                  {slot}
                </Button>
              ))}
            </div>
            {errors.appointmentTime && (
              <p className="text-sm text-destructive">{errors.appointmentTime}</p>
            )}
          </div>

          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Appointment Summary</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Doctor: {doctor.name}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Consultation Fee: ${doctor.consultationFee}</p>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base">
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};