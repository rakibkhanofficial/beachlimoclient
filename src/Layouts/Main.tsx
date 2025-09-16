import React, { useEffect, useState } from "react";
import AboutSection from "~@/components/landingpagev2/aboutussection";
import ContactSection from "~@/components/landingpagev2/contactsection";
import DestinationsSection from "~@/components/landingpagev2/destinationsection";
import FleetSection from "~@/components/landingpagev2/fleetsection";
import Footer from "~@/components/landingpagev2/footer";
import Header from "~@/components/landingpagev2/header";
import HeroSection from "~@/components/landingpagev2/hero";
import ScrollToTop from "~@/components/landingpagev2/scrolltotop";
import ServicesSection from "~@/components/landingpagev2/servicesection";
import SolutionsHub from "~@/components/landingpagev2/solutionhub";
import TestimonialsSection from "~@/components/landingpagev2/testimonialsection";

const Main = () => {
    const [isDark, setIsDark] = useState(true);

  // Apply dark mode to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-500`}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <HeroSection />
      <SolutionsHub/>
      <ServicesSection />
      <FleetSection />
      <DestinationsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Main;

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { 
//   FaPlay, 
//   FaArrowRight, 
//   FaApple, 
//   FaGooglePlay,
//   FaCar, 
//   FaSun, 
//   FaMoon,
//   FaPlane, 
//   FaUserTie, 
//   FaHeart, 
//   FaBuilding, 
//   FaMapMarkedAlt,
//   FaClock,
//   FaShieldAlt,
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaLinkedinIn, 
//   FaPhoneAlt, 
//   FaEnvelope, 
//   FaMapMarkerAlt,
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaStar,
//   FaQuoteLeft,
//   FaCheckCircle,
//   FaEye,
//   FaShare,
//   FaHeart as FaHeartSolid
// } from 'react-icons/fa';
// import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

// // Main App Component
// const BeachLimoWebsite = () => {
//   const [isDark, setIsDark] = useState(true);

//   // Apply dark mode to document
//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDark]);

//   // Header Component
//   const Header = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
    
//     useEffect(() => {
//       const updateScrolled = () => setScrolled(window.scrollY > 50);
//       window.addEventListener('scroll', updateScrolled);
//       return () => window.removeEventListener('scroll', updateScrolled);
//     }, []);

//     const scrollToSection = (sectionId) => {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         const headerOffset = 100;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//       setIsMenuOpen(false);
//     };

//     const navItems = [
//       { name: 'Home', id: 'home' },
//       { name: 'Services', id: 'services' },

//       { name: 'Fleet', id: 'fleet' },
//       { name: 'Destinations', id: 'destinations' },
//       { name: 'About', id: 'about' },
//       { name: 'Contact', id: 'contact' }
//     ];

//     return (
//       <motion.header 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled 
//             ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl' 
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => scrollToSection('home')}
//             >
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <FaCar className="text-white text-xl" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   BeachLimo
//                 </span>
//                 <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
//                   Premium Rentals
//                 </span>
//               </div>
//             </motion.div>

//             <nav className="hidden lg:flex items-center space-x-8">
//               {navItems.map((item, index) => (
//                 <motion.button
//                   key={item.id}
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -2, scale: 1.05 }}
//                   onClick={() => scrollToSection(item.id)}
//                   className="relative text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium text-lg py-2 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800"
//                 >
//                   {item.name}
//                 </motion.button>
//               ))}
//             </nav>

//             <div className="flex items-center space-x-4">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 180 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsDark(!isDark)}
//                 className="p-3 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-lg"
//               >
//                 {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => scrollToSection('fleet')}
//                 className="hidden md:block px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300"
//               >
//                 Book Now
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden p-3 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 shadow-lg"
//               >
//                 {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ 
//             opacity: isMenuOpen ? 1 : 0, 
//             height: isMenuOpen ? 'auto' : 0 
//           }}
//           className="lg:hidden overflow-hidden bg-white/98 dark:bg-zinc-900/98 backdrop-blur-xl border-t border-gray-200/50 dark:border-zinc-700/50 shadow-2xl"
//         >
//           <div className="container mx-auto px-6 py-6">
//             <nav className="flex flex-col space-y-2">
//               {navItems.map((item, index) => (
//                 <motion.button
//                   key={item.id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ x: 10 }}
//                   onClick={() => scrollToSection(item.id)}
//                   className="text-left text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium py-4 px-4 rounded-xl text-lg"
//                 >
//                   {item.name}
//                 </motion.button>
//               ))}
//             </nav>
//           </div>
//         </motion.div>
//       </motion.header>
//     );
//   };

