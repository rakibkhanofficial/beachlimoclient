import RegisterauthReducer from "./auth-reducer";

export const RegisterauthRootReducer: Record<string, typeof RegisterauthReducer> = {
  registerauth: RegisterauthReducer,
} as const;
