import React from "react";
import CustomerCompleteBookingListComponent from "~@/components/feature/CustomerCompleteBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerCompleteBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<CustomerCompleteBookingListComponent />} />
    </div>
  );
};

export default CustomerCompleteBookingListPage;
