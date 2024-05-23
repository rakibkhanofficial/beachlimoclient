import React from "react";
import { DashboardLayout } from "~@/components/feature/Dashboard/layout/layout";
import UserDashboard from "~@/components/feature/userDashboardOverView";

const UserDashBoard = () => {
  return (
    <div>
      <DashboardLayout children={<UserDashboard />} />
    </div>
  );
};

export default UserDashBoard;
