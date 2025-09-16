import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApple
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    if (email) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Add your newsletter subscription logic here
    }
  };

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

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23374151\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <FaCar className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    BeachLimo
                  </h1>
                  <p className="text-gray-400 text-sm">Premium Car Rentals</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Experience luxury and comfort with our premium fleet of vehicles. Your journey, our passion.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="mr-3 text-blue-400" />
                  <span>California, USA</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaPhone className="mr-3 text-blue-400" />
                  <span>+1(646) 517-4942</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  <span>support@beachLimo.com</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Services', 'Fleet', 'Destinations', 'About', 'Contact'].map((link, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                    >
                      {link}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Car Brands */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white">Car Brands</h3>
              <ul className="space-y-3">
                {['Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Rolls Royce', 'Bentley'].map((brand, index) => (
                  <li key={index}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => scrollToSection('fleet')}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                    >
                      {brand}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe for exclusive offers and updates
              </p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  />
                  <motion.button
                    onClick={handleSubscribe}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Subscribe
                    <FaArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">We Accept</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaCcVisa, color: 'text-blue-600' },
                    { icon: FaCcMastercard, color: 'text-red-600' },
                    { icon: FaPaypal, color: 'text-blue-500' },
                    { icon: FaApple, color: 'text-gray-700' }
                  ].map((payment, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="w-14 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <payment.icon className={`text-xl ${payment.color}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                    { icon: FaTwitter, color: 'hover:bg-sky-500' },
                    { icon: FaInstagram, color: 'hover:bg-pink-600' },
                    { icon: FaLinkedinIn, color: 'hover:bg-blue-700' }
                  ].map((social, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <social.icon size={16} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            >
              <div className="text-gray-400">
                © {currentYear} BeachLimo. All rights reserved.
              </div>

              <div className="flex flex-wrap gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;