"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdHandshake, MdKey, MdTrendingUp } from "react-icons/md";
import { fadeIn } from "../../../../variant";

 const Whychoose = () => {
  return (
    <section className=" h-[90vh] flex items-center " id="whychoose">
      <div className="container mx-auto grid gap-2 md:gap-6">
        <div>
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className="text-[2rem] font-bold md:text-[4rem] text-center"
        >
          Unmatched excellence and customer satisfaction
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className="max-w-[680px] text-center mx-auto mb-2 "
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
          className=" md:flex justify-center xl:mb-2  "
        >
          <Image src={"/images/limocars/allcars2.png"} width={1068} height={420} alt="car" />
        </motion.div>
        </div>
        <div>
        <motion.div 
         variants={fadeIn("up", 0.8)}
         initial="hidden"
         whileInView={"show"}
         viewport={{ once: false, amount: 0.4 }}
        className="flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-4 xl:gap-y-0 xl:gap-x-[30px]">
          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdKey className="text-[38px] text-accent mb-4 " />
            <h3 className="h3">Rent simply and quickly.</h3>
            <p className="hidden xl:flex">
              We priortize your need and we go above and beyond to ensure your
              experience with us is nothing short of outstanding.
            </p>
          </div>

          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdTrendingUp className="text-[38px] text-accent mb-4 " />
            <h3 className="h3">Modern & well maintained vehicles</h3>
            <p className="hidden xl:flex">
              We priortize your need and we go above and beyond to ensure your
              experience with us is nothing short of outstanding.
            </p>
          </div>

          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdHandshake className="text-[38px] text-accent mb-4 " />
            <h3 className="h3">Prompt and flexible services</h3>
            <p className="hidden xl:flex">
              We priortize your need and we go above and beyond to ensure your
              experience with us is nothing short of outstanding.
            </p>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Whychoose;