//   // Hero Section
//   const HeroSection = () => {
//     const { scrollY } = useScroll();
//     const y = useTransform(scrollY, [0, 500], [0, -100]);
//     const [currentSlide, setCurrentSlide] = useState(0);
    
//     const carouselImages = [
//       { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", alt: "Luxury Mercedes" },
//       { src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80", alt: "Premium BMW" },
//       { src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80", alt: "Elegant Audi" },
//       { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", alt: "Tesla Model S" }
//     ];

//     useEffect(() => {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
//       }, 4000);
//       return () => clearInterval(timer);
//     }, [carouselImages.length]);

//     const scrollToSection = (sectionId) => {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         const headerOffset = 100;
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
//         window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
//       }
//     };

//     return (
//       <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div 
//             animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
//           />
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="space-y-8 text-center lg:text-left"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-zinc-700/30 shadow-xl"
//               >
//                 <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                   🏆 #1 Luxury Car Rental Service
//                 </span>
//               </motion.div>

//               <motion.h1 
//                 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <span className="text-gray-900 dark:text-white">Experience</span><br />
//                 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Luxury Travel</span><br />
//                 <span className="text-gray-900 dark:text-white">Like Never Before</span>
//               </motion.h1>

//               <motion.p 
//                 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 Discover premium car rentals with BeachLimo's luxury fleet. From business trips to special occasions, we provide unmatched comfort and style.
//               </motion.p>

//               <motion.div 
//                 className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => scrollToSection('fleet')}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-2xl flex items-center justify-center"
//                 >
//                   Explore Our Fleet
//                   <FaArrowRight className="ml-3" />
//                 </motion.button>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl text-gray-900 dark:text-white rounded-2xl font-semibold text-lg border border-white/30 dark:border-zinc-700/50 flex items-center justify-center"
//                 >
//                   <FaPlay className="mr-3" />
//                   Watch Demo
//                 </motion.button>
//               </motion.div>

//               <motion.div 
//                 className="grid grid-cols-3 gap-8 pt-12"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 {[
//                   { number: '50K+', label: 'Happy Customers' },
//                   { number: '500+', label: 'Premium Cars' },
//                   { number: '100+', label: 'Locations' }
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ y: -5, scale: 1.05 }}
//                     className="text-center p-4 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl rounded-2xl shadow-lg"
//                   >
//                     <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
//                     <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>

//             <motion.div
//               style={{ y }}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="relative"
//             >
//               <div className="relative w-full max-w-2xl mx-auto">
//                 <div className="relative overflow-hidden rounded-3xl shadow-2xl">
//                   <motion.img
//                     key={currentSlide}
//                     src={carouselImages[currentSlide].src}
//                     alt={carouselImages[currentSlide].alt}
//                     className="w-full h-96 sm:h-[500px] object-cover"
//                     initial={{ opacity: 0, scale: 1.1 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
//                   <motion.div
//                     className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6"
//                   >
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                       {carouselImages[currentSlide].alt}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">Premium luxury sedan</p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-2xl font-bold text-blue-600">$89/day</span>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm"
//                       >
//                         Book Now
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 </div>

