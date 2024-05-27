import LoginauthReducer from "./loginauth-reducer";

export const loginauthRootReducer: Record<string, typeof LoginauthReducer> = {
  loginauth: LoginauthReducer,
} as const;
