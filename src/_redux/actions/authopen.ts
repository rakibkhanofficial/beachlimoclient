import type { Dispatch } from "@reduxjs/toolkit";
import * as Types from "../types/authopentype";

export const handleAuthSubmitting =
  (isSubmitting: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: Types.CHANGE_AUTH_SUBMIT_STATUS, payload: isSubmitting });
  };
