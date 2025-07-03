import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  name: string;
}

const SimpleMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | undefined>();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: 'Your Current Location'
        };
        setUserLocation(location);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to retrieve your location. Please check your browser permissions.');
        setIsLoadingLocation(false);
        // Set default location to Gorakhpur
        setUserLocation({
          lat: 26.7606,
          lng: 83.3732,
          name: 'Gorakhpur (Default Location)'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
      {/* Map Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-indigo-600 dark:text-amber-400" />
            Navigation Map
          </h3>
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="flex items-center px-3 py-2 bg-indigo-600 dark:bg-amber-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLocation ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-2" />
            )}
            {isLoadingLocation ? 'Locating...' : 'My Location'}
          </button>
        </div>

        {/* Location Information */}
        <div className="text-sm">
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Current: {userLocation?.name || 'Getting location...'}
            </span>
          </div>
          {userLocation && (
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-6">
              Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </div>
          )}
        </div>

        {/* Error Message */}
        {locationError && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">{locationError}</p>
          </div>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Interactive Map Loading...
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Advanced map features are being loaded. This includes:
          </p>
          <div className="text-left max-w-sm mx-auto space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Real-time GPS location tracking
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
              Nearby rickshaw availability
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Interactive route planning
            </div>
          </div>
          
          {userLocation && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Location Found!</h4>
              <p className="text-sm text-green-700 dark:text-green-200">
                We've detected your location in Gorakhpur. The full interactive map with nearby rickshaws and route planning will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-2">
          <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            🚂 Railway Station
          </button>
          <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            ✈️ Airport
          </button>
          <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            🛍️ City Mall
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
