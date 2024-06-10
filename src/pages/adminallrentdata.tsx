"use client";
import React from "react";
import AdminAllBookingListComponent from "~@/components/feature/AdminAllrentList";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";

const AdminAllBookingListPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<AdminAllBookingListComponent />} />
    </div>
  );
};

export default AdminAllBookingListPage;
