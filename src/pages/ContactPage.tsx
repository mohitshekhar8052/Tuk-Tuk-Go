import React from 'react';
import ContactSection from '../components/ContactSection';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <section className="py-16 bg-indigo-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-indigo-100 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Get in touch with us for any questions, support, or booking assistance
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Additional Information */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 dark:text-white mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-indigo-900 dark:text-white mb-2">How do I book a ride?</h4>
                  <p className="text-gray-600 dark:text-gray-300">You can book a ride through our website using the "Book a Ride" button, or call us directly at +91 8429258530.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-indigo-900 dark:text-white mb-2">What are your operating hours?</h4>
                  <p className="text-gray-600 dark:text-gray-300">We provide 24/7 service, so you can book a ride anytime you need one.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-indigo-900 dark:text-white mb-2">How much does a ride cost?</h4>
                  <p className="text-gray-600 dark:text-gray-300">Our fares are competitive and optimized for affordability. The exact cost depends on the distance and duration of your trip.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-indigo-900 dark:text-white mb-2">Are your drivers verified?</h4>
                  <p className="text-gray-600 dark:text-gray-300">Yes, all our drivers are thoroughly verified and trained to ensure your safety and comfort.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 dark:text-white mb-6">Emergency Contact</h3>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 transition-colors duration-300">
                <h4 className="font-bold text-red-800 dark:text-red-400 mb-4">24/7 Emergency Support</h4>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  If you're experiencing an emergency during your ride or need immediate assistance:
                </p>
                <div className="space-y-2">
                  <p className="font-bold text-red-800 dark:text-red-400">Emergency Hotline: +91 8429258530</p>
                  <p className="text-red-700 dark:text-red-300">Available 24 hours a day, 7 days a week</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-lg text-indigo-900 dark:text-white mb-4">Other Ways to Reach Us</h4>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Email:</span> support@tukgo.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">WhatsApp:</span> +91 8429258530
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Office Hours:</span> 9:00 AM - 6:00 PM (Mon-Fri)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
