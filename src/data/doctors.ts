import { Doctor } from '@/types';
import doctorCardiology from '@/assets/doctor-cardiology.jpg';
import doctorDermatology from '@/assets/doctor-dermatology.jpg';
import doctorOrthopedics from '@/assets/doctor-orthopedics.jpg';
import doctorPediatrics from '@/assets/doctor-pediatrics.jpg';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    profileImage: doctorCardiology,
    availability: 'available',
    experience: 12,
    rating: 4.8,
    education: 'MD from Harvard Medical School',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management.',
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    consultationFee: 250
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    profileImage: doctorDermatology,
    availability: 'available',
    experience: 8,
    rating: 4.9,
    education: 'MD from Johns Hopkins University',
    bio: 'Dr. Michael Chen is a dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and performing dermatological procedures.',
    availableSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    consultationFee: 200
  },
  {
    id: '3',
    name: 'Dr. Robert Williams',
    specialization: 'Orthopedics',
    profileImage: doctorOrthopedics,
    availability: 'busy',
    experience: 15,
    rating: 4.7,
    education: 'MD from Mayo Clinic',
    bio: 'Dr. Robert Williams is an orthopedic surgeon with 15 years of experience in joint replacement surgery and sports medicine. He specializes in minimally invasive procedures.',
    availableSlots: ['16:00', '17:00'],
    consultationFee: 300
  },
  {
    id: '4',
    name: 'Dr. Emily Davis',
    specialization: 'Pediatrics',
    profileImage: doctorPediatrics,
    availability: 'available',
    experience: 10,
    rating: 4.9,
    education: 'MD from Stanford University',
    bio: 'Dr. Emily Davis is a pediatrician who provides comprehensive care for children from infancy through adolescence. She has a special interest in developmental pediatrics.',
    availableSlots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'],
    consultationFee: 180
  }
];