"use client";
import React from "react";
import AdminCompleteBookingListComponent from "~@/components/feature/AdminCompleteBookingList";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";

const AdminCompleteBookingListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminCompleteBookingListComponent />} />
    </div>
  );
};

export default AdminCompleteBookingListPage;
