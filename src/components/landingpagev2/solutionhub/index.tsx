// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaRoute,
//   FaPlane,
//   FaClock,
//   FaCalendarAlt,
//   FaArrowRight,
//   FaStar
// } from 'react-icons/fa';

// const SolutionsHub = () => {
//   // Solutions data with unique structure
//   const solutionsData = [
//     {
//       id: 1,
//       name: "City to City Service",
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&q=80",
//       icon: FaRoute,
//       url: "city-to-city",
//       description: "Premium intercity travel solutions",
//       features: ["Direct Routes", "Comfortable Journey", "Professional Drivers"],
//       badge: "Most Popular"
//     },
//     {
//       id: 2,
//       name: "Airport Transfers",
//       image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80",
//       icon: FaPlane,
//       url: "air-port-transfer",
//       description: "Reliable airport pickup & drop-off",
//       features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"],
//       badge: "24/7 Available"
//     },
//     {
//       id: 3,
//       name: "By The Hour Service",
//       image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&q=80",
//       icon: FaClock,
//       url: "by-the-hour",
//       description: "Flexible hourly rental options",
//       features: ["Flexible Timing", "Multiple Stops", "No Hidden Fees"],
//       badge: "Flexible"
//     },
//     {
//       id: 4,
//       name: "Schedule Ride Service",
//       image: "https://images.unsplash.com/photo-1550475762-ab5ccb894e7d?w=300&q=80",
//       icon: FaCalendarAlt,
//       url: "schedule-ride",
//       description: "Pre-planned transportation bookings",
//       features: ["Advance Booking", "Guaranteed Availability", "Reminder Alerts"],
//       badge: "Reliable"
//     }
//   ];

//   const handleSolutionClick = (url: string) => {
//     console.log(`Navigate to: ${url}`);
//     // Navigate to contact section for demo
//     const element = document.getElementById('contact');
//     if (element) {
//       const headerOffset = 90;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <div className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
//       <section id="solutions" className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Unique Header Design */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <div className="relative inline-block">
//             <motion.div
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2, type: "spring" }}
//               className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
//             >
//               <FaStar className="text-white" />
//             </motion.div>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
//               Transportation{' '}
//               <span className="text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text">
//                 Solutions
//               </span>
//             </h1>
//           </div>
//           <motion.p
//             className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//           >
//             Discover our comprehensive range of premium transportation services designed for your every need
//           </motion.p>
//         </motion.div>

//         {/* Unique Grid Layout */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {solutionsData?.map((solution, index) => (
//             <motion.div
//               key={solution.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.15 }}
//               whileHover={{
//                 y: -12,
//                 scale: 1.02,
//                 rotateY: 2,
//                 boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
//               }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleSolutionClick(solution.url)}
//               className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100 dark:border-gray-700"
//             >
//               {/* Badge */}
//               <div className="absolute top-4 right-4 z-20">
//                 <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//                   {solution.badge}
//                 </span>
//               </div>

//               {/* Image Section */}
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={solution?.image}
//                   alt={solution?.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

//                 {/* Icon Overlay */}
//                 <div className="absolute top-4 left-4">
//                   <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                     <solution.icon className="text-white text-xl" />
//                   </div>
//                 </div>

//                 {/* Hover Action */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileHover={{ opacity: 1, scale: 1 }}
//                   className="absolute inset-0 flex items-center justify-center"
//                 >
//                   <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
//                     <span className="text-gray-900 dark:text-white font-semibold flex items-center">
//                       Explore Service
//                       <FaArrowRight className="ml-2" />
//                     </span>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Content Section */}
//               <div className="p-8 space-y-6">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-3">
//                     {solution?.name}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                     {solution?.description}
//                   </p>
//                 </div>

//                 {/* Features List */}
//                 <div className="space-y-3">
//                   <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
//                     Key Features:
//                   </h4>
//                   <ul className="space-y-2">
//                     {solution.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
//                         <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mr-3"></div>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Action Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleSolutionClick(solution.url);
//                   }}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
//                 >
//                   Book This Service
//                   <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//                 </motion.button>
//               </div>

