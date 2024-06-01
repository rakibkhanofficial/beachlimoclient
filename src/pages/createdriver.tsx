"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import DriverCreate from "~@/components/feature/CreateDriver";

const CreateDriverPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<DriverCreate />} />
    </div>
  );
};

export default CreateDriverPage;
