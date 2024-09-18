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
    distance: number;
    adress: string;
    adressdescription: string;
    name: string;
    phone: string;
    luggage: string;
    passenger: string;
    triptype: string;
    hour: number;
    paymentmethod: string;
  };
  errors: string;
  step: number;
}

export type selectedCarType = {
  SelectedcarData: {
    car_id: number;
    car_name: string;
    car_slug: string;
    car_image: string;
    car_pricePerHour: string;
    car_pricePerMile: string;
    car_model: string;
    car_year: number;
    car_make: string;
    car_seatingCapacity: number;
    car_hasChildSeat: 0 | 1;
    car_hasWifi: 0 | 1;
    car_luggageCapacity: number;
    car_mileagePerGallon: string;
    car_transmission: string;
    car_fuelType: string;
    car_features: string;
    car_categoryId: number;
    car_subCategoryId: number;
    car_createdAt: string;
    car_updatedAt: string;
    categoryName: string;
    categorySlug: string;
    subcategoryName: string;
  };
};
