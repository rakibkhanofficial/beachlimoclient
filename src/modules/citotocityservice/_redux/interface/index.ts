export interface ICitytoCityCreateReducer {
  isSubmitting: boolean;
  CitytoCityServiceInput: {
    airportname: string;
    flightno: string;
    area: string;
    pickupLocation: string;
    pickupAddress: string;
    pickupdate: string;
    pickuptime: string;
    dropoffLocation: string;
    dropoffAddress: string;
    distance: string;
    adress: string;
    adressdescription: string;
    name: string;
    phone: string;
    luggage: string;
    passenger: string;
    triptype: string
  };
  errors: string;
  step: number;
}

export type selectedCarType = {
  SelectedcarData: {
    Carname: string;
    image: string;
    Model: string;
    perKiloPrice: number;
    perhourPrice: number;
    totalseat: number;
    isWifi: boolean;
    childSeat: boolean
  };
};
