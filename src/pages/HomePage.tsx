import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, DollarSign } from 'lucide-react';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white transition-colors duration-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Urban Adventures <br /><span className="text-amber-400">On Three Wheels</span></h1>
            <p className="text-indigo-100 dark:text-gray-300 text-lg mb-8 max-w-md">
              Explore the Gorakhpur city's hidden gems with our authentic auto-rickshaw experience. Convenient, affordable, and environmentally friendly transportation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/booking"
                className="bg-amber-500 hover:bg-amber-600 text-indigo-900 dark:text-gray-900 font-bold py-3 px-6 rounded-lg transition shadow-lg text-center"
              >
                Book a Ride
              </Link>
              <Link 
                to="/map"
                className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg text-center flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Location
              </Link>
              <Link 
                to="/services"
                className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-900 dark:hover:text-gray-900 transition text-center"
              >
                View Packages
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-full opacity-20"></div>
            <img 
              src="pngwing.com.png" 
              alt="Auto Rickshaw in city street" 
              className="rounded-lg shadow-xl relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-900 dark:text-amber-400">50+</p>
              <p className="text-gray-600 dark:text-gray-300">Rickshaws</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900 dark:text-amber-400">5K+</p>
              <p className="text-gray-600 dark:text-gray-300">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900 dark:text-amber-400">Gorakhpur</p>
              <p className="text-gray-600 dark:text-gray-300">Cities</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900 dark:text-amber-400">4.8</p>
              <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-amber-50 dark:bg-gray-900 transition-colors duration-300" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover the many ways our auto-rickshaws can enhance your urban travel experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 dark:group-hover:bg-amber-500 transition-colors">
                <Clock className="text-indigo-900 group-hover:text-amber-400 dark:group-hover:text-indigo-900 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">City Tours</h3>
              <p className="text-gray-600 dark:text-gray-300">Explore the city's landmarks, hidden gems, and cultural hotspots with our knowledgeable drivers as your guides.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 dark:text-amber-400 font-medium hover:text-indigo-700 dark:hover:text-amber-300">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 dark:group-hover:bg-amber-500 transition-colors">
                <MapPin className="text-indigo-900 group-hover:text-amber-400 dark:group-hover:text-indigo-900 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">Point-to-Point</h3>
              <p className="text-gray-600 dark:text-gray-300">Quick and efficient transportation from one location to another, perfect for daily commutes or short trips around town.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 dark:text-amber-400 font-medium hover:text-indigo-700 dark:hover:text-amber-300">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 dark:group-hover:bg-amber-500 transition-colors">
                <DollarSign className="text-indigo-900 group-hover:text-amber-400 dark:group-hover:text-indigo-900 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">Hourly Packages</h3>
              <p className="text-gray-600 dark:text-gray-300">Book a rickshaw for multiple hours and explore at your own pace with our flexible hourly rental packages.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 dark:text-amber-400 font-medium hover:text-indigo-700 dark:hover:text-amber-300">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Booking your auto-rickshaw ride is simple and convenient</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-indigo-900 font-bold text-xl">1</span>
                <div className="absolute h-1 bg-amber-400 w-full right-0 top-1/2 -translate-y-1/2 -z-10 md:w-full md:left-full"></div>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">Book Online</h3>
              <p className="text-gray-600 dark:text-gray-300">Use our app or website to book your ride in just a few taps</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-indigo-900 font-bold text-xl">2</span>
                <div className="absolute h-1 bg-amber-400 w-full right-0 top-1/2 -translate-y-1/2 -z-10 md:w-full md:left-full"></div>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">Get Picked Up</h3>
              <p className="text-gray-600 dark:text-gray-300">Your driver will arrive at your location promptly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-900 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-3">Enjoy Your Ride</h3>
              <p className="text-gray-600 dark:text-gray-300">Sit back and experience the authentic auto-rickshaw journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
