import React from "react";
import CustomerPendingBookingListComponent from "~@/components/feature/CustomerPendingBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerPendingBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<CustomerPendingBookingListComponent />} />
    </div>
  );
};

export default CustomerPendingBookingListPage;
