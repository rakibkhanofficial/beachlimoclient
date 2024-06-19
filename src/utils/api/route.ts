export const endPoints = {
  auth: {
    // sendOtp: 'auth/sendOtp',
    // verifyOtp: 'auth/verifyOtp',
    register: 'auth/signup',
    login: 'auth/login',
    updatePassword: 'auth/update-password',
    logout: 'auth/logout',
  },
  Customer: {
    CreateBooking: "customer/createCarRental",
    getRentAllByuserId: (userId: string) => `customer/rentalbyuser/${userId}`,
    getPendingRentAllByuserId: (userId: string) => `customer/pendingrentalbyuser/${userId}`,
    getAcceptedRentAllByuserId: (userId: string) => `customer/acceptedbookingbyuserid/${userId}`,
    getAssignRentAllByuserId: (userId: string) => `customer/assignbookingbyuserid/${userId}`,
    getCompleteRentAllByuserId: (userId: string) => `customer/completebookingbyuserid/${userId}`,
    getCancelRentAllByuserId: (userId: string) => `customer/cancelbookingbyuserid/${userId}`,
    getRentadetailsbyRentId: "customer/rentalbyid",
    getAllBooking: ( userId: string) => `customer/analytics/totalbooking/${userId}`,
  },
  Admin: {
    allbookinglistforadmin: "admin/allrentaldata",
    getAllPendinBooking: "admin/pendingrentadata",
    updatestatusbyrentalid: (id: string) => `admin/rental/${id}/status`,
    getAcceptedBookingList: "admin/acceptedrentadata",
    updateDriver: (id: string) => `admin/assigndriverbyid/${id}`,
    getAssignBookingList: "admin/assignedrentadata",
    getCompleteBookingList: "admin/completerentadata",
    getCancelBookingList: "admin/cancelrentadata",
    getAllCustomerList: "admin/allusersdata",
    getAllDriverList: "admin/alldriverdata",
    getTotalBookingbyAdmin: "admin/analytics/totalbooking"
  },
 Driver: {
    getAssignBookingList: (id: string) => `driver/driverassignedrentaldata/${id}`,
    updateStatusByDriver: (id: string) => `driver/driverrental/status/${id}`,
    getCompleteBookingList: (id: string) => `driver/drivercompleterentaldata/${id}`,
    getCanceledBookingList: (id: string) => `driver/drivercancelrentaldata/${id}`,
    getTotalBooking: (id: string) => `driver/analytics/drivertotalbookingdata/${id}`,
  }
}
