import { Divider } from "@nextui-org/react";
import React from "react";
import AboutSection from "~@/components/feature/AboutCompany";
import BrandsSection from "~@/components/feature/brands";
import DownloadApp from "~@/components/feature/DownloadApp";
import HeroSection from "~@/components/feature/HeroSection";
import Testimonial from "~@/components/feature/Testimonial";
import Whychoose from "~@/components/feature/whychoose";
// import OurBrands from "../ui/features/OurBrands/OurBrands";
// import Collections from "../ui/features/OurCollections/Collections";

const Main = () => {
  return (
    <div className=" w-full bg-white dark:bg-slate-800 ">
      <HeroSection/>
      {/* <Collections />
      <OurBrands/> */}
      <AboutSection/>
      <Whychoose/>
      <Testimonial/>
      <DownloadApp/>
      <BrandsSection/>
    </div>
  );
};

export default Main;
