"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import AdminDashboard from "~@/components/feature/AdminDashboardOverView";

const AdminDashBoard = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminDashboard />} />
    </div>
  );
};

export default AdminDashBoard;
