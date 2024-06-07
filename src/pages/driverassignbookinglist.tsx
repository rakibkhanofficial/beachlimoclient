import React from "react";
import AssignBookingListComponent from "~@/components/feature/AssignBookingListByDriver";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";

const DriverAssignBookingListPage = () => {
  return (
    <div>
      <DriverDashboardLayout children={<AssignBookingListComponent />} />
    </div>
  );
};

export default DriverAssignBookingListPage;
