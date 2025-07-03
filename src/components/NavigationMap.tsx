import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { MapPin, Navigation, Route, Loader } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icons
const DefaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom marker icons
const createCustomIcon = (color: string, emoji: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.164 0 0 7.164 0 16c0 16 16 24 16 24s16-8 16-24C32 7.164 24.836 0 16 0z" fill="${color}"/>
      <circle cx="16" cy="16" r="10" fill="white"/>
      <text x="16" y="21" text-anchor="middle" font-size="16" fill="${color}">${emoji}</text>
    </svg>
  `)}`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

const userIcon = createCustomIcon('#10B981', '📍');
const rickshawIcon = createCustomIcon('#F59E0B', '🛺');
const destinationIcon = createCustomIcon('#EF4444', '🎯');

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

// Component to handle map events and location updates
const MapEventHandler: React.FC<{
  onLocationSelect?: (location: Location) => void;
  userLocation?: Location;
}> = ({ onLocationSelect, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 15);
    }
  }, [map, userLocation]);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          name: `Location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`
        });
      }
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationSelect]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  userLocation,
  destination,
  nearbyRickshaws = [],
  onLocationSelect,
  className = ''
}) => {
  // Default to Gorakhpur coordinates
  const defaultCenter: LatLngExpression = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : [26.7606, 83.3732]; // Gorakhpur, India

  return (
    <div className={`relative h-full w-full ${className}`}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="h-full w-full rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEventHandler 
          onLocationSelect={onLocationSelect}
          userLocation={userLocation}
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <MapPin className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <strong>Your Location</strong>
                <p className="text-sm text-gray-600">{userLocation.name}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination marker */}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
            <Popup>
              <div className="text-center">
                <Route className="w-4 h-4 text-red-600 mx-auto mb-1" />
                <strong>Destination</strong>
                <p className="text-sm text-gray-600">{destination.name}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Nearby rickshaws */}
        {nearbyRickshaws.map((rickshaw, index) => (
          <Marker
            key={index}
            position={[rickshaw.lat, rickshaw.lng]}
            icon={rickshawIcon}
          >
            <Popup>
              <div className="text-center">
                <span className="text-lg">🛺</span>
                <strong className="block">Available Rickshaw</strong>
                <p className="text-sm text-gray-600">{rickshaw.name}</p>
                <button className="mt-2 px-3 py-1 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors">
                  Book Now
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Main Navigation Map Component with controls
const NavigationMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | undefined>();
  const [destination, setDestination] = useState<Location | undefined>();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  // Sample nearby rickshaws (in production, this would come from an API)
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

  const handleDestinationSelect = (location: Location) => {
    setDestination(location);
  };

  useEffect(() => {
    // Get user location on component mount
    getCurrentLocation();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Map Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
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
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">{locationError}</p>
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

export default NavigationMap;
