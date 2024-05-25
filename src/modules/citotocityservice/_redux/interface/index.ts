export interface ICitytoCityCreateReducer {
    isSubmitting: boolean;
    CitytoCityServiceInput: {
      branchname: string,
      city: string,
      area: string,
      maplink: string,
      adress: string,
      adressdescription: string,
    };
    errors: string;
    step: number
  }