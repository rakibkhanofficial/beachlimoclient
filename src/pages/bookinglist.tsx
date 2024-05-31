import React from "react";
import BookingListComponent from "~@/components/feature/BookingList";
import { UserDashboardLayout } from "~@/components/feature/UserDashboard/layout/layout";

const BookingListPage = () => {
    
    return(
        <div>
      <UserDashboardLayout children={<BookingListComponent/>} />
        </div>
    );
};

export default BookingListPage