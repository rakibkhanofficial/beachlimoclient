"use client";
import React from "react";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";
import AssignBookingListByAdmin from "~@/components/feature/AssignBookinglistByAdmin";

const AdminAssignBookingListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AssignBookingListByAdmin />} />
    </div>
  );
};

export default AdminAssignBookingListPage;