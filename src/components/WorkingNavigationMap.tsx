import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Route, Loader } from 'lucide-react';

// For now, let's create a functional map placeholder that actually works
// We can enhance it with full Leaflet functionality once the basic structure is stable

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface MapComponentProps {
  userLocation?: Location;
  destination?: Location;
  nearbyRickshaws?: Location[];
  onLocationSelect?: (location: Location) => void;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  userLocation,
  destination,
  nearbyRickshaws = [],
  onLocationSelect,
  className = ''
}) => {
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onLocationSelect) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Convert click position to approximate coordinates (mock calculation)
      const lat = 26.7606 + (0.01 * (0.5 - y / rect.height));
      const lng = 83.3732 + (0.01 * (x / rect.width - 0.5));
      
      onLocationSelect({
        lat,
        lng,
        name: `Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      });
    }
  };

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div 
        className="h-full w-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg cursor-crosshair relative overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
            ))}
          </div>
        </div>

        {/* Rivers/Roads Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <path d="M0,200 Q200,180 400,200 T800,200" stroke="#3B82F6" strokeWidth="3" fill="none" />
          <path d="M100,0 L100,400" stroke="#6B7280" strokeWidth="2" fill="none" />
          <path d="M300,0 L300,400" stroke="#6B7280" strokeWidth="2" fill="none" />
          <path d="M0,150 L800,150" stroke="#6B7280" strokeWidth="2" fill="none" />
        </svg>

        {/* Location Markers */}
        {userLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                📍 You are here
              </div>
            </div>
          </div>
        )}

        {destination && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${50 + (destination.lng - 83.3732) * 1000}%`,
              top: `${50 - (destination.lat - 26.7606) * 1000}%`
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                🎯
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap max-w-32 text-center">
                {destination.name}
              </div>
            </div>
          </div>
        )}

        {/* Nearby Rickshaws */}
        {nearbyRickshaws.map((rickshaw, index) => (
          <div 
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${50 + (rickshaw.lng - 83.3732) * 1000}%`,
              top: `${50 - (rickshaw.lat - 26.7606) * 1000}%`
            }}
          >
            <div className="relative group">
              <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                🛺
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {rickshaw.name}
              </div>
            </div>
          </div>
        ))}

        {/* Click instruction */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          Click anywhere to set destination
        </div>
      </div>
    </div>
  );
};

// Main Navigation Map Component with controls
const WorkingNavigationMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | undefined>();
  const [destination, setDestination] = useState<Location | undefined>();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  // Sample nearby rickshaws
  const nearbyRickshaws: Location[] = [
    { lat: 26.7616, lng: 83.3742, name: "Rickshaw #101" },
    { lat: 26.7596, lng: 83.3722, name: "Rickshaw #102" },
    { lat: 26.7586, lng: 83.3752, name: "Rickshaw #103" },
    { lat: 26.7626, lng: 83.3712, name: "Rickshaw #104" },
  ];

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
        setLocationError('Unable to retrieve your location. Using default location.');
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
        maximumAge: 300000
      }
    );
  };

  const handleDestinationSelect = (location: Location) => {
    setDestination(location);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Map Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-indigo-600 dark:text-amber-400" />
            Interactive Navigation Map
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Current: {userLocation?.name || 'Getting location...'}
            </span>
          </div>
          <div className="flex items-center">
            <Route className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Destination: {destination?.name || 'Click on map to set'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {locationError && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-700 dark:text-amber-300">{locationError}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setDestination({
              lat: 26.7556, lng: 83.3697, name: "Gorakhpur Railway Station"
            })}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🚂 Railway Station
          </button>
          <button
            onClick={() => setDestination({
              lat: 26.7389, lng: 83.4036, name: "Gorakhpur Airport"
            })}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ✈️ Airport
          </button>
          <button
            onClick={() => setDestination({
              lat: 26.7481, lng: 83.3725, name: "City Mall"
            })}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🛍️ City Mall
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 min-h-[400px]">
        <MapComponent
          userLocation={userLocation}
          destination={destination}
          nearbyRickshaws={nearbyRickshaws}
          onLocationSelect={handleDestinationSelect}
          className="rounded-b-lg"
        />
      </div>

      {/* Map Legend */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Your Location
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Destination
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
            Available Rickshaws
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingNavigationMap;
