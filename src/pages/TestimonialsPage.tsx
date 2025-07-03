import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rehan Ashraf',
      title: 'Local Resident',
      rating: 4,
      comment: 'The auto-rickshaw tour was the highlight of my trip! The driver was knowledgeable and showed me parts of the city I would have never discovered on my own.',
      initials: 'RA'
    },
    {
      id: 2,
      name: 'Shubhi Srivastava',
      title: 'Tourist from Banaras',
      rating: 5,
      comment: 'I use the auto-rickshaw service daily for my commute. It\'s reliable, affordable, and much faster than other transportation options in the busy city streets.',
      initials: 'SS'
    },
    {
      id: 3,
      name: 'Sneha Agarwal',
      title: 'Business Traveler From Mathura',
      rating: 5,
      comment: 'The booking app is so convenient! I can get an auto-rickshaw within minutes, and the fare estimation feature helps me plan my travel budget.',
      initials: 'SA'
    },
    {
      id: 4,
      name: 'Rajesh Gupta',
      title: 'Daily Commuter',
      rating: 4,
      comment: 'Safe, reliable, and always on time. The drivers are courteous and know all the shortcuts in the city. Highly recommended!',
      initials: 'RG'
    },
    {
      id: 5,
      name: 'Priya Sharma',
      title: 'Student',
      rating: 5,
      comment: 'As a student, I appreciate the affordable rates and the flexible booking options. The service has made my daily college commute so much easier.',
      initials: 'PS'
    },
    {
      id: 6,
      name: 'Amit Verma',
      title: 'Tourist',
      rating: 5,
      comment: 'What an authentic experience! The city tour package was amazing, and our driver shared interesting stories about local culture and history.',
      initials: 'AV'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-amber-500 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (            <Star
            key={star}
            size={20}
            fill={star <= rating ? 'currentColor' : 'none'}
            className={star <= rating ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <section className="py-16 bg-indigo-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Stories</h1>
          <p className="text-indigo-100 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Hear what our customers have to say about their auto-rickshaw experiences with Tuk-Tuk Go
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-5 left-8 text-amber-400">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 20H7.5C6.83696 20 6.20107 19.7366 5.73223 19.2678C5.26339 18.7989 5 18.163 5 17.5V12.5C5 11.837 5.26339 11.2011 5.73223 10.7322C6.20107 10.2634 6.83696 10 7.5 10H12.5C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V27.5C15 28.163 14.7366 28.7989 14.2678 29.2678C13.7989 29.7366 13.163 30 12.5 30H7.5M32.5 20H27.5C26.837 20 26.2011 19.7366 25.7322 19.2678C25.2634 18.7989 25 18.163 25 17.5V12.5C25 11.837 25.2634 11.2011 25.7322 10.7322C26.2011 10.2634 26.837 10 27.5 10H32.5C33.163 10 33.7989 10.2634 34.2678 10.7322C34.7366 11.2011 35 11.837 35 12.5V27.5C35 28.163 34.7366 28.7989 34.2678 29.2678C33.7989 29.7366 33.163 30 32.5 30H27.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {renderStars(testimonial.rating)}
                <p className="text-gray-600 dark:text-gray-300 mb-6 mt-4">{testimonial.comment}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full mr-4 flex items-center justify-center text-indigo-900 dark:text-indigo-200 font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Happy Customers?</h2>
          <p className="text-indigo-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the convenience and authenticity of auto-rickshaw travel in Gorakhpur
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-3 px-8 rounded-lg transition shadow-lg">
            Book Your First Ride
          </button>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
