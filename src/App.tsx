import React from 'react';
import { MapPin, Clock, Phone, ChevronRight, Star, Menu, X, Facebook, Twitter, Instagram, Truck, Shield, DollarSign } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="bg-indigo-900 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="text-amber-400" size={28} />
            <span className="font-bold text-2xl">Tuk-Tuk</span>
            <span className="text-amber-400 font-bold text-2xl">Go</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-amber-400 transition">Home</a>
            <a href="#services" className="hover:text-amber-400 transition">Services</a>
            <a href="#about" className="hover:text-amber-400 transition">About</a>
            <a href="#testimonials" className="hover:text-amber-400 transition">Testimonials</a>
            <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-800 px-4 py-2">
            <div className="flex flex-col space-y-3 pb-3">
              <a href="#" className="hover:text-amber-400 transition">Home</a>
              <a href="#services" className="hover:text-amber-400 transition">Services</a>
              <a href="#about" className="hover:text-amber-400 transition">About</a>
              <a href="#testimonials" className="hover:text-amber-400 transition">Testimonials</a>
              <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Urban Adventures <br /><span className="text-amber-400">On Three Wheels</span></h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-md">
              Explore the Gorakhpur city's hidden gems with our authentic auto-rickshaw experience. Convenient, affordable, and environmentally friendly transportation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-3 px-6 rounded-lg transition shadow-lg">
                Book a Ride
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-900 transition">
                View Packages
              </button>
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-900">50+</p>
              <p className="text-gray-600">Rickshaws</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900">5K+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900">Gorakhpur</p>
              <p className="text-gray-600">Cities</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-900">4.8</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-amber-50" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover the many ways our auto-rickshaws can enhance your urban travel experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 transition-colors">
                <Clock className="text-indigo-900 group-hover:text-amber-400 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">City Tours</h3>
              <p className="text-gray-600">Explore the city's landmarks, hidden gems, and cultural hotspots with our knowledgeable drivers as your guides.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 font-medium hover:text-indigo-700">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 transition-colors">
                <MapPin className="text-indigo-900 group-hover:text-amber-400 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Point-to-Point</h3>
              <p className="text-gray-600">Quick and efficient transportation from one location to another, perfect for daily commutes or short trips around town.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 font-medium hover:text-indigo-700">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition group">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-900 transition-colors">
                <DollarSign className="text-indigo-900 group-hover:text-amber-400 transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Hourly Packages</h3>
              <p className="text-gray-600">Book a rickshaw for multiple hours and explore at your own pace with our flexible hourly rental packages.</p>
              <a href="#" className="inline-flex items-center mt-4 text-indigo-900 font-medium hover:text-indigo-700">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-indigo-900 text-white" id="about">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 border-4 border-amber-400 rounded-lg opacity-30"></div>
              <img 
                src="for about section.png" 
                alt="Auto Rickshaw driver" 
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Auto-Rickshaw Story</h2>
              <p className="mb-6 text-indigo-100">
                An auto-rickshaw is a three-wheeled motorized vehicle commonly used for public transportation in many countries, especially in South Asia, Southeast Asia, and parts of Africa.
              </p>
              <p className="mb-6 text-indigo-100">
                These iconic vehicles are known for their maneuverability in congested streets and their affordability, making them an essential part of urban transportation in many developing regions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <div className="flex items-center">
                  <div className="bg-amber-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Shield className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Safe & Secure</h4>
                    <p className="text-indigo-200 text-sm">All drivers verified</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-amber-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">24/7 Service</h4>
                    <p className="text-indigo-200 text-sm">Always available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Booking your auto-rickshaw ride is simple and convenient</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-indigo-900 font-bold text-xl">1</span>
                <div className="absolute h-1 bg-amber-400 w-full right-0 top-1/2 -translate-y-1/2 -z-10 md:w-full md:left-full"></div>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Book Online</h3>
              <p className="text-gray-600">Use our app or website to book your ride in just a few taps</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-indigo-900 font-bold text-xl">2</span>
                <div className="absolute h-1 bg-amber-400 w-full right-0 top-1/2 -translate-y-1/2 -z-10 md:w-full md:left-full"></div>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Get Picked Up</h3>
              <p className="text-gray-600">Your driver will arrive at your location promptly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-900 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Enjoy Your Ride</h3>
              <p className="text-gray-600">Sit back and experience the authentic auto-rickshaw journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-50" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Customer Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear what our customers have to say about their auto-rickshaw experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-8 text-amber-400">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex text-amber-500 mb-4 mt-4">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="white" />
                <Star size={20} fill="white" />
              </div>
              <p className="text-gray-600 mb-6">"The auto-rickshaw tour was the highlight of my trip! The driver was knowledgeable and showed me parts of the city I would have never discovered on my own."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full mr-4 flex items-center justify-center text-indigo-900 font-bold">RA</div>
                <div>
                  <h4 className="font-bold text-indigo-900"> Rehan Ashraf</h4>
                  <p className="text-gray-500 text-sm"> Local Resident</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-8 text-amber-400">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex text-amber-500 mb-4 mt-4">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="white" />
              </div>
              <p className="text-gray-600 mb-6">"I use the auto-rickshaw service daily for my commute. It's reliable, affordable, and much faster than other transportation options in the busy city streets."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full mr-4 flex items-center justify-center text-indigo-900 font-bold">SS</div>
                <div>
                  <h4 className="font-bold text-indigo-900">Shubhi Srivastava</h4>
                  <p className="text-gray-500 text-sm">Tourist from Banaras</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 left-8 text-amber-400">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex text-amber-500 mb-4 mt-4">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
              <p className="text-gray-600 mb-6">"The booking app is so convenient! I can get an auto-rickshaw within minutes, and the fare estimation feature helps me plan my travel budget."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full mr-4 flex items-center justify-center text-indigo-900 font-bold">SA</div>
                <div>
                  <h4 className="font-bold text-indigo-900">Sneha Agarwal </h4>
                  <p className="text-gray-500 text-sm">Business Traveler From Mathura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Download Our App</h2>
              <p className="mb-8 text-indigo-100 max-w-md">
                Get the full TukGo experience with our mobile app. Book rides, track your driver, and manage payments all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39069C17.2336 7.6697 16.1558 8.19268 16.1558 9.68456C16.1558 11.3529 17.4561 11.8915 17.5227 11.8915C17.5227 11.8915 17.4762 12.9549 16.8136 13.8675C16.3051 14.6512 15.7099 15.4164 14.8452 15.4164C14.0363 15.4164 13.7671 14.9044 12.8139 14.9044C11.9295 14.9044 11.4925 15.4349 10.7867 15.4349C9.98101 15.4349 9.32633 14.6142 8.80461 13.8491C8.09488 12.8235 7.48047 11.2031 7.48047 9.68456C7.48047 7.08465 9.2453 5.68054 10.9709 5.68054C11.7983 5.68054 12.4923 6.25679 13.0209 6.25679C13.5311 6.25679 14.3215 5.65283 15.2873 5.65283C15.6588 5.65283 16.7366 5.70825 17.5227 7.39069ZM13.0024 4.96909C13.2915 4.61237 13.4895 4.11085 13.4895 3.60934C13.4895 3.51997 13.4811 3.43059 13.4645 3.35969C12.9358 3.37816 12.3329 3.63869 11.9799 4.05778C11.7092 4.35987 11.4741 4.86138 11.4741 5.37137C11.4741 5.46922 11.491 5.56706 11.4994 5.60401C11.5443 5.61349 11.6174 5.62296 11.6906 5.62296C12.1622 5.62296 12.7219 5.38089 13.0024 4.96909Z" />
                  </svg>
                  App Store
                </button>
                <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.60951 20.7885C3.39516 20.4588 3.20456 20.1009 3.04095 19.7192C2.67059 18.8205 2.47998 17.8386 2.47998 16.7735V7.22646C2.47998 6.16134 2.67059 5.17945 3.04095 4.28073C3.20456 3.89905 3.39516 3.54117 3.60951 3.21152C4.03473 2.59501 4.61213 2.09349 5.29678 1.76384C5.98143 1.43419 6.74183 1.25 7.54598 1.25H16.454C17.2582 1.25 18.0186 1.43419 18.7032 1.76384C19.3879 2.09349 19.9653 2.59501 20.3905 3.21152C20.6048 3.54117 20.7954 3.89905 20.959 4.28073C21.3294 5.17945 21.52 6.16134 21.52 7.22646V16.7735C21.52 17.8386 21.3294 18.8205 20.959 19.7192C20.7954 20.1009 20.6048 20.4588 20.3905 20.7885C19.9653 21.405 19.3879 21.9065 18.7032 22.2362C18.0186 22.5658 17.2582 22.75 16.454 22.75H7.54598C6.74183 22.75 5.98143 22.5658 5.29678 22.2362C4.61213 21.9065 4.03473 21.405 3.60951 20.7885ZM12.7954 7.95929L16.7819 11.9458C16.9426 12.1063 17.0229 12.3143 17.0229 12.5459C17.0229 12.7775 16.9426 12.9855 16.7819 13.146L12.7954 17.1325C12.6348 17.2931 12.4268 17.3734 12.1714 17.3734C11.916 17.3734 11.708 17.2931 11.5474 17.1325L11.1771 16.7622C11.0164 16.6016 10.9361 16.3936 10.9361 16.1383C10.9361 15.8829 11.0164 15.6749 11.1771 15.5143L13.5474 13.1439H7.54598C7.29069 13.1439 7.08273 13.0636 6.9221 12.9029C6.76147 12.7423 6.68116 12.5343 6.68116 12.279V12.8128C6.68116 12.5575 6.76147 12.3495 6.9221 12.1889C7.08273 12.0282 7.29069 11.9479 7.54598 11.9479H13.5474L11.1771 9.57756C11.0164 9.41693 10.9361 9.20897 10.9361 8.95368C10.9361 8.69839 11.0164 8.49043 11.1771 8.3298L11.5474 7.95929C11.708 7.79866 11.916 7.71835 12.1714 7.71835C12.4268 7.71835 12.6348 7.79866 12.7954 7.95929Z" />
                  </svg>
                  Google Play
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-400 rounded-full opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Mobile app on smartphone" 
                  className="w-64 rounded-xl shadow-2xl border-8 border-white relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions or need assistance? We're here to help!</p>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-lg transition shadow-md">
                  Send Message
                </button>
              </form>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-amber-50 p-8 rounded-lg h-full">
                <h3 className="text-xl font-bold text-indigo-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-indigo-900" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900">Our Location</h4>
                      <p className="text-gray-600">Madan Mohan Malviya University of Technology,Gorakhpur, India</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-indigo-900" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900">Phone Number</h4>
                      <p className="text-gray-600">+91 8429258530</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="text-indigo-900" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900">Operating Hours</h4>
                      <p className="text-gray-600">24/7 Service Available</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-indigo-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-indigo-900 text-white p-3 rounded-full hover:bg-indigo-800 transition">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="bg-indigo-900 text-white p-3 rounded-full hover:bg-indigo-800 transition">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="bg-indigo-900 text-white p-3 rounded-full hover:bg-indigo-800 transition">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="text-amber-400" size={24} />
                <span className="font-bold text-xl">Tuk-Tuk</span>
                <span className="text-amber-400 font-bold text-xl">Go</span>
              </div>
              <p className="text-indigo-200 mb-6">The authentic auto-rickshaw experience for urban explorers.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-200 hover:text-amber-400 transition">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-indigo-200 hover:text-amber-400 transition">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-indigo-200 hover:text-amber-400 transition">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition">Services</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition">About</a></li>
                <li><a href="#testimonials" className="hover:text-amber-400 transition">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-amber-400 transition">City Tours</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Point-to-Point</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Hourly Packages</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Airport Transfers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Corporate Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-amber-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Safety</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-12 pt-8 text-center text-indigo-200 text-sm">
            <p>&copy; {new Date().getFullYear()} Tuk-TukGo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;