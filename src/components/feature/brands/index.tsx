"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeIn } from "../../../../variant";

const BrandsSection = () => {
  return (
    <section
      id="brand"
      className=" flex w-full items-center justify-center bg-white py-5 dark:bg-slate-800 xl:h-auto "
    >
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.6 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-3 place-content-center items-center justify-center  gap-2 xl:flex xl:justify-between">
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/ford.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/audi.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/bmw.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/skoda.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/mercedes.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/mazda.svg"}
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="image"
              src={"/icons/brands/vw.svg"}
              width={60}
              height={60}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BrandsSection;
