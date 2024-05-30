import SelectedCarDataReducer from "./selectedCarReducer";

export const selectedCarDataRootReducer: Record<string, typeof SelectedCarDataReducer> = {
  selectedCaradata: SelectedCarDataReducer,
} as const;
