export const endPoints = {
  auth: {
    // sendOtp: 'auth/sendOtp',
    // verifyOtp: 'auth/verifyOtp',
    register: 'users/signup',
    login: 'users/login',
    updatePassword: 'auth/update-password',
    logout: 'auth/logout',
  },
  Customer: {
    CreateBooking: "carrents/createCarRental",
    getRentAllByuserId: "carrents/rentalbyuser",
    getRentadetailsbyRentId: "carrents/rentalbyid"
  }
}
