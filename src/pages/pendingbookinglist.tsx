import React from "react";
import PendingBookingListComponent from "~@/components/feature/PendingBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const PendingBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<PendingBookingListComponent />} />
    </div>
  );
};

export default PendingBookingListPage;
