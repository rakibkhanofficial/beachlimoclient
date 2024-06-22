"use client";
import React, { useContext } from "react";
// import Search from "../Search";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";
// import { SearchContext } from "~@/context/search";
import { fadeIn } from "../../../../variant";
import OurService from "../OurService";
import HeroSectionCarousel from "./CarouselSetup";

const HeroSection = () => {
  // const searchActive = useContext(SearchContext);
  return (
    <section className=" h-auto bg-[#b2b7c2]/10 xl:h-[70vh] " id="home">
      <div className="container mx-auto ">
        <div className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center md:justify-between ">
          <div className="text-center xl:mt-0 xl:max-w-xl xl:text-left">
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className=" mb-2 text-[3rem] font-bold md:text-[3rem] xl:text-[4rem] "
            >
              Explore the Finest <span className="text-[#f11717]">Global</span>
              Service
            </motion.h1>
            <motion.p
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="description mx-auto mb-6 max-w-[550px] xl:mx-0 xl:mb-10 "
            >
              Find your ideal ride for any adventure with our diverse range of
              affordable and dependable car rentals.
            </motion.p>
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.8 }}
              className="flex justify-center gap-x-3 xl:justify-start "
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
          <div>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            //   className="relative w-full h-full max-h-[50vh] md:max-w-[70vw] xl:max-w-[860px]
            // xl:max-h-[542px] xl:absolute xl:-right-[100px] min-[1680px]:right-[120px] xl:top-48"
          >
          <HeroSectionCarousel/>
          </motion.div>
          </div>
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
      <div className=" mt-10 ">
        <OurService />
      </div>
    </section>
  );
};

export default HeroSection;
