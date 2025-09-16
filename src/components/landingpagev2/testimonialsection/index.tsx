import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Travel Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b15c?w=100&q=80",
      rating: 5,
      comment: "Absolutely amazing service! The car was pristine and the booking process was seamless. Highly recommend for any road trip adventure.",
      location: "Los Angeles, CA"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Executive",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: 5,
      comment: "Professional service with top-notch vehicles. Perfect for business trips. The luxury fleet exceeded my expectations completely.",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Traveler",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      rating: 5,
      comment: "Great family-friendly options! The SUV was perfect for our Yellowstone trip. Kids loved the entertainment system and comfort.",
      location: "Denver, CO"
    }
  ];

  return (
    <div className="py-32 bg-gray-50 dark:bg-gray-800">
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our <span className="text-blue-600">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>

              {/* Quote */}
              <FaQuoteLeft className="text-blue-600 text-2xl mb-4" />
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{testimonial.comment}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Customer Satisfaction Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
                { number: '98%', label: 'Customer Satisfaction', icon: '😊' },
                { number: '10K+', label: 'Happy Customers', icon: '👥' },
                { number: '24/7', label: 'Support Available', icon: '🕐' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TestimonialsSection;