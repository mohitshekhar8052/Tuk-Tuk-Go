import React from 'react';
import { Shield, Clock, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* About Section */}
      <section className="py-16 bg-indigo-900 dark:bg-gray-900 text-white transition-colors duration-300">
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
              <p className="mb-6 text-indigo-100 dark:text-gray-300">
                An auto-rickshaw is a three-wheeled motorized vehicle commonly used for public transportation in many countries, especially in South Asia, Southeast Asia, and parts of Africa.
              </p>
              <p className="mb-6 text-indigo-100 dark:text-gray-300">
                These iconic vehicles are known for their maneuverability in congested streets and their affordability, making them an essential part of urban transportation in many developing regions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <div className="flex items-center">
                  <div className="bg-amber-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Shield className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Safe & Secure</h4>
                    <p className="text-indigo-200 dark:text-gray-400 text-sm">All drivers verified</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-amber-400 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">24/7 Service</h4>
                    <p className="text-indigo-200 dark:text-gray-400 text-sm">Always available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What drives us to provide the best auto-rickshaw service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-indigo-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Safety First</h3>
              <p className="text-gray-600">All our drivers are verified and trained to ensure your safety and comfort throughout your journey.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-indigo-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Reliability</h3>
              <p className="text-gray-600">We pride ourselves on punctuality and consistent service quality, available 24/7 for your convenience.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-indigo-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every ride, maintaining our vehicles and continuously improving our service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet the people behind Tuk-Tuk Go</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-900 font-bold text-2xl">
                MK
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Mohit Kumar</h3>
              <p className="text-gray-600 mb-4">Founder & CEO</p>
              <p className="text-sm text-gray-500">Passionate about sustainable urban transportation and connecting communities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-900 font-bold text-2xl">
                OP
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Operations Team</h3>
              <p className="text-gray-600 mb-4">Head of Operations</p>
              <p className="text-sm text-gray-500">Ensuring smooth operations and maintaining our high service standards.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-900 font-bold text-2xl">
                CS
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Customer Support</h3>
              <p className="text-gray-600 mb-4">Support Manager</p>
              <p className="text-sm text-gray-500">Dedicated to providing excellent customer service and support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
