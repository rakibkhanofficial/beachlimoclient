import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20 max-w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to start your journey? Contact us today for personalized premium service
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-full overflow-hidden">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 max-w-full"
          >
            {[
              { 
                icon: FaPhone, 
                title: 'Phone', 
                info: '+1(646) 517-4942',
                description: 'Call us anytime for instant support'
              },
              { 
                icon: FaEnvelope, 
                title: 'Email', 
                info: 'support@beachLimo.com',
                description: 'Send us your questions and requirements'
              },
              { 
                icon: FaMapMarkerAlt, 
                title: 'Address', 
                info: 'California, USA',
                description: 'Multiple locations across the state'
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start p-4 md:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 md:mr-6 flex-shrink-0">
                  <contact.icon className="text-white text-lg md:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1 text-sm md:text-base break-words">
                    {contact.info}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                    {contact.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-6 md:pt-8"
            >
              <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3 md:gap-4">
                {[
                  { icon: FaFacebookF, color: 'hover:bg-blue-600', name: 'Facebook' },
                  { icon: FaTwitter, color: 'hover:bg-sky-500', name: 'Twitter' },
                  { icon: FaInstagram, color: 'hover:bg-pink-600', name: 'Instagram' },
                  { icon: FaLinkedinIn, color: 'hover:bg-blue-700', name: 'LinkedIn' }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 md:w-12 md:h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                    aria-label={social.name}
                  >
                    <social.icon size={16} className="md:w-[18px] md:h-[18px]" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-full overflow-hidden"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h3>
            <div className="space-y-4 md:space-y-6">
              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-sm md:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                  Service Needed
                </label>
                <select className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 text-sm md:text-base">
                  <option>Select a service</option>
                  <option>Luxury Car Rental</option>
                  <option>Airport Transfer</option>
                  <option>Chauffeur Service</option>
                  <option>Wedding Cars</option>
                  <option>Corporate Rentals</option>
                  <option>City Tours</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm md:text-base">
                  Message
                </label>
                <textarea
                  placeholder="Tell us about your rental needs..."
                  rows={4}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-300 text-sm md:text-base"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
                <FaArrowRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Business Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base md:text-lg">Office Hours</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base md:text-lg">Emergency Support</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  <p>24/7 roadside assistance</p>
                  <p className="break-words">Emergency hotline: +1(646) 517-4942</p>
                  <p>Response time: Within 30 minutes</p>
                  <p>Available for all rental customers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactSection;