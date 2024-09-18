import React from "react";
import { AllProductLayout } from "~@/components/feature/Allcars/allProductsLayout";

const AllCarsPage = () => {
  return (
    <div className=" bg-gray-100 text-black dark:bg-slate-800 dark:text-gray-100 ">
      <div className=" bg-white text-black dark:bg-slate-800 dark:text-white ">
        <AllProductLayout />
      </div>
    </div>
  );
};

export default AllCarsPage;
