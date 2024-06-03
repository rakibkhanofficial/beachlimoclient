"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import AdminPendingBookingListComponent from "~@/components/feature/AdminPendingBookinglist";

const AdminPendingBookingList = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminPendingBookingListComponent />} />
    </div>
  );
};

export default AdminPendingBookingList;