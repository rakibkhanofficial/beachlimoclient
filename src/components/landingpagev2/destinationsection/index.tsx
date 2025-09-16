import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight } from 'react-icons/fa';

const DestinationsSection = () => {
  const destinations = [
    {
      id: 1,
      name: "Grand Canyon",
      location: "Arizona",
      image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80",
      rating: 4.9,
      description: "Experience breathtaking natural wonders"
    },
    {
      id: 2,
      name: "Yellowstone",
      location: "Wyoming",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.8,
      description: "America's first national park adventure"
    },
    {
      id: 3,
      name: "Miami Beach",
      location: "Florida",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.7,
      description: "Iconic coastline and vibrant nightlife"
    },
    {
      id: 4,
      name: "Napa Valley",
      location: "California",
      image: "https://images.unsplash.com/photo-1506471254724-b369b5bea43d?w=800&q=80",
      rating: 4.9,
      description: "Premium wine country experience"
    },
    {
      id: 5,
      name: "Las Vegas Strip",
      location: "Nevada",
      image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f827?w=800&q=80",
      rating: 4.6,
      description: "Entertainment capital excitement"
    },
    {
      id: 6,
      name: "Golden Gate Bridge",
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      rating: 4.8,
      description: "Iconic bridge and bay views"
    }
  ];

  return (
    <div className="py-32 bg-white dark:bg-gray-900">
      <section id="destinations" className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Amazing <span className="text-blue-600">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking locations across America with our premium rental service
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 flex items-center bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <FaStar className="text-yellow-400 mr-1 text-sm" />
                  <span className="text-white text-sm font-semibold">{destination.rating}</span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-white/80 text-sm">{destination.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {destination.description}
                </p>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Explore Route
                  <FaArrowRight className="ml-2 text-sm" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Routes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Popular Road Trip Routes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { route: "California Coast", distance: "450 miles", duration: "3-5 days" },
                { route: "Grand Canyon Circuit", distance: "300 miles", duration: "2-3 days" },
                { route: "Florida Keys", distance: "180 miles", duration: "2-4 days" },
                { route: "Napa to San Francisco", distance: "60 miles", duration: "1-2 days" },
                { route: "Las Vegas Loop", distance: "200 miles", duration: "1-3 days" },
                { route: "Yellowstone Explorer", distance: "400 miles", duration: "4-7 days" }
              ].map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{route.route}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>Distance: {route.distance}</p>
                    <p>Duration: {route.duration}</p>
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

export default DestinationsSection;