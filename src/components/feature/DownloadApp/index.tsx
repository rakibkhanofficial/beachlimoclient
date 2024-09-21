"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../variant";

const DownloadApp = () => {
  return (
    <section
      className=" xl:pt-18 flex items-end overflow-hidden bg-white pb-4 pt-5 dark:bg-slate-800 md:pt-16 "
      id="download"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row xl:items-center">
          <div className="mb-12 flex-1 text-center md:mb-0 md:text-left xl:ml-24 ">
            <div className="order-2 mx-auto max-w-[520px] xl:order-none">
              <motion.h2
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className=" text-[2rem] font-bold text-black dark:text-white md:text-[4rem] "
              >
                Download our app now and hit the road with ease
              </motion.h2>
              <motion.p
                variants={fadeIn("right", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="mb-10 px-4 text-black dark:text-white md:text-lg"
              >
                {`Join the thousands of satisfied travelers who have embraced the convenience of our rental car service app. Elevate your journey, embrace the freedom of mobility, and let the open road become your canvas. Download our app now and make every trip an unforgettable experience! 🌟🚗`}
              </motion.p>
              <motion.div
                variants={fadeIn("right", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="flex justify-center gap-x-3 md:justify-start "
              >
                <button title="button" type="button" className="btn-cta">
                  <Image
                    alt="img"
                    src={"/icons/buttons/google-play.svg"}
                    width={132}
                    height={36}
                  />
                </button>
                <button title="button" type="button" className="btn-cta">
                  <Image
                    alt="img"
                    src={"/icons/buttons/app-store.svg"}
                    width={132}
                    height={36}
                  />
                </button>
              </motion.div>
            </div>
          </div>
          <motion.div
            variants={fadeIn("left", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="order-1 flex flex-1 justify-center md:order-none "
          >
            <Image
              alt="phone"
              src={"/images/cta/phone2.png"}
              width={320}
              height={640}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
