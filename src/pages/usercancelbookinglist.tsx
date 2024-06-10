import React from "react";
import CustomerCancelBookingListComponent from "~@/components/feature/CustomerCancelBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerCancelBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<CustomerCancelBookingListComponent />} />
    </div>
  );
};

export default CustomerCancelBookingListPage;
