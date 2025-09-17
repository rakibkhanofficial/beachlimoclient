import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaCheckCircle } from "react-icons/fa";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carImages = [
    {
      src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      title: "Mercedes S-Class",
      price: "$120/day",
    },
    {
      src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
      title: "BMW 7 Series",
      price: "$110/day",
    },
    {
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
      title: "Audi A8",
      price: "$115/day",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carImages.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="bg-dots-light dark:bg-dots-dark absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
              #1 Premium Car Rental Service
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Premium
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Car Rental
                </span>
                Experience
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
                Discover luxury and comfort with BeachLimo's premium fleet.
                Professional service, competitive rates, and unforgettable
                journeys await you.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("fleet")}
                className="group flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Explore Fleet
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <FaPlay className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Premium Cars" },
                { number: "50+", label: "City Locations" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Car Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Car Image */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                <motion.img
                  key={currentSlide}
                  src={carImages[currentSlide].src}
                  alt={carImages[currentSlide].title}
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Car Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-white/95 p-4 backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/95"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {carImages[currentSlide].title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Luxury Sedan
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        {carImages[currentSlide].price}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Slide Indicators */}
              <div className="mt-6 flex justify-center space-x-2">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-white shadow-lg"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">4.9★</div>
                  <div className="text-xs">Rating</div>
                </div>
              </motion.div>

              {/* Floating Notification */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 2,
                  ease: "easeInOut",
                }}
                className="absolute -left-4 top-1/4 max-w-xs rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <FaCheckCircle className="text-sm text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Booking Confirmed
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Ready for pickup
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex cursor-pointer flex-col items-center text-gray-600 dark:text-gray-400"
          onClick={() => scrollToSection("services")}
        >
          <span className="mb-2 text-sm font-medium">Scroll to explore</span>
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-600 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
