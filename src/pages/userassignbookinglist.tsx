import React from "react";
import CustomerAssignBookingListComponent from "~@/components/feature/CustomerAssignBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerAssignBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<CustomerAssignBookingListComponent />} />
    </div>
  );
};

export default CustomerAssignBookingListPage;
