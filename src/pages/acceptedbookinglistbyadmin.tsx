"use client";
import React from "react";
import AdminAcceptedBookingListComponent from "~@/components/feature/AcceptedBookingListByAdmin";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";

const AcceptedBookingListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminAcceptedBookingListComponent />} />
    </div>
  );
};

export default AcceptedBookingListPage;
