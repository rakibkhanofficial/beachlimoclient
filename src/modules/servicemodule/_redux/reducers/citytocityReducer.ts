import * as Types from "../types/citytocity";
import type { ICitytoCityCreateReducer } from "../interface";
import type { AnyAction } from "@reduxjs/toolkit";

// Function to format date as YYYY-MM-DD
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to format time as HH:MM
const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Get current date and time
const currentDate = new Date();
const currentDateString = formatDate(currentDate);
const currentTimeString = formatTime(currentDate);

const initialState: ICitytoCityCreateReducer = {
  CitytoCityServiceInput: {
    airportname: "",
    flightno: "",
    pickupLocation: "",
    pickupAddress: "",
    pickupdate: currentDateString,
    pickuptime: currentTimeString,
    dropoffLocation: "",
    dropoffAddress: "",
    distance: 0,
    name: "",
    phone: "",
    luggage: "",
    passenger: "",
    triptype: "",
    area: "",
    adressdescription: "",
    adress: "",
    hour: 0,
    paymentmethod: ""
  },
  isSubmitting: false,
  errors: "",
  step: 0,
};

const CitytoCityReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.CITY_TO_CITY_INPUT_CHANGE:
      const CityToCityInputChange = { ...state.CitytoCityServiceInput, ...action.payload };
      return {
        ...state,
        CitytoCityServiceInput: CityToCityInputChange,
      };

    case Types.CITY_TO_CITY_STEP_INCREMENT_DECREMENT:
      return {
        ...state,
        step: action.payload,
      };

    default:
      return state;
  }
};

export default CitytoCityReducer;
