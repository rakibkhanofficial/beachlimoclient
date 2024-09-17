import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import CreateProductComponent from "~@/components/feature/ProductManagement/CreateProduct";
import React from "react";

const CreateCarPage = () => {
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white ">
      <AdminDashboardLayout children={<CreateProductComponent />} />
    </div>
  );
};

export default CreateCarPage;