//                 <div className="flex justify-center space-x-3 mt-6">
//                   {carouselImages.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => setCurrentSlide(index)}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         index === currentSlide 
//                           ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
//                           : 'bg-gray-300 dark:bg-zinc-600'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Services Section
//   const ServicesSection = () => {
//     const serviceData = [
//       { id: 1, name: "Luxury Car Rental", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&q=80", icon: FaCar, description: "Premium vehicles for comfort", color: "from-blue-500 to-cyan-500" },
//       { id: 2, name: "Airport Transfer", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80", icon: FaPlane, description: "Reliable pickup and drop-off", color: "from-purple-500 to-pink-500" },
//       { id: 3, name: "Chauffeur Service", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80", icon: FaUserTie, description: "Professional drivers", color: "from-green-500 to-emerald-500" },
//       { id: 4, name: "Wedding Cars", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&q=80", icon: FaHeart, description: "Special day memories", color: "from-pink-500 to-rose-500" },
//       { id: 5, name: "Corporate Rentals", image: "https://images.unsplash.com/photo-1550475762-ab5ccb894e7d?w=200&q=80", icon: FaBuilding, description: "Business travel solutions", color: "from-orange-500 to-red-500" },
//       { id: 6, name: "City Tours", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80", icon: FaMapMarkedAlt, description: "Guided city exploration", color: "from-indigo-500 to-blue-500" },
//       { id: 7, name: "24/7 Support", image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=200&q=80", icon: FaClock, description: "Round-the-clock assistance", color: "from-cyan-500 to-teal-500" },
//       { id: 8, name: "Insurance Coverage", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80", icon: FaShieldAlt, description: "Comprehensive protection", color: "from-emerald-500 to-green-500" }
//     ];

