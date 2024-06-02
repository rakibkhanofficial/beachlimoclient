"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import CustomerListComponenet from "~@/components/feature/CustomerList";

const CustomerListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<CustomerListComponenet />} />
    </div>
  );
};

export default CustomerListPage;
