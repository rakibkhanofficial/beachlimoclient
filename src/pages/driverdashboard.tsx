import React from "react";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";
import DriverDashboardOverview from "~@/components/feature/DriverDashboardOverView";

const DriverDashBoardPage = () => {
  return (
    <div>
      <DriverDashboardLayout children={<DriverDashboardOverview />} />
    </div>
  );
};

export default DriverDashBoardPage;
