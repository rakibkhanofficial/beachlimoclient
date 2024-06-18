"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import AdminDashbaordOverView from "~@/components/feature/AdminDashboardOverview";

const AdminDashBoard = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminDashbaordOverView />} />
    </div>
  );
};

export default AdminDashBoard;
