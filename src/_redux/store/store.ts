import {
  combineReducers,
  configureStore,
  // type Reducer,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { themeRootReducer } from "../reducers/counters/themeReducer/_themeRootReducer";
import { authRootReducer } from "../../modules/auth/_redux/reducers/_authRootreducer";
import { loginauthRootReducer } from "../../modules/auth/_redux/reducers/_loginauthRootreducer";
import { citytocityRootReducer } from "~@/modules/citotocityservice/_redux/reducers/citytocityRootReducer";
import { selectedCarDataRootReducer } from "~@/modules/citotocityservice/_redux/reducers/selectedcarrootreducer";

// Define the RootState type correctly
export type RootState = ReturnType<typeof rootReducer>;

// Combine all module reducers into a single rootReducer
const rootReducer = combineReducers({
  authReducer: combineReducers(authRootReducer),
  loginauthReducer: combineReducers(loginauthRootReducer),
  theme: combineReducers(themeRootReducer),
  cityTocityServiceReducer: combineReducers(citytocityRootReducer),
  selectedCarDataReducer: combineReducers(selectedCarDataRootReducer)
  // Add more modules as needed
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, UnknownAction>;

export default store;
