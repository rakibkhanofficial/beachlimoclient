export const endPoints = {
  auth: {
    // sendOtp: 'auth/sendOtp',
    // verifyOtp: 'auth/verifyOtp',
    register: 'users/signup',
    login: 'users/login',
    updatePassword: 'auth/update-password',
    logout: 'users/logout',
  },
  Customer: {
    CreateBooking: "carrents/createCarRental",
    getRentAllByuserId: (userId: string) => `carrents/rentalbyuser/${userId}`,
    getPendingRentAllByuserId: (userId: string) => `carrents/pendingrentalbyuser/${userId}`,
    getRentadetailsbyRentId: "carrents/rentalbyid"
  },
  Admin: {
    getAllCustomerList: "admin/allusersdata",
    getAllDriverList: "admin/alldriverdata",
    getAllPendinBooking: "admin/pendingrentadata",
    updatestatusbyrentalid: (id: string) => `admin/rental/${id}/status`
  }
}
