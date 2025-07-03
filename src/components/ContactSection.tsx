import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MapPin, Clock, Phone } from 'lucide-react';
import { contactFormSchema, ContactFormData } from '../utils/validationSchemas';
import LoadingSpinner from './LoadingSpinner';
import { Alert } from './ErrorBoundary';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('Contact form submitted:', data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });
      reset();
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Have questions or need assistance? We're here to help!</p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            {submitStatus.type && (
              <div className="mb-6">
                <Alert
                  type={submitStatus.type}
                  message={submitStatus.message}
                  onClose={() => setSubmitStatus({ type: null, message: '' })}
                />
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Your Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                    errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                    errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="@gmail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
                    errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-900 hover:bg-indigo-800 disabled:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:disabled:bg-indigo-800 text-white font-bold py-3 px-8 rounded-lg transition shadow-md flex items-center justify-center min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <div className="bg-amber-50 dark:bg-gray-800 p-8 rounded-lg h-full transition-colors duration-300">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 dark:text-white">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">Madan Mohan Malviya University of Technology, Gorakhpur, India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 dark:text-white">Phone Number</h4>
                    <p className="text-gray-600 dark:text-gray-300">+91 8429258530</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="text-indigo-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 dark:text-white">Operating Hours</h4>
                    <p className="text-gray-600 dark:text-gray-300">24/7 Service Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
