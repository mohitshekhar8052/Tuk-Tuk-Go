import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Route, Loader, Zap, Car } from 'lucide-react';

// We'll create a working map without Leaflet for now to avoid CSS conflicts
// This can be enhanced with Leaflet once all dependencies are stable

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface EnhancedNavigationMapProps {
  className?: string;
}

const EnhancedNavigationMap: React.FC<EnhancedNavigationMapProps> = ({ className = '' }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyRickshaws, setNearbyRickshaws] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock nearby rickshaws data for Gorakhpur
  const mockRickshaws: Location[] = [
    { lat: 26.7556, lng: 83.3732, name: 'Rickshaw #1 - Available' },
    { lat: 26.7656, lng: 83.3632, name: 'Rickshaw #2 - En Route' },
    { lat: 26.7706, lng: 83.3832, name: 'Rickshaw #3 - Available' },
    { lat: 26.7506, lng: 83.3532, name: 'Rickshaw #4 - Available' },
    { lat: 26.7606, lng: 83.3932, name: 'Rickshaw #5 - Busy' },
  ];

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      // Default to Gorakhpur if geolocation not available
      setUserLocation({
        lat: 26.7606,
        lng: 83.3732,
        name: 'Gorakhpur, Uttar Pradesh'
      });
      setNearbyRickshaws(mockRickshaws);
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
        setNearbyRickshaws(mockRickshaws);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Fallback to Gorakhpur
        setUserLocation({
          lat: 26.7606,
          lng: 83.3732,
          name: 'Gorakhpur, Uttar Pradesh (Default)'
        });
        setNearbyRickshaws(mockRickshaws);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click position to approximate coordinates relative to Gorakhpur
    const lat = 26.7606 + (0.02 * (0.5 - y / rect.height));
    const lng = 83.3732 + (0.02 * (x / rect.width - 0.5));
    
    const clickedLocation: Location = {
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      name: `Selected Location`
    };
    
    setSelectedLocation(clickedLocation);
    if (!destination) {
      setDestination(clickedLocation);
    }
  };

  const setAsDestination = (location: Location) => {
    setDestination(location);
    setSelectedLocation(null);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Convert coordinates to pixel positions for visualization (mock map projection)
  const coordsToPixels = (lat: number, lng: number) => {
    const mapBounds = {
      north: 26.7806,
      south: 26.7406,
      east: 83.3932,
      west: 83.3532
    };
    
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white dark:bg-gray-800 ${className}`}>
      {/* Map Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-indigo-600 dark:text-amber-400" />
            Enhanced Navigation Map
          </h3>
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="flex items-center px-3 py-2 bg-indigo-600 dark:bg-amber-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoadingLocation ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 mr-2" />
            )}
            {isLoadingLocation ? 'Locating...' : 'My Location'}
          </button>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 truncate">
              From: {userLocation?.name || 'Getting location...'}
            </span>
          </div>
          <div className="flex items-center">
            <Route className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 truncate">
              To: {destination?.name || 'Tap on map to set destination'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={mapRef}
          className="w-full h-full bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-amber-900/10 cursor-crosshair relative"
          onClick={handleMapClick}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)
            `,
          }}
        >
          {/* Map Grid */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Roads */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 10 50 Q 50 30 90 50"
              stroke="#94a3b8"
              strokeWidth="3"
              fill="none"
              className="dark:stroke-gray-600"
            />
            <path
              d="M 50 10 Q 30 50 50 90"
              stroke="#94a3b8"
              strokeWidth="3"
              fill="none"
              className="dark:stroke-gray-600"
            />
          </svg>

          {/* User Location */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${coordsToPixels(userLocation.lat, userLocation.lng).x}%`,
                top: `${coordsToPixels(userLocation.lat, userLocation.lng).y}%`,
              }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-500"></div>
              </div>
            </div>
          )}

          {/* Destination */}
          {destination && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${coordsToPixels(destination.lat, destination.lng).x}%`,
                top: `${coordsToPixels(destination.lat, destination.lng).y}%`,
              }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Route className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500"></div>
              </div>
            </div>
          )}

          {/* Nearby Rickshaws */}
          {nearbyRickshaws.map((rickshaw, index) => {
            const position = coordsToPixels(rickshaw.lat, rickshaw.lng);
            const isAvailable = rickshaw.name.includes('Available');
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              >
                <div className="relative group">
                  <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                    isAvailable ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    <Car className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {rickshaw.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Selected Location */}
          {selectedLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{
                left: `${coordsToPixels(selectedLocation.lat, selectedLocation.lng).x}%`,
                top: `${coordsToPixels(selectedLocation.lat, selectedLocation.lng).y}%`,
              }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 min-w-[200px]">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Selected Location
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setAsDestination(selectedLocation)}
                    className="flex-1 px-3 py-1 bg-indigo-600 dark:bg-amber-500 text-white text-xs rounded hover:bg-indigo-700 dark:hover:bg-amber-600 transition-colors"
                  >
                    Set as Destination
                  </button>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Route Line */}
          {userLocation && destination && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={`M ${coordsToPixels(userLocation.lat, userLocation.lng).x} ${coordsToPixels(userLocation.lat, userLocation.lng).y} Q ${
                  (coordsToPixels(userLocation.lat, userLocation.lng).x + coordsToPixels(destination.lat, destination.lng).x) / 2
                } ${
                  Math.min(coordsToPixels(userLocation.lat, userLocation.lng).y, coordsToPixels(destination.lat, destination.lng).y) - 10
                } ${coordsToPixels(destination.lat, destination.lng).x} ${coordsToPixels(destination.lat, destination.lng).y}`}
                stroke="#6366f1"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse dark:stroke-amber-400"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setDestination({ lat: 26.7556, lng: 83.3732, name: 'Gorakhpur Railway Station' })}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🚂 Railway Station
          </button>
          <button 
            onClick={() => setDestination({ lat: 26.7406, lng: 83.3632, name: 'BRD Medical College' })}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🏥 Hospital
          </button>
          <button 
            onClick={() => setDestination({ lat: 26.7656, lng: 83.3832, name: 'City Mall Gorakhpur' })}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🛍️ City Mall
          </button>
          <button 
            onClick={() => setDestination({ lat: 26.7506, lng: 83.3532, name: 'Gorakhpur University' })}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            🎓 University
          </button>
        </div>
        
        {/* Book Rickshaw Button */}
        {destination && nearbyRickshaws.some(r => r.name.includes('Available')) && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-amber-500 dark:to-orange-500 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-amber-600 dark:hover:to-orange-600 transition-all duration-200 font-medium">
              <Zap className="w-5 h-5 mr-2" />
              Book Nearest Rickshaw
              <span className="ml-2 text-sm opacity-80">
                ({nearbyRickshaws.filter(r => r.name.includes('Available')).length} available)
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedNavigationMap;