//               {/* Decorative Elements */}
//               <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-r from-blue-600/10 to-indigo-700/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-20 text-center"
//         >
//           <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
//             {/* Background Pattern */}
//             {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M20 20c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z\"/%3E%3C/g%3E%3C/svg%3E')]"></div> */}

//             <div className="relative z-10">
//               <h3 className="text-3xl font-bold mb-4">
//                 Need Something Custom?
//               </h3>
//               <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
//                 We specialize in creating tailored transportation solutions for special events, corporate needs, and unique requirements. Let's discuss your specific needs.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleSolutionClick('contact')}
//                   className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
//                 >
//                   Get Custom Quote
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
//                 >
//                   View All Services
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default SolutionsHub;

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaRoute,
  FaPlane,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

const SolutionsHub = () => {
  // Solutions data with unique structure
  const solutionsData = [
    {
      id: 1,
      name: "City to City Service",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&q=80",
      icon: FaRoute,
      url: "city-to-city",
      description: "Premium intercity travel solutions",
      features: [
        "Direct Routes",
        "Comfortable Journey",
        "Professional Drivers",
      ],
      badge: "Most Popular",
    },
    {
      id: 2,
      name: "Airport Transfers",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80",
      icon: FaPlane,
      url: "air-port-transfer",
      description: "Reliable airport pickup & drop-off",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"],
      badge: "24/7 Available",
    },
    {
      id: 3,
      name: "By The Hour Service",
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&q=80",
      icon: FaClock,
      url: "by-the-hour",
      description: "Flexible hourly rental options",
      features: ["Flexible Timing", "Multiple Stops", "No Hidden Fees"],
      badge: "Flexible",
    },
    {
      id: 4,
      name: "Schedule Ride Service",
      image:
        "https://images.unsplash.com/photo-1550475762-ab5ccb894e7d?w=300&q=80",
      icon: FaCalendarAlt,
      url: "schedule-ride",
      description: "Pre-planned transportation bookings",
      features: [
        "Advance Booking",
        "Guaranteed Availability",
        "Reminder Alerts",
      ],
      badge: "Reliable",
    },
  ];

  const handleSolutionClick = (url: string) => {
    // This will be handled by Link component
    console.log(`Navigate to: ${url}`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <section id="solutions" className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Unique Header Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -right-6 -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
            >
              <FaStar className="text-white" />
            </motion.div>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Transportation{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
          </div>
          <motion.p
            className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Discover our comprehensive range of premium transportation services
            designed for your every need
          </motion.p>
        </motion.div>

        {/* Unique Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {solutionsData?.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                rotateY: 2,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-700 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Wrap entire card in Link */}
              <Link href={solution.url} className="block">
                {/* Badge */}
                <div className="absolute right-4 top-4 z-20">
                  <span className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {solution.badge}
                  </span>
                </div>

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={solution?.image}
                    alt={solution?.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Icon Overlay */}
                  <div className="absolute left-4 top-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <solution.icon className="text-xl text-white" />
                    </div>
                  </div>

                  {/* Hover Action */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="rounded-2xl bg-white/90 px-6 py-3 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
                      <span className="flex items-center font-semibold text-gray-900 dark:text-white">
                        Explore Service
                        <FaArrowRight className="ml-2" />
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="space-y-6 p-8">
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {solution?.name}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {solution?.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        >
                          <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-700/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute -left-2 -top-2 h-16 w-16 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              </Link>

              {/* Separate Action Button (outside Link to avoid nested links) */}
              <div className="px-8 pb-8">
                <Link href={solution.url}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg"
                  >
                    Book This Service
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-12 text-white dark:from-gray-800 dark:to-gray-900">
            {/* Background Pattern */}
            {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M20 20c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z\"/%3E%3C/g%3E%3C/svg%3E')]"></div> */}

            <div className="relative z-10">
              <h3 className="mb-4 text-3xl font-bold">
                Need Something Custom?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                We specialize in creating tailored transportation solutions for
                special events, corporate needs, and unique requirements. Let's
                discuss your specific needs.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-white px-8 py-4 font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-100"
                  >
                    Get Custom Quote
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
                  >
                    View All Services
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SolutionsHub;
