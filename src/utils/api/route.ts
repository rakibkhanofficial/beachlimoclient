export const endPoints = {
  auth: {
    register: "auth/register",
    login: "auth/login",
    sendOtp: "auth/send-otp",
    verifyOtp: "auth/verify-otp",
    updatePassword: "auth/reset-password",
    logout: "auth/logout",
    OAuthLogin: "auth/oauth-callback",
    refreshToken: "auth/refresh-token",
  },
  user: {
    getUserDetailsById: (Id: number) => `user/userdetails/${Id}`,
    upDateUserDetails: (Id: number) => `user/userdetails/update/${Id}`,
  },
  uploadImage: {
    uploadImageApi: "blob/upload",
  },
  cars: {
    getAllCars: "cars",
    getCarDetailsById: (id: number) => `cars/${id}`,
    updateCar: (id: number) => `cars/update/${id}`,
    deleteCar: (id: number | null) => `cars/delete/${id}`,
    addCar: "cars/create",
    getAllPublicCarList: "cars/public-list",
    getPublicCardetailsBySlug: (slug: string | string[]) =>
      `cars/public-details/${slug}`,
    getAllSlugs: "cars/slugs",
  },
  category: {
    createCategory: "categories/createCategory",
    getAllCategories: "categories",
    getCategoryById: (id: number) => `categories/${id}`,
    updateCategory: (id: number) => `categories/update/${id}`,
    deleteCategory: (id: number) => `categories/delete/${id}`,
    getAllCategoryiesPublic: "categories/publicCategory",
  },
  subcategory: {
    createSubCategory: "subcategories/createSubCategory",
    getAllSubcategories: "subcategories",
    getSubCategoryById: (id: number) => `subcategories/${id}`,
    updateSubCategory: (id: number) => `subcategories/update/${id}`,
    deleteSubCategory: (id: number) => `subcategories/delete/${id}`,
    getAllSubcategoryByCategoryId: (categoryId: number | null) =>
      `subcategories/subcategorybycategoryId/${categoryId}`,
  },
  Customer: {
    // old api versions
    CreateBooking: "customer/createCarRental",
    getRentAllByuserId: (page: number, limit: number) =>
      `car-bookings/carBookingsbyuser/${page}/${limit}`,
    getPendingRentAllByuserId: (userId: string) =>
      `customer/pendingrentalbyuser/${userId}`,
    getAcceptedRentAllByuserId: (userId: string) =>
      `customer/acceptedbookingbyuserid/${userId}`,
    getAssignRentAllByuserId: (userId: string) =>
      `customer/assignbookingbyuserid/${userId}`,
    getCompleteRentAllByuserId: (userId: string) =>
      `customer/completebookingbyuserid/${userId}`,
    getCancelRentAllByuserId: (userId: string) =>
      `customer/cancelbookingbyuserid/${userId}`,
    getRentadetailsbyRentId: "customer/rentalbyid",
    getAllBooking: (userId: string) =>
      `customer/analytics/totalbooking/${userId}`,
    getCompleteBookingDaily: (userId: string) =>
      `customer/analytics/dailycompletebooking/${userId}`,

    // new api versions
    createBookingByCash: "car-bookings/createbookingbycash",
    createPaymentIntent: "/payments/create-payment-intent",
    createBookingAfterPayment: "/payments/create-booking-after-payment",
    confirmPayment: "/payments/confirm-payment",
  },
  Admin: {
    getRentAllforAdmin: (page: number, limit: number) =>
      `car-bookings/admincarBookinlist/${page}/${limit}`,
    getBookingDetails: (id: number | null | undefined) =>
      `car-bookings/admincarbookingdetails/${id}`,
    updateBookingStatusById: (id: number | null | undefined) =>
      `car-bookings/update-status/${id}`,

    // old route
    getAllPendinBooking: "admin/pendingrentadata",
    updatestatusbyrentalid: (id: string) => `admin/rental/${id}/status`,
    getAcceptedBookingList: "admin/acceptedrentadata",
    updateDriver: (id: string) => `admin/assigndriverbyid/${id}`,
    getAssignBookingList: "admin/assignedrentadata",
    getCompleteBookingList: "admin/completerentadata",
    getCancelBookingList: "admin/cancelrentadata",
    getAllCustomerList: "admin/allusersdata",
    getAllDriverList: "admin/alldriverdata",
    getTotalBookingbyAdmin: "admin/analytics/totalbooking",
    getTotalCompletebookingDaily: "admin/analytics/dailycompletebooking",
  },
  Driver: {
    getAssignBookingList: (id: string) =>
      `driver/driverassignedrentaldata/${id}`,
    updateStatusByDriver: (id: string) => `driver/driverrental/status/${id}`,
    getCompleteBookingList: (id: string) =>
      `driver/drivercompleterentaldata/${id}`,
    getCanceledBookingList: (id: string) =>
      `driver/drivercancelrentaldata/${id}`,
    getTotalBooking: (id: string) =>
      `driver/analytics/drivertotalbookingdata/${id}`,
    getCompleteBookingDaily: (id: string) =>
      `driver/analytics/dailycompletebooking/${id}`,
  },
  Subscribe: {
    CreateSubsribe: "subscriber/subscribe",
  },
};
