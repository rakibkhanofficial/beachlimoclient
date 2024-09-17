import React from "react";
import NotificationManagement from "../components/feature/NotificationManagement/index";
import { AdminDashboardLayout } from "~@/components/feature/AdminDashboard/layout/layout";

const NotificationManagementPage = () => {
  return (
    <div>
      <AdminDashboardLayout children={<NotificationManagement />} />
    </div>
  );
};

export default NotificationManagementPage;
