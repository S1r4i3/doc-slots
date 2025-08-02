export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: 'available' | 'busy' | 'unavailable';
  experience: number;
  rating: number;
  education: string;
  bio: string;
  availableSlots: string[];
  consultationFee: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface AppointmentFormData {
  patientName: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
}