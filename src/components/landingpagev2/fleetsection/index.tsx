import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const FleetSection = () => {
  const carBrands = [
    {
      id: 1,
      name: "Mercedes-Benz",
      model: "S-Class",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
      price: 120,
      features: ["Premium Interior", "Advanced Safety", "Luxury Comfort"],
      popular: true
    },
    {
      id: 2,
      name: "BMW",
      model: "7 Series",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
      price: 110,
      features: ["Dynamic Drive", "Executive Lounge", "ConnectedDrive"],
      popular: false
    },
    {
      id: 3,
      name: "Audi",
      model: "A8",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
      price: 115,
      features: ["Quattro AWD", "Virtual Cockpit", "Matrix LED"],
      popular: false
    },
    {
      id: 4,
      name: "Tesla",
      model: "Model S",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
      price: 130,
      features: ["Autopilot", "Supercharging", "Zero Emissions"],
      popular: false
    }
  ];

  return (
    <div className="py-32 bg-gray-50 dark:bg-gray-800">
      <section id="fleet" className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Premium <span className="text-blue-600">Fleet</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our luxury collection featuring the world's finest automotive brands
          </p>
        </motion.div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carBrands.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              {car.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={car.image}
                  alt={`${car.name} ${car.model}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {car.model}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${car.price}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      per day
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FaCheckCircle className="text-green-500 mr-2 text-xs" />
                      {feature}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Fleet?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Premium Brands</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Only the finest luxury vehicles from Mercedes-Benz, BMW, Audi, and Tesla
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Regular Maintenance</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  All vehicles undergo rigorous maintenance and safety inspections
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Latest Models</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Updated fleet with the newest models and latest technology features
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FleetSection;