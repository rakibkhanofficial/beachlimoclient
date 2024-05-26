import * as Types from "../types/citytocity";
import type { selectedCarType } from "../interface";
import type { AnyAction } from "@reduxjs/toolkit";

const initialState: selectedCarType = {
  SelectedcarData: {
    Carname: "",
    image: "",
    Model: "",
    perKiloPrice: 0,
    perhourPrice: 0,
    totalseat: 0,
    isWifi: false
  },
};

const SelectedCarDataReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.SELECTED_CAR_DATA:
      const SelectedCarData = { ...state.SelectedcarData, ...action.payload };
      return {
        ...state,
        SelectedcarData: SelectedCarData,
      };

    default:
      return state;
  }
};

export default SelectedCarDataReducer;
