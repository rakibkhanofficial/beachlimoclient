import React from "react";
import DriverCancelBookingListComponent from "~@/components/feature/DriverCancelBookingList";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";

const DriverCancelBookingListPage = () => {
  return (
    <div>
      <DriverDashboardLayout children={<DriverCancelBookingListComponent />} />
    </div>
  );
};

export default DriverCancelBookingListPage;
