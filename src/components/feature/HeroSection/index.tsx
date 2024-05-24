"use client";
import React, { useContext } from "react";
// import Search from "../Search";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
// import { SearchContext } from "~@/context/search";
import { fadeIn } from "../../../../variant";
import OurService from "../OurService";

const HeroSection = () => {
  // const searchActive = useContext(SearchContext);
  return (
    <section className="h-screen xl:h-[70vh] bg-[#b2b7c2]/10 " id="home">
      <div className="container mx-auto ">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-center">
          <div className="text-center xl:max-w-xl xl:text-left xl:mt-0">
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className=" text-[3rem] md:text-[3rem] xl:text-[4rem] font-bold mb-2 "
            >
              Explore the Finest <span className="text-[#f11717]">Global</span>
              Offers
            </motion.h1>
            <motion.p
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="description max-w-[550px] mx-auto xl:mx-0 mb-6 xl:mb-10 "
            >
              Find your ideal ride for any adventure with our diverse range of
              affordable and dependable car rentals.
            </motion.p>
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.8 }}
              className="flex gap-x-3 justify-center xl:justify-start "
            >
              <button type="button" title="button" className="btn-cta">
                <Image
                  src={"/icons/buttons/google-play.svg"}
                  width={132}
                  height={36}
                  alt="google play"
                />
              </button>
              <button type="button" title="button" className="btn-cta">
                <Image
                  src={"/icons/buttons/app-store.svg"}
                  width={132}
                  height={36}
                  alt="app store icon"
                />
              </button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
          //   className="relative w-full h-full max-h-[50vh] md:max-w-[70vw] xl:max-w-[860px] 
          // xl:max-h-[542px] xl:absolute xl:-right-[100px] min-[1680px]:right-[120px] xl:top-48"
          >
            <Image
              src={"/images/limocars/carred.png"}
              width={800}
              height={500}
              alt="image"
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>
        <div className=" mt-10 ">
        <OurService/>
        </div>
      </div>
      {/* {searchActive ? (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ ease: easeInOut }}
          className="fixed top-[80px] z-10 w-full max-w-[1920px]"
        >
          <Search />
        </motion.div>
      ) : (
        <div className="-mt-12 w-full max-w-[1300px] mx-auto">
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Search />
          </motion.div>
        </div>
      )} */}
    </section>
  );
};

export default HeroSection;
