
import { useSession } from "next-auth/react";
import React from "react";
import Bythehour from "~@/components/feature/ByTheHour";
import HeaderLandingPage from "~@/components/feature/Header";
import UserLogin from "~@/components/feature/login";

const BytheHourService = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-white ">
      <HeaderLandingPage />
      <div className=" w-full min-h-screen lg:min-h-[90vh] xl:min-h-[90vh] 2xl:min-h-[93vh] flex justify-center items-center px-4 lg:px-10 py-4 lg:py-10">
        {session?.user?.accessToken ? <Bythehour /> : <UserLogin />}
      </div>
    </div>
  );
};

export default BytheHourService;
