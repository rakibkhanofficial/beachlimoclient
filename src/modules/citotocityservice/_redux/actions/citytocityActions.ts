import type { Dispatch } from "@reduxjs/toolkit";
import * as Types from "../types/citytocity";

type selectedCarType = {
  Carname: string;
  image: string;
  Model: string;
  perKiloPrice: number;
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
