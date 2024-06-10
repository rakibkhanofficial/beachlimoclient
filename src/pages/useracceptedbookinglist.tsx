import React from "react";
import CustomerAcceptedBookingListComponent from "~@/components/feature/CustomerAcceptedBookinglist";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerAcceptedBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<CustomerAcceptedBookingListComponent />} />
    </div>
  );
};

export default CustomerAcceptedBookingListPage;
