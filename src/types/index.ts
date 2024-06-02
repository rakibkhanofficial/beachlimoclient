

export type ResponseType = {
    statusCode: number
    error: string
    message: string
    Status: number
    data: {
      email: string,
      name: string,
      phone: string,
      strAccess_token: string;
      strRefresh_token: string,
      userId: number
    }
  }

  export interface IRegisterType {
    email: string
    password: string
    firstName: string
    lastName: string
  }

  export type IuserBookingListType = {
    _id: string;
    userId: string;
    triptype: "CityToCity" | "AirportTransfer" | "ByTheHour" | "ScheduleRide"; // Enum or specific string values
    airportname: string; // Empty string if not applicable
    flightno: string; // Empty string if not applicable
    childseat: boolean;
    luggage: number;
    passenger: number;
    carModel: string;
    carName: string;
    mobilenumber: string;
    pickuplocationAdress: string;
    pickuplocationMapLink: string;
    pickupDate: string; // ISO 8601 date string
    pickuptime: string; // HH:mm:ss format
    dropofflocationAdress: string;
    dropofflocationMapLink: string;
    rentalprice: number;
    createdDate: string; // ISO 8601 date string
    status: "pending" | "confirmed" | "completed" | "canceled"; // Enum for status
    renterName: string;
    renterPhone: string;
    __v: number;
  }

  export type DriverType = {
    username: string;
    email: string;
    phone: string;
    role: string
    status: string
    image: string
  }

  export type CustomerType = {
    username: string;
    email: string;
    phone: string;
    role: string
    status: string
    image: string
  }