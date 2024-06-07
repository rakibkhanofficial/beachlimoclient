import React from "react";
import DriverCompleteBookingListComponent from "~@/components/feature/DriverCompleteBookingList";
import { DriverDashboardLayout } from "~@/components/feature/DriverDashboard/layout/layout";

const DriverCompleteBookingListPage = () => {
  return (
    <div>
      <DriverDashboardLayout children={<DriverCompleteBookingListComponent />} />
    </div>
  );
};

export default DriverCompleteBookingListPage;
