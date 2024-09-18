import * as Types from "../types/citytocity";
import type { selectedCarType } from "../interface";
import type { AnyAction } from "@reduxjs/toolkit";

const initialState: selectedCarType = {
  SelectedcarData: {
    car_id: 0,                        // previously "id"
    car_name: "",                     // previously "Carname"
    car_slug: "",                     // Slug field added as per the new type
    car_image: "",                    // previously "image"
    car_pricePerHour: "0.00",         // previously "perhourPrice", but now a string
    car_pricePerMile: "0.00",         // previously "perMilePrice", but now a string
    car_model: "",                    // previously "Model"
    car_year: 0,                      // New field for the car's year
    car_make: "",                     // New field for the car's make
    car_seatingCapacity: 0,           // previously "totalseat", renamed for clarity
    car_hasChildSeat: 0,              // previously "childSeat", now 0 | 1
    car_hasWifi: 0,                   // previously "isWifi", now 0 | 1
    car_luggageCapacity: 0,           // previously "Luggage"
    car_mileagePerGallon: "0.00",     // New field for mileage
    car_transmission: "",             // New field for transmission type
    car_fuelType: "",                 // New field for fuel type
    car_features: "",                 // previously undefined, used for car features
    car_categoryId: 0,                // New field for category ID
    car_subCategoryId: 0,             // New field for sub-category ID
    car_createdAt: "",                // New field for created timestamp
    car_updatedAt: "",                // New field for updated timestamp
    categoryName: "",                 // New field for category name
    categorySlug: "",                 // New field for category slug
    subcategoryName: "",  
  },
};

const SelectedCarDataReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Types.SELECTED_CAR_DATA:
      const SelectedCarData = { ...state.SelectedcarData, ...action.payload };
      return {
        ...state,
        SelectedcarData: SelectedCarData,
      };

    default:
      return state;
  }
};

export default SelectedCarDataReducer;
