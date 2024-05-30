import type { Dispatch } from "@reduxjs/toolkit";
import * as Types from "../types/citytocity";

type selectedCarType = {
  id: number
  Carname: string;
  image: string;
  Model: string;
  perMilePrice: number;
  childSeat: boolean;
  perhourPrice : number
  passenger: number;
  Luggage: number;
  totalseat: number;
  isWifi: boolean
};

export const handleCitytoCityInputChange =
  (name: string, value: string | number) => (dispatch: Dispatch) => {
    const data = {
      [name]: value,
    };
    dispatch({ type: Types.CITY_TO_CITY_INPUT_CHANGE, payload: data });
  };

export const handleCitytocityStepNext =
  (updatedStep: number) => (dispatch: Dispatch) => {
    dispatch({
      type: Types.CITY_TO_CITY_STEP_INCREMENT_DECREMENT,
      payload: updatedStep,
    });
  };

export const handleSelectedcarData =
  (cardata: selectedCarType) => (dispatch: Dispatch) => {
    dispatch({ type: Types.SELECTED_CAR_DATA, payload: cardata });
  };
