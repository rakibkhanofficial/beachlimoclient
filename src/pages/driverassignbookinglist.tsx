import React from "react";
import DriverAssignBookingListComponent from "~@/components/feature/DriverAssignBookingListByDriver";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";

const DriverAssignBookingListPage = () => {
  return (
    <div>
      <DriverDashboardLayout children={<DriverAssignBookingListComponent />} />
    </div>
  );
};

export default DriverAssignBookingListPage;
