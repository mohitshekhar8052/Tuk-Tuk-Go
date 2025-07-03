import React, { useState } from 'react';
import { useBooking, type Location } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const BookingPage: React.FC = () => {
  const { createBooking, currentBooking, isBooking, cancelBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Mock locations for demo (in real app, use Google Places API)
  const mockLocations: Location[] = [
    { lat: 12.9716, lng: 77.5946, address: 'MG Road, Bangalore', name: 'MG Road Metro Station' },
    { lat: 12.9762, lng: 77.6033, address: 'Brigade Road, Bangalore', name: 'Brigade Road' },
    { lat: 12.9698, lng: 77.7500, address: 'Whitefield, Bangalore', name: 'Whitefield Main Road' },
    { lat: 12.9352, lng: 77.6245, address: 'Koramangala, Bangalore', name: 'Koramangala 5th Block' },
    { lat: 12.9279, lng: 77.6271, address: 'BTM Layout, Bangalore', name: 'BTM Layout 1st Stage' }
  ];

  const findLocationByAddress = (address: string): Location => {
    const found = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(address.toLowerCase()) ||
      loc.name?.toLowerCase().includes(address.toLowerCase())
    );
    return found || {
      lat: 12.9716 + Math.random() * 0.1,
      lng: 77.5946 + Math.random() * 0.1,
      address: address || 'Unknown Location'
    };
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setMessage('Please login to book a ride.');
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      setMessage('Please fill in both pickup and dropoff locations.');
      return;
    }

    const pickup = findLocationByAddress(pickupLocation);
    const dropoff = findLocationByAddress(dropoffLocation);
    const scheduleDate = scheduledTime ? new Date(scheduledTime) : new Date();

    const result = await createBooking(pickup, dropoff, scheduleDate);
    setMessage(result.message);

    if (result.success) {
      setPickupLocation('');
      setDropoffLocation('');
      setScheduledTime('');
    }
  };

  const handleCancelBooking = async () => {
    if (currentBooking) {
      const result = await cancelBooking(currentBooking.id);
      setMessage(result.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please login to book a ride.
          </p>
          <a
            href="/login"
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Book Your Tuk-Tuk Ride
        </h1>

        {/* Current Booking Status */}
        {currentBooking && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              Current Booking
            </h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Booking ID:</span> {currentBooking.id}</p>
              <p><span className="font-medium">From:</span> {currentBooking.pickupLocation.address}</p>
              <p><span className="font-medium">To:</span> {currentBooking.dropoffLocation.address}</p>
              <p><span className="font-medium">Fare:</span> ₹{currentBooking.fare}</p>
              <p><span className="font-medium">Distance:</span> {currentBooking.distance} km</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                  currentBooking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  currentBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
                </span>
              </p>
              {currentBooking.driverInfo && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">Driver Details</h3>
                  <p><span className="font-medium">Name:</span> {currentBooking.driverInfo.name}</p>
                  <p><span className="font-medium">Phone:</span> {currentBooking.driverInfo.phone}</p>
                  <p><span className="font-medium">Vehicle:</span> {currentBooking.driverInfo.vehicleModel} ({currentBooking.driverInfo.vehicleNumber})</p>
                  <p><span className="font-medium">Rating:</span> ⭐ {currentBooking.driverInfo.rating}/5</p>
                </div>
              )}
            </div>
            {currentBooking.status === 'pending' && (
              <button
                onClick={handleCancelBooking}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Cancel Booking
              </button>
            )}
          </div>
        )}

        {/* Booking Form */}
        {!currentBooking && (
          <form onSubmit={handleBooking} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter pickup location (e.g., MG Road, Brigade Road)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dropoff Location
                </label>
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Enter destination (e.g., Whitefield, Koramangala)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scheduled Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Leave blank for immediate booking
                </p>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isBooking ? 'Creating Booking...' : 'Book Ride'}
              </button>
            </div>
          </form>
        )}

        {/* Message Display */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('success') ? 
            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 
            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        {/* Popular Locations */}
        {!currentBooking && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Popular Locations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => setPickupLocation(location.address)}
                  className="text-left p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-400 transition-colors"
                >
                  <div className="font-medium text-gray-800 dark:text-white">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {location.address}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
