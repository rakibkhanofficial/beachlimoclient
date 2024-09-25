import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import {
  handleCitytoCityInputChange,
  handleCitytocityStepNext,
  handleSelectedcarData,
} from "../../_redux/actions/citytocityActions";
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { handleAuthSubmitting } from "~@/_redux/actions/authopen";

type CarType = {
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

const UseCityToCity = () => {
  const dispatch = useAppDispatch();
  const { session } = useCustomSession();
  const [isBooking, setIsBooking] = useState(false);

  const SelectedCarData: CarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );

  const cityToCityInput = useAppSelector(
    (state) =>
      state.cityTocityServiceReducer?.citytocity?.CitytoCityServiceInput,
  );

  const {
    airportname = "",
    flightno = "",
    area = "",
    adressdescription = "",
    triptype = "",
    pickupLocation = "",
    pickupAddress = "",
    pickupdate = "",
    pickuptime = "",
    dropoffLocation = "",
    dropoffAddress = "",
    distance = 0,
    adress = "",
    name = "",
    phone = "",
    luggage = "",
    passenger = "",
    hour = 0,
    paymentmethod = "",
  } = cityToCityInput || {};

  const handleInputChange = (
    name: string,
    value: string | number | undefined,
  ) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  const handleSelectedcar = (value: CarType) => {
    dispatch(handleSelectedcarData(value));
  };

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    if (session?.user?.accessToken) {
      dispatch(handleCitytocityStepNext(step + 1));
      dispatch(handleCitytoCityInputChange("triptype", "CityToCity"));
    } else {
      dispatch(handleAuthSubmitting(true));
    }
  };

  const handleCitytoCityBack = () => {
    dispatch(handleCitytocityStepNext(step - 1));
  };

  const FarePriceCalculationBymiles = (
    distance * Number(SelectedCarData.car_pricePerMile)
  ).toFixed(2);

  const onlinebookingData = {
    carId: SelectedCarData?.car_id,
    tripType: triptype,
    airportName: airportname,
    flightNo: flightno,
    childSeat: SelectedCarData.car_hasChildSeat,
    luggage: SelectedCarData.car_luggageCapacity,
    passenger: SelectedCarData.car_seatingCapacity,
    mobileNumber: phone,
    pickupLocationAddress: pickupAddress,
    totalBookingPrice: parseInt(FarePriceCalculationBymiles),
    pickupLocationMapLink: pickupLocation,
    pickupDate: pickupdate,
    pickupTime: pickuptime,
    dropoffLocationAddress: dropoffAddress,
    dropoffLocationMapLink: dropoffLocation,
    hour: hour,
    distance: distance,
    paymentMethod: "online",
    rideStatus: "Pending",
  };

  const handleCreateBooking = async () => {
    setIsBooking(true);
    const CashbookingData = {
      carId: SelectedCarData?.car_id,
      tripType: triptype,
      airportName: airportname,
      flightNo: flightno,
      childSeat: SelectedCarData.car_hasChildSeat,
      luggage: SelectedCarData.car_luggageCapacity,
      passenger: SelectedCarData.car_seatingCapacity,
      mobileNumber: phone,
      pickupLocationAddress: pickupAddress,
      totalBookingPrice: parseInt(FarePriceCalculationBymiles),
      pickupLocationMapLink: pickupLocation,
      pickupDate: pickupdate,
      pickupTime: pickuptime,
      dropoffLocationAddress: dropoffAddress,
      dropoffLocationMapLink: dropoffLocation,
      hour: hour,
      distance: distance,
      paymentMethod: "cash",
      name: name,
      paymentStatus: "Unpaid",
      rideStatus: "Pending",
    };

    try {
      const response = await postMethod({
        route: endPoints.Customer.createBookingByCash,
        postData: CashbookingData,
      });
      if (response?.data?.statusCode === 201) {
        setIsBooking(false);
        dispatch(handleCitytocityStepNext(step + 1));
        toast.success("Booking created successfully");
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      setIsBooking(false);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return {
    handleInputChange,
    pickupLocation,
    pickupAddress,
    pickupdate,
    pickuptime,
    dropoffLocation,
    dropoffAddress,
    distance,
    adress,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleSelectedcar,
    SelectedCarData,
    FarePriceCalculationBymiles,
    name,
    phone,
    luggage,
    passenger,
    paymentmethod,
    onlinebookingData,
    handleCreateBooking,
    isBooking,
    step,
  };
};

export default UseCityToCity;
