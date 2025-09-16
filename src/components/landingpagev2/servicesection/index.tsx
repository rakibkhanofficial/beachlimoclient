import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar,
  FaPlane, 
  FaUserTie, 
  FaHeart, 
  FaBuilding, 
  FaMapMarkedAlt,
  FaClock,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa';

const ServicesSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const serviceData = [
    {
      id: 1,
      name: "Luxury Car Rental",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&q=80",
      icon: FaCar,
      description: "Premium vehicles for ultimate comfort and style",
      url: "fleet"
    },
    {
      id: 2,
      name: "Airport Transfer",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80",
      icon: FaPlane,
      description: "Reliable pickup and drop-off services",
      url: "contact"
    },
    {
      id: 3,
      name: "Chauffeur Service",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80",
      icon: FaUserTie,
      description: "Professional drivers for executive travel",
      url: "contact"
    },
    {
      id: 4,
      name: "Wedding Cars",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&q=80",
      icon: FaHeart,
      description: "Make your special day unforgettable",
      url: "contact"
    },
    {
      id: 5,
      name: "Corporate Rentals",
      image: "https://images.unsplash.com/photo-1550475762-ab5ccb894e7d?w=200&q=80",
      icon: FaBuilding,
      description: "Business travel solutions for companies",
      url: "contact"
    },
    {
      id: 6,
      name: "City Tours",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80",
      icon: FaMapMarkedAlt,
      description: "Explore destinations with guided tours",
      url: "destinations"
    },
    {
      id: 7,
      name: "24/7 Support",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=200&q=80",
      icon: FaClock,
      description: "Round-the-clock customer assistance",
      url: "contact"
    },
    {
      id: 8,
      name: "Insurance Coverage",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80",
      icon: FaShieldAlt,
      description: "Comprehensive coverage for peace of mind",
      url: "contact"
    }
  ];

  return (
    <div className="py-32 bg-white dark:bg-gray-900">
      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Premium{' '}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text">
              Services
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Experience world-class service with BeachLimo's comprehensive range of luxury transportation solutions
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => scrollToSection(service.url)}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-700"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={service.image}
                  alt={service.name}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <service.icon className="text-white text-sm" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium pt-2"
                >
                  Learn More
                  <FaArrowRight className="ml-2 text-xs" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Custom Quote
            <FaArrowRight className="inline ml-2" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesSection;