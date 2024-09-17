import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import SubCategoryManagementComponent from "~@/components/feature/SubcategoryManagement";
import React from "react";

const SubcategoryManagementPage = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white ">
      <AdminDashboardLayout children={<SubCategoryManagementComponent />} />
    </div>
  );
};

export default SubcategoryManagementPage;
