"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import DriverListComponenet from "~@/components/feature/Driverlist";

const CreateDriverPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<DriverListComponenet />} />
    </div>
  );
};

export default CreateDriverPage;
