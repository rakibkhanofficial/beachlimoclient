import React from "react";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";
import UserDashboard from "~@/components/feature/UserDashboardOverView";

const UserDashBoard = () => {
  return (
    <div>
      <UserDashboardLayout children={<UserDashboard />} />
    </div>
  );
};

export default UserDashBoard;
