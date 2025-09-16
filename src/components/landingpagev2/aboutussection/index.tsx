import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaAward, FaShieldAlt, FaUsers, FaClock } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <div className="py-32 bg-white dark:bg-gray-900">
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Redefining{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text">
                  Luxury Travel
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                With over a decade of excellence in the car rental industry, BeachLimo has been the trusted choice for discerning travelers seeking premium vehicles and exceptional service across America. We pride ourselves on delivering unmatched luxury experiences.
              </motion.p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '15+', label: 'Years Experience', icon: FaAward },
                { number: '500+', label: 'Premium Vehicles', icon: FaClock },
                { number: '50K+', label: 'Happy Customers', icon: FaUsers },
                { number: '24/7', label: 'Customer Support', icon: FaShieldAlt }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To provide exceptional luxury car rental experiences that exceed expectations, combining premium vehicles with outstanding customer service and innovative technology solutions.
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Learn More About Us
              <FaArrowRight className="inline ml-2" />
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"
                alt="BeachLimo Premium Service"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              
              {/* Achievement Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-center">
                  <FaAward className="text-2xl mb-2 mx-auto" />
                  <div className="text-lg font-bold">Award Winner</div>
                  <div className="text-sm opacity-90">Best Car Rental 2024</div>
                </div>
              </motion.div>

              {/* Service Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="font-bold text-lg">24/7</div>
                  <div className="text-xs">Available</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at BeachLimo
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                description: "Commitment to the highest standards in every service",
                icon: "🏆",
                color: "from-yellow-500 to-orange-600"
              },
              {
                title: "Reliability",
                description: "Dependable service you can trust for any occasion",
                icon: "🤝",
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Innovation",
                description: "Embracing technology to enhance your experience",
                icon: "💡",
                color: "from-purple-500 to-pink-600"
              },
              {
                title: "Integrity",
                description: "Honest, transparent business practices always",
                icon: "🛡️",
                color: "from-green-500 to-emerald-600"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutSection;