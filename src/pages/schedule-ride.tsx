import React from "react";
import FooterComponent from "~@/components/feature/Footer";
import HeaderLandingPage from "~@/components/feature/Header";
import SecheduleRideServiceBythehour from "~@/components/feature/ScheduleRideSerices";

const ScheduleRideService = () => {
  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-white ">
      <HeaderLandingPage />
      <div className=" flex min-h-screen w-full items-center justify-center px-4 py-4 lg:min-h-[90vh] lg:px-10 lg:py-10 xl:min-h-[90vh] 2xl:min-h-[93vh]">
        <SecheduleRideServiceBythehour />
      </div>
      <FooterComponent />
    </div>
  );
};

export default ScheduleRideService;
