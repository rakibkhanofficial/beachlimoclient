"use client";
import React from "react";
import AdminCancelBookingListComponent from "~@/components/feature/AdminCancelBookingList";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";

const AdminCancelBookingListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminCancelBookingListComponent />} />
    </div>
  );
};

export default AdminCancelBookingListPage;
