import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import CategoryManagementComponent from "~@/components/feature/CategoryManagement";
import React from "react";

const CategoryManagementPage = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white ">
      <AdminDashboardLayout children={<CategoryManagementComponent />} />
    </div>
  );
};

export default CategoryManagementPage;
