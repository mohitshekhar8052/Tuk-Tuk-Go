import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X, MapPin, Calendar, Users, Phone } from 'lucide-react';
import { bookingFormSchema, BookingFormData } from '../utils/validationSchemas';
import LoadingSpinner from './LoadingSpinner';
import { Alert } from './ErrorBoundary';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingFormSchema)
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('Booking submitted:', data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Booking request submitted successfully! We\'ll contact you shortly to confirm.'
      });
      reset();
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-900 dark:text-white">Book a Ride</h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
            >
              <X size={24} />
            </button>
          </div>

          {submitStatus.type && (
            <div className="mb-6">
              <Alert
                type={submitStatus.type}
                message={submitStatus.message}
                onClose={() => setSubmitStatus({ type: null, message: '' })}
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="pickup" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <MapPin className="inline w-4 h-4 mr-1" />
                Pickup Location *
              </label>
              <input
                {...register('pickup')}
                type="text"
                id="pickup"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                  errors.pickup ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter pickup location"
              />
              {errors.pickup && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pickup.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="destination" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <MapPin className="inline w-4 h-4 mr-1" />
                Destination *
              </label>
              <input
                {...register('destination')}
                type="text"
                id="destination"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                  errors.destination ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter destination"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.destination.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="datetime" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <Calendar className="inline w-4 h-4 mr-1" />
                Date & Time *
              </label>
              <input
                {...register('datetime')}
                type="datetime-local"
                id="datetime"
                min={new Date().toISOString().slice(0, 16)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                  errors.datetime ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.datetime && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.datetime.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="passengers" className="block text-gray-700 mb-2 font-medium">
                <Users className="inline w-4 h-4 mr-1" />
                Number of Passengers *
              </label>
              <select
                {...register('passengers', { valueAsNumber: true })}
                id="passengers"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.passengers ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select passengers</option>
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
              </select>
              {errors.passengers && (
                <p className="mt-1 text-sm text-red-600">{errors.passengers.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number *
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-900 hover:bg-indigo-800 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Booking...
                  </>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
