import CitytoCityReducer from "./citytocityReducer";

export const citytocityRootReducer: Record<string, typeof CitytoCityReducer> = {
  citytocity: CitytoCityReducer,
} as const;