//     return (
//       <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
//               Our Premium{' '}
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Services
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
//               Experience world-class service with BeachLimo's comprehensive luxury transportation solutions
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {serviceData.map((service, index) => (
//               <motion.div
//                 key={service.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className="group bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img 
//                     src={service.image}
//                     alt={service.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
//                   <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                     <service.icon className="text-white text-xl" />
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                     {service.name}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4">
//                     {service.description}
//                   </p>
//                   <motion.div
//                     whileHover={{ x: 5 }}
//                     className="flex items-center text-blue-600 dark:text-blue-400 font-semibold"
//                   >
//                     <span className="text-sm">Learn More</span>
//                     <FaArrowRight className="ml-2 text-xs" />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Fleet Section
//   const FleetSection = () => {
//     const carCategories = [
//       { id: 1, name: "Economy", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80", startingPrice: 29, popular: false },
//       { id: 2, name: "Luxury", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80", startingPrice: 89, popular: true },
//       { id: 3, name: "SUV", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80", startingPrice: 59, popular: false },
//       { id: 4, name: "Sports Car", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80", startingPrice: 119, popular: false }
//     ];

//     return (
//       <section id="fleet" className="py-24 bg-white dark:bg-zinc-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Our Premium <span className="text-blue-600">Fleet</span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               Choose from our luxury collection featuring Mercedes-Benz, BMW, Audi, Tesla, and more premium brands
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {carCategories.map((car, index) => (
//               <motion.div
//                 key={car.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className="group relative bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
//               >
//                 {car.popular && (
//                   <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                     Most Popular
//                   </div>
//                 )}
                
//                 <div className="relative overflow-hidden">
//                   <img 
//                     src={car.image}
//                     alt={car.name}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{car.name}</h3>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-blue-600">${car.startingPrice}</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">per day</div>
//                     </div>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
//                   >
//                     Book Now
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Destinations Section
//   const DestinationsSection = () => {
//     const destinations = [
//       { id: 1, name: "Grand Canyon", location: "Arizona", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80", rating: 4.9 },
//       { id: 2, name: "Yellowstone", location: "Wyoming", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", rating: 4.8 },
//       { id: 3, name: "Miami Beach", location: "Florida", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", rating: 4.7 },
//       { id: 4, name: "Napa Valley", location: "California", image: "https://images.unsplash.com/photo-1506471254724-b369b5bea43d?w=800&q=80", rating: 4.9 },
//       { id: 5, name: "Las Vegas Strip", location: "Nevada", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f827?w=800&q=80", rating: 4.6 },
//       { id: 6, name: "Golden Gate Bridge", location: "San Francisco", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", rating: 4.8 }
//     ];

//     return (
//       <section id="destinations" className="py-24 bg-gray-50 dark:bg-zinc-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Explore Amazing <span className="text-blue-600">Destinations</span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               Discover breathtaking locations across America with our premium rental cars
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {destinations.map((destination, index) => (
//               <motion.div
//                 key={destination.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//                 className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="relative overflow-hidden">
//                   <img 
//                     src={destination.image}
//                     alt={destination.name}
//                     className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
//                   <div className="absolute top-4 left-4 flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <span className="text-white text-sm font-semibold">{destination.rating}</span>
//                   </div>

//                   <div className="absolute bottom-4 left-4 right-4">
//                     <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
//                     <p className="text-white/80 text-sm">{destination.location}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // Testimonials Section
//   const TestimonialsSection = () => {
//     const testimonials = [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         role: "Travel Blogger",
//         avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b15c?w=100&q=80",
//         rating: 5,
//         comment: "Absolutely amazing service! The car was pristine and the booking process was seamless.",
//         location: "Los Angeles, CA"
//       },
//       {
//         id: 2,
//         name: "Michael Chen",
//         role: "Business Executive",
//         avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
//         rating: 5,
//         comment: "Professional service with top-notch vehicles. Perfect for business trips.",
//         location: "New York, NY"
//       },
//       {
//         id: 3,
//         name: "Emily Rodriguez",
//         role: "Family Traveler",
//         avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
//         rating: 5,
//         comment: "Great family-friendly options! The SUV was perfect for our road trip.",
//         location: "Denver, CO"
//       }
//     ];

//     return (
//       <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               What Our <span className="text-blue-600">Customers Say</span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//               Don't just take our word for it - hear from our satisfied customers
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={testimonial.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ y: -5, scale: 1.02 }}
//                 className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="flex items-center mb-6">
//                   <img 
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-16 h-16 rounded-full object-cover mr-4"
//                   />
//                   <div>
//                     <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
//                     <p className="text-gray-500 dark:text-gray-500 text-xs">{testimonial.location}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <FaStar key={i} className="text-yellow-400 mr-1" />
//                   ))}
//                 </div>

//                 <FaQuoteLeft className="text-blue-600 text-2xl mb-4" />
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
//                   "{testimonial.comment}"
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };

//   // About Section
//   const AboutSection = () => (
//     <section id="about" className="py-24 bg-white dark:bg-zinc-900">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//               Redefining <span className="text-blue-600">Luxury Travel</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
//               With over a decade of excellence, BeachLimo has been the trusted choice for premium vehicles and exceptional service across America.
//             </p>
            
//             <div className="grid grid-cols-2 gap-6 mb-8">
//               {[
//                 { number: '15+', label: 'Years Experience' },
//                 { number: '500+', label: 'Premium Vehicles' },
//                 { number: '50K+', label: 'Happy Customers' },
//                 { number: '24/7', label: 'Customer Support' }
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="text-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl"
//                 >
//                   <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
//                   <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
//             >
//               Learn More About Us
//               <FaArrowRight className="inline ml-2" />
//             </motion.button>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"
//               alt="About Us"
//               className="w-full rounded-2xl shadow-2xl"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );

//   // Contact Section
//   const ContactSection = () => (
//     <section id="contact" className="py-24 bg-gray-50 dark:bg-zinc-800">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
//             Get In <span className="text-blue-600">Touch</span>
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Ready to start your journey? Contact us today for personalized service
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-8"
//           >
//             {[
//               { icon: FaPhoneAlt, title: 'Phone', info: '+1(646) 517-4942', color: 'from-green-500 to-emerald-600' },
//               { icon: FaEnvelope, title: 'Email', info: 'support@beachLimo.com', color: 'from-blue-500 to-cyan-600' },
//               { icon: FaMapMarkerAlt, title: 'Address', info: 'California, USA', color: 'from-purple-500 to-pink-600' }
//             ].map((contact, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="flex items-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mr-6`}>
//                   <contact.icon className="text-2xl text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{contact.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300">{contact.info}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl"
//           >
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white transition-all duration-300"
//                     placeholder="John"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white transition-all duration-300"
//                     placeholder="Doe"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white transition-all duration-300"
//                   placeholder="john@example.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white transition-all duration-300"
//                   placeholder="Tell us about your rental needs..."
//                 ></textarea>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
//               >
//                 Send Message
//                 <FaArrowRight className="inline ml-2" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );

//   // Footer Component
//   const Footer = () => {
//     const [email, setEmail] = useState('');
//     const currentYear = new Date().getFullYear();

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Newsletter subscription:', email);
//       setEmail('');
//     };

//     const socialMedia = [
//       { icon: FaFacebookF, href: '#', color: 'hover:bg-blue-600' },
//       { icon: FaTwitter, href: '#', color: 'hover:bg-sky-500' },
//       { icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
//       { icon: FaLinkedinIn, href: '#', color: 'hover:bg-blue-700' }
//     ];

//     return (
//       <footer className="bg-gradient-to-b from-zinc-900 to-black text-white relative overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         </div>

//         <div className="relative z-10">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//               {/* Brand Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-1"
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
//                     <FaCar className="text-white text-xl" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                       BeachLimo
//                     </span>
//                     <span className="text-sm text-gray-400 font-medium">
//                       Premium Car Rentals
//                     </span>
//                   </div>
//                 </div>
                
//                 <p className="text-gray-300 leading-relaxed mb-6 text-lg">
//                   Experience luxury and comfort with our premium fleet. Your journey, our passion.
//                 </p>

//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-center text-gray-300">
//                     <FaMapMarkerAlt className="mr-4 text-blue-400 text-lg" />
//                     <span>California, USA</span>
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <FaPhoneAlt className="mr-4 text-blue-400 text-lg" />
//                     <span>+1(646) 517-4942</span>
//                   </div>
//                   <div className="flex items-center text-gray-300">
//                     <FaEnvelope className="mr-4 text-blue-400 text-lg" />
//                     <span>support@beachLimo.com</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   {socialMedia.map((social, index) => (
//                     <motion.a
//                       key={index}
//                       href={social.href}
//                       whileHover={{ scale: 1.2, y: -3 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
//                     >
//                       <social.icon size={18} />
//                     </motion.a>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Quick Links */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-1"
//               >
//                 <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
//                 <ul className="space-y-3">
//                   {['Home', 'Services', 'Fleet', 'Destinations', 'About', 'Contact'].map((link, index) => (
//                     <li key={index}>
//                       <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-lg hover:underline">
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Car Brands */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-1"
//               >
//                 <h3 className="text-xl font-bold mb-6 text-white">Car Brands</h3>
//                 <ul className="space-y-3">
//                   {['Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Rolls Royce', 'Bentley'].map((brand, index) => (
//                     <li key={index}>
//                       <a href="#fleet" className="text-gray-400 hover:text-white transition-colors text-lg hover:underline">
//                         {brand}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Newsletter */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-1"
//               >
//                 <h3 className="text-xl font-bold mb-6 text-white">Newsletter</h3>
//                 <p className="text-gray-300 mb-6 text-lg leading-relaxed">
//                   Subscribe for updates on special offers
//                 </p>

//                 <div className="mb-8">
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       className="flex-1 px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//                     />
//                     <motion.button
//                       onClick={handleSubmit}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
//                     >
//                       Subscribe
//                       <FaArrowRight className="ml-2" />
//                     </motion.button>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h4 className="text-lg font-semibold text-white">We Accept</h4>
//                   <div className="flex gap-4">
//                     {[
//                       { icon: FaCcVisa, color: 'text-blue-600' },
//                       { icon: FaCcMastercard, color: 'text-red-600' },
//                       { icon: FaPaypal, color: 'text-blue-500' }
//                     ].map((payment, index) => (
//                       <motion.div
//                         key={index}
//                         whileHover={{ scale: 1.1, y: -2 }}
//                         className="w-16 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
//                       >
//                         <payment.icon className={`text-2xl ${payment.color}`} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           <div className="border-t border-zinc-800">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//               <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-400 text-lg">© {currentYear} BeachLimo. All rights reserved.</span>
//                 </div>

//                 <div className="flex flex-wrap gap-6">
//                   {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((item, index) => (
//                     <a
//                       key={index}
//                       href="#"
//                       className="text-gray-400 hover:text-white transition-colors text-lg hover:underline"
//                     >
//                       {item}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     );
//   };

//   // Scroll to Top Button
//   const ScrollToTop = () => (
//     <motion.button
//       initial={{ opacity: 0, scale: 0 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//       className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
//     >
//       ↑
//     </motion.button>
//   );

//   return (
//     <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-500`}>
//       <Header />
//       <HeroSection />
//       <ServicesSection />
//       <FleetSection />
//       <DestinationsSection />
//       <TestimonialsSection />
//       <AboutSection />
//       <ContactSection />
//       <Footer />
//       <ScrollToTop />
//     </div>
//   );
// };

// export default BeachLimoWebsite;
