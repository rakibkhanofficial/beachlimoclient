import type { Dispatch } from "@reduxjs/toolkit";
import * as Types from "../types/citytocity";

type CarType = {
  car_id: number;
  car_name: string;
  car_slug: string;
  car_image: string;
  car_pricePerHour: string;
  car_pricePerMile: string;
  car_model: string;
  car_year: number;
  car_make: string;
  car_seatingCapacity: number;
  car_hasChildSeat: 0 | 1;
  car_hasWifi: 0 | 1;
  car_luggageCapacity: number;
  car_mileagePerGallon: string;
  car_transmission: string;
  car_fuelType: string;
  car_features: string;
  car_categoryId: number;
  car_subCategoryId: number;
  car_createdAt: string;
  car_updatedAt: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
};

export const handleCitytoCityInputChange =
  (name: string, value: string | number | undefined | null) => (dispatch: Dispatch) => {
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
  (cardata: CarType) => (dispatch: Dispatch) => {
    dispatch({ type: Types.SELECTED_CAR_DATA, payload: cardata });
  };
