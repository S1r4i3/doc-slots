import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment } from '@/types';
import { mockDoctors } from '@/data/doctors';

interface AppointmentContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredDoctors: Doctor[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  getDoctorById: (id: string) => Doctor | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const getDoctorById = (id: string) => {
    return doctors.find(doctor => doctor.id === id);
  };

  return (
    <AppointmentContext.Provider value={{
      doctors,
      appointments,
      searchQuery,
      setSearchQuery,
      filteredDoctors,
      addAppointment,
      getDoctorById,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};