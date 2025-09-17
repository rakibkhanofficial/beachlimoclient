import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaSun, 
  FaMoon,
  FaChevronDown
} from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

type HeaderProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ isDark, setIsDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

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
    setIsMenuOpen(false);
    setShowSolutionsDropdown(false);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { 
      name: 'Solutions', 
      id: 'solutions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'City to City Service', id: 'solutions', description: 'Premium intercity travel' },
        { name: 'Airport Transfers', id: 'solutions', description: 'Reliable pickup & drop-off' },
        { name: 'By The Hour Service', id: 'solutions', description: 'Flexible hourly rentals' },
        { name: 'Schedule Ride Service', id: 'solutions', description: 'Pre-planned transportation' }
      ]
    },
    { name: 'Services', id: 'services' },
    { name: 'Fleet', id: 'fleet' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-gray-200/20 dark:border-gray-700/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <FaCar className="text-white text-xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                BeachLimo
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Premium Car Rentals
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.id} className="relative group">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    if (item.hasDropdown) {
                      setShowSolutionsDropdown(!showSolutionsDropdown);
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      setShowSolutionsDropdown(true);
                    }
                  }}
                  className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    item.hasDropdown ? 'pr-2' : ''
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <FaChevronDown 
                      className={`ml-2 text-xs transition-transform duration-300 ${
                        showSolutionsDropdown ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </motion.button>

                {/* Solutions Dropdown */}
                {item.hasDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ 
                      opacity: showSolutionsDropdown ? 1 : 0,
                      y: showSolutionsDropdown ? 0 : 10,
                      scale: showSolutionsDropdown ? 1 : 0.95
                    }}
                    onMouseLeave={() => setShowSolutionsDropdown(false)}
                    className={`absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${
                      showSolutionsDropdown ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-3">
                        Transportation Solutions
                      </div>
                      {item.dropdownItems?.map((dropItem, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                          onClick={() => scrollToSection(dropItem.id)}
                          className="w-full text-left p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                        >
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {dropItem.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {dropItem.description}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => scrollToSection('solutions')}
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        View All Solutions →
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('fleet')}
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Now
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <div key={item.id}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    {item.name}
                    {item.hasDropdown && <span className="text-xs text-gray-500 ml-2">(4 Options)</span>}
                  </motion.button>
                  
                  {/* Mobile Dropdown Items */}
                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdownItems?.map((dropItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToSection(dropItem.id)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          • {dropItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => scrollToSection('fleet')}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;