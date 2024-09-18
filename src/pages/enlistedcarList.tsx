import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import React from "react";
import EnlistedCarListComponent from "~@/components/feature/ProductManagement/ProductList";

const EnlistedCarPage = () => {
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white ">
      <AdminDashboardLayout children={<EnlistedCarListComponent />} />
    </div>
  );
};

export default EnlistedCarPage;
