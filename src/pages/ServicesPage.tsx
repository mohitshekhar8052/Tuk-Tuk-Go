import React from 'react';
import { Clock, MapPin, DollarSign, Shield, Star, Users } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: Clock,
      title: 'City Tours',
      description: 'Explore the city\'s landmarks, hidden gems, and cultural hotspots with our knowledgeable drivers as your guides.',
      features: ['Professional tour guides', 'Historical insights', 'Photo stops', 'Flexible duration'],
      price: 'Starting from ₹300/hour',
      popular: true
    },
    {
      id: 2,
      icon: MapPin,
      title: 'Point-to-Point',
      description: 'Quick and efficient transportation from one location to another, perfect for daily commutes or short trips around town.',
      features: ['Direct routes', 'Quick pickup', 'Fair pricing', 'Safe travel'],
      price: 'Starting from ₹50',
      popular: false
    },
    {
      id: 3,
      icon: DollarSign,
      title: 'Hourly Packages',
      description: 'Book a rickshaw for multiple hours and explore at your own pace with our flexible hourly rental packages.',
      features: ['Flexible timing', 'Multiple stops', 'Personal driver', 'Discounted rates'],
      price: 'Starting from ₹250/hour',
      popular: false
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All drivers are verified and vehicles are regularly maintained for your safety.'
    },
    {
      icon: Star,
      title: 'Quality Service',
      description: 'Consistently rated 4.8/5 by our customers for reliability and comfort.'
    },
    {
      icon: Users,
      title: 'Local Expertise',
      description: 'Our drivers know Gorakhpur like the back of their hand.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <section className="py-16 bg-indigo-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-indigo-100 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the many ways our auto-rickshaws can enhance your urban travel experience in Gorakhpur
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative ${
                    service.popular ? 'border-2 border-amber-400' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-amber-400 text-indigo-900 px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="text-indigo-900" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-indigo-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-indigo-900 dark:text-white mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t dark:border-gray-700 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-900 dark:text-white">{service.price}</span>
                      <button className="bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">Why Choose Tuk-Tuk Go?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best auto-rickshaw experience in Gorakhpur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-amber-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-indigo-900" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              No hidden fees, no surge pricing. Just fair, honest rates for quality service.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto transition-colors duration-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-900 dark:bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Service Type</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                    <th className="px-6 py-4 text-left">Distance</th>
                    <th className="px-6 py-4 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 font-medium text-indigo-900 dark:text-white">Point-to-Point</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Up to 30 mins</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Up to 5 km</td>
                    <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">₹50 - ₹150</td>
                  </tr>
                  <tr className="bg-amber-50 dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-indigo-900 dark:text-white">City Tour</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">2-4 hours</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">20-30 km</td>
                    <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">₹300 - ₹800</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-indigo-900 dark:text-white">Hourly Package</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Per hour</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Flexible</td>
                    <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">₹250/hour</td>
                  </tr>
                  <tr className="bg-amber-50 dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-indigo-900 dark:text-white">Full Day</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">8 hours</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Up to 80 km</td>
                    <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">₹1,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              * Prices may vary based on distance, time of day, and special requirements
            </p>
            <button className="bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg">
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
