import { useSession } from "next-auth/react";
import React from "react";
import CityToCity from "~@/components/feature/CityToCityServices";
import HeaderLandingPage from "~@/components/feature/Header";
import UserLogin from "~@/components/feature/login";

const CityToCityService = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-white ">
      <HeaderLandingPage />
      <div className=" w-full min-h-screen">
        {session?.user?.accessToken ? <CityToCity /> : <UserLogin />}
      </div>
    </div>
  );
};

export default CityToCityService;