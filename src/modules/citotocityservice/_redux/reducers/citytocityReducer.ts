import * as Types from "../types/citytocity";
import type { ICitytoCityCreateReducer } from "../interface";
import type { AnyAction } from "@reduxjs/toolkit";

const initialState: ICitytoCityCreateReducer = {
  CitytoCityServiceInput: {
    branchname: "",
    city: "",
    area: "",
    pickupLocation: "",
    pickupAddress: "",
    pickupdate: "",
    pickuptime: "",
    dropoffLocation: "",
    dropoffAddress: "",
    distance: "",
    adress: "",
    adressdescription: "",
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
