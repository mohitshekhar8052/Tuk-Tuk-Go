import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, Route, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedNavigationMap from '../components/EnhancedNavigationMap';

const MapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mr-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center">
                <Navigation className="w-8 h-8 text-indigo-600 dark:text-amber-400 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Navigation & <span className="text-indigo-600 dark:text-amber-400">Route Planning</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[600px]">
              <EnhancedNavigationMap />
            </div>
          </motion.div>

          {/* Information Panel */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* How to Use */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-indigo-600 dark:text-amber-400" />
                How to Use
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Get Your Location</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click "My Location" to find your current position</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Set Destination</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click anywhere on the map or use quick destinations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Find Rickshaws</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">View nearby available rickshaws on the map</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Route className="w-5 h-5 mr-2 text-indigo-600 dark:text-amber-400" />
                Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Real-time location tracking</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 text-amber-600 mr-3">🛺</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Nearby rickshaw availability</span>
                </div>
                <div className="flex items-center">
                  <Route className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Interactive route planning</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 text-purple-600 mr-3">📍</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Quick destination shortcuts</span>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🏛️ Popular Destinations
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <span className="mr-3">🚂</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Railway Station</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2.5 km</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <span className="mr-3">✈️</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Airport</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">8.2 km</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <span className="mr-3">🛍️</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">City Mall</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">1.8 km</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div 
              className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-amber-500 dark:to-amber-600 rounded-2xl p-6 text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-2">Ready to Book?</h3>
              <p className="text-sm opacity-90 mb-4">Found your destination? Book a rickshaw now for a comfortable ride!</p>
              <Link
                to="/booking"
                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
              >
                <span className="mr-2">🛺</span>
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
