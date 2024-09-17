import authOpenReducer from './authopenReducer'

export const authOpenRootReducer: Record<string, typeof authOpenReducer> = {
  authopen: authOpenReducer,
} as const