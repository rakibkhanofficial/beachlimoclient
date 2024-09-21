"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdHandshake, MdKey, MdTrendingUp } from "react-icons/md";
import { fadeIn } from "../../../../variant";

const Whychoose = () => {
  return (
    <section
      className=" my-36 flex h-[90vh] items-center bg-white dark:bg-slate-800 md:my-0 "
      id="whychoose"
    >
      <div className="container mx-auto grid gap-2 md:gap-6">
        <div>
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="text-center text-[2rem] font-bold text-black dark:text-white md:text-[4rem]"
          >
            Unmatched excellence and customer satisfaction
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="mx-auto mb-2 max-w-[680px] text-center text-black dark:text-white "
          >
            Our dedication to providing exceptional services sets us apart from
            the competition. From the moment you engage with us, we strive to
            exceed your expectations in every interaction.
          </motion.p>
        </div>
        <div>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className=" justify-center md:flex xl:mb-2  "
          >
            <Image
              src={"/images/limocars/allcars2.png"}
              width={1068}
              height={420}
              alt="car"
            />
          </motion.div>
        </div>
        <div>
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className="flex flex-wrap justify-center gap-4 xl:grid xl:grid-cols-3 xl:gap-x-[30px] xl:gap-y-0"
          >
            <div className="flex max-w-[160px] flex-col items-center p-2 text-center xl:max-w-none xl:p-0">
              <MdKey className="text-accent mb-4 text-[38px] text-black dark:text-white " />
              <h3 className="h3 text-black dark:text-white">
                Rent simply and quickly.
              </h3>
              <p className="hidden text-black dark:text-white xl:flex">
                We priortize your need and we go above and beyond to ensure your
                experience with us is nothing short of outstanding.
              </p>
            </div>

            <div className="flex max-w-[160px] flex-col items-center p-2 text-center xl:max-w-none xl:p-0">
              <MdTrendingUp className="text-accent mb-4 text-[38px] text-black dark:text-white " />
              <h3 className="h3 text-black dark:text-white">
                Modern & well maintained vehicles
              </h3>
              <p className="hidden text-black dark:text-white xl:flex">
                We priortize your need and we go above and beyond to ensure your
                experience with us is nothing short of outstanding.
              </p>
            </div>

            <div className="flex max-w-[160px] flex-col items-center p-2 text-center xl:max-w-none xl:p-0">
              <MdHandshake className="text-accent mb-4 text-[38px] text-black dark:text-white " />
              <h3 className="h3 text-black dark:text-white">
                Prompt and flexible services
              </h3>
              <p className="hidden text-black dark:text-white xl:flex">
                We priortize your need and we go above and beyond to ensure your
                experience with us is nothing short of outstanding.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Whychoose;
