import { IAuthOpenReducer } from "../interfaces";
import * as Types from "../types/authopentype";
import type { AnyAction } from "@reduxjs/toolkit";

const initialState: IAuthOpenReducer = {
  isSubmitting: false,
};

const authOpenReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_AUTH_SUBMIT_STATUS:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default authOpenReducer;
