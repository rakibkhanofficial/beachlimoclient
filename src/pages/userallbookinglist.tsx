import React from "react";
import BookingListComponent from "~@/components/feature/CustomerAllBookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const CustomerAllBookingListPage = () => {
  return (
    <div>
      <UserDashboardLayout children={<BookingListComponent />} />
    </div>
  );
};

export default CustomerAllBookingListPage;
