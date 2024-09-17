import {
  combineReducers,
  configureStore,
  // type Reducer,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { RegisterauthRootReducer } from "../../modules/auth/_redux/reducers/_authRootreducer";
import { loginauthRootReducer } from "../../modules/auth/_redux/reducers/_loginauthRootreducer";
import { citytocityRootReducer } from "~@/modules/servicemodule/_redux/reducers/citytocityRootReducer";
import { selectedCarDataRootReducer } from "~@/modules/servicemodule/_redux/reducers/selectedcarrootreducer";
import { authOpenRootReducer } from "../reducers/authopenrootreducer";

// Define the RootState type correctly
export type RootState = ReturnType<typeof rootReducer>;

// Combine all module reducers into a single rootReducer
const rootReducer = combineReducers({
  RegisterauthReducer: combineReducers(RegisterauthRootReducer),
  loginauthReducer: combineReducers(loginauthRootReducer),
  cityTocityServiceReducer: combineReducers(citytocityRootReducer),
  selectedCarDataReducer: combineReducers(selectedCarDataRootReducer),
  isloginauthOpenReducer: combineReducers(authOpenRootReducer),
  // Add more modules as needed
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, UnknownAction>;

export default store;
