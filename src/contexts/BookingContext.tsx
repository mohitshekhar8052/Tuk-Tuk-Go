import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  name?: string;
}

export interface Booking {
  id: string;
  userId: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  scheduledTime: Date;
  fare: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  driverInfo?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicleNumber: string;
    vehicleModel: string;
  };
  createdAt: Date;
  estimatedDuration: number; // in minutes
  distance: number; // in kilometers
}

interface BookingContextType {
  currentBooking: Booking | null;
  bookingHistory: Booking[];
  isBooking: boolean;
  createBooking: (pickupLocation: Location, dropoffLocation: Location, scheduledTime: Date) => Promise<{ success: boolean; message: string; booking?: Booking }>;
  cancelBooking: (bookingId: string) => Promise<{ success: boolean; message: string }>;
  getBookingHistory: () => Booking[];
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  const calculateFare = (distance: number): number => {
    // Base fare: ₹50
    // Per km: ₹15
    const baseFare = 50;
    const perKmRate = 15;
    return baseFare + (distance * perKmRate);
  };

  const calculateDistance = (pickup: Location, dropoff: Location): number => {
    // Simple distance calculation (in real app, use Google Maps API)
    const R = 6371; // Earth's radius in km
    const dLat = (dropoff.lat - pickup.lat) * Math.PI / 180;
    const dLng = (dropoff.lng - pickup.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pickup.lat * Math.PI / 180) * Math.cos(dropoff.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const createBooking = async (
    pickupLocation: Location,
    dropoffLocation: Location,
    scheduledTime: Date
  ): Promise<{ success: boolean; message: string; booking?: Booking }> => {
    setIsBooking(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const distance = calculateDistance(pickupLocation, dropoffLocation);
      const fare = calculateFare(distance);
      const estimatedDuration = Math.round(distance * 3); // Rough estimate: 3 min per km

      const newBooking: Booking = {
        id: `booking_${Date.now()}`,
        userId: 'user_1', // In real app, get from auth context
        pickupLocation,
        dropoffLocation,
        scheduledTime,
        fare,
        status: 'pending',
        createdAt: new Date(),
        estimatedDuration,
        distance: Math.round(distance * 100) / 100 // Round to 2 decimal places
      };

      // Simulate driver assignment after 3 seconds
      setTimeout(() => {
        const driverInfo = {
          id: 'driver_123',
          name: 'Rajesh Kumar',
          phone: '+91 9876543210',
          rating: 4.8,
          vehicleNumber: 'KA 01 AB 1234',
          vehicleModel: 'Bajaj RE Auto'
        };

        const updatedBooking = { ...newBooking, status: 'confirmed' as const, driverInfo };
        setCurrentBooking(updatedBooking);
        setBookingHistory(prev => prev.map(b => b.id === newBooking.id ? updatedBooking : b));
      }, 3000);

      setCurrentBooking(newBooking);
      setBookingHistory(prev => [newBooking, ...prev]);

      return {
        success: true,
        message: 'Booking created successfully! Looking for nearby drivers...',
        booking: newBooking
      };
    } catch (error) {
      console.error('Booking error:', error);
      return {
        success: false,
        message: 'Failed to create booking. Please try again.'
      };
    } finally {
      setIsBooking(false);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentBooking(prev => prev?.id === bookingId ? null : prev);
      setBookingHistory(prev =>
        prev.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );

      return { success: true, message: 'Booking cancelled successfully.' };
    } catch (error) {
      console.error('Cancel booking error:', error);
      return { success: false, message: 'Failed to cancel booking. Please try again.' };
    }
  };

  const getBookingHistory = (): Booking[] => {
    return bookingHistory;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setCurrentBooking(prev =>
      prev?.id === bookingId ? { ...prev, status } : prev
    );
    setBookingHistory(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const value: BookingContextType = {
    currentBooking,
    bookingHistory,
    isBooking,
    createBooking,
    cancelBooking,
    getBookingHistory,
    updateBookingStatus
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
