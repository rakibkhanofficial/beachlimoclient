export interface ICitytoCityCreateReducer {
    isSubmitting: boolean;
    CitytoCityServiceInput: {
      branchname: string,
      city: string,
      area: string,
      pickupLocation: string,
      pickupAddress: string,
      dropoffLocation: string,
      dropoffAddress: string,
      distance: string
      adress: string,
      adressdescription: string,
    };
    errors: string;
    step: number
  }