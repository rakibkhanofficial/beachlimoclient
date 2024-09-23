"use client";
import Image from "next/image";
import {
  MdOutlineMapsHomeWork,
  MdOutlineBuildCircle,
  MdOutlineDirectionsCar,
} from "react-icons/md";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../variant";

const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <section
      className=" flex h-[90vh] items-center justify-center"
      id="services"
      ref={ref}
    >
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="mb-8 flex-1 xl:mb-0"
            >
              <Image
                className="max-md:w-[423px] md:h-[450px] md:w-[750px] md:rounded-[20px] "
                src={"/images/limocars/side.png"}
                width={320}
                height={448}
                // fill
                priority={true}
                alt="cars"
              />
            </motion.div>
          </div>
          <div className="flex flex-1 items-center xl:justify-center ">
            <div className=" w-[auto] xl:max-w-[517px]">
              <motion.h2
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className=" text-center text-[2.5rem] font-bold text-black dark:text-white md:text-start md:text-[4rem]"
              >
                Cars Services Simplified
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="mb-[42px] max-w-md text-center text-lg text-black text-opacity-25 dark:text-white md:text-start"
              >
                Rent, choose, and repair with ease. Our convinent locations,
                diverse car types, and reliable repair points ensure a seamless
                car experience.
              </motion.p>
              <motion.div
                variants={fadeIn("up", 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 flex items-center justify-center gap-8 lg:justify-start"
              >
                <div className="flex flex-col items-center justify-center md:w-[100px] md:items-start md:justify-start">
                  <MdOutlineDirectionsCar className="mb-2 text-5xl text-[#f13024]" />
                  <div className="mb-2 text-3xl font-black text-black dark:text-white">
                    {inView ? (
                      <CountUp start={0} end={50} duration={3} delay={1} />
                    ) : null}
                    +
                  </div>
                  <div className="text-[13px] font-semibold uppercase text-black dark:text-white ">
                    car <br />
                    types
                  </div>
                </div>

                <div className="flex  flex-col items-center justify-center md:w-[100px] md:items-start md:justify-start">
                  <MdOutlineMapsHomeWork className="mb-2 text-5xl text-[#f13024]" />
                  <div className="mb-2 text-3xl font-black text-black dark:text-white">
                    {inView ? (
                      <CountUp start={0} end={135} duration={3} delay={1} />
                    ) : null}
                    +
                  </div>
                  <div className="text-[13px] font-semibold uppercase text-black dark:text-white ">
                    rental
                    <br />
                    outlets
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center md:w-[100px] md:items-start md:justify-start">
                  <MdOutlineBuildCircle className="mb-2 text-5xl text-[#f13024]" />
                  <div className="mb-2 text-3xl font-black text-black dark:text-white">
                    {inView ? (
                      <CountUp start={0} end={35} duration={3} delay={1} />
                    ) : null}
                    +
                  </div>
                  <div className="text-[13px] font-semibold uppercase text-black dark:text-white ">
                    repair <br />
                    points
                  </div>
                </div>
              </motion.div>
              <motion.button
                variants={fadeIn("up", 1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="bg-accent hover:bg-accent-hover hidden h-16 w-full max-w-[184px] rounded-[10px] 
                text-[13px] font-medium uppercase tracking-[2px] text-black dark:text-white xl:block"
              >
                See all cars
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
