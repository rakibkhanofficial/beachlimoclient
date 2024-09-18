import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import {
  handleCitytoCityInputChange,
  handleCitytocityStepNext,
  handleSelectedcarData,
} from "../../_redux/actions/citytocityActions";
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";
import { useState } from "react";
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
  const [isBooking, setIsbooking] = useState(false);

  const SelectedCarData: CarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  console.log("SelectedCarData", SelectedCarData);
  const cityToCityInput = useAppSelector(
    (state) =>
      state.cityTocityServiceReducer?.citytocity?.CitytoCityServiceInput,
  );

  console.log("CityToCityInput", cityToCityInput);

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
    if (
      session?.user?.accessToken !== undefined &&
      session?.user?.accessToken !== null &&
      session?.user?.accessToken !== ""
    ) {
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

  const handleCreateBooking = async () => {
    setIsbooking(true);
    const userId = session?.user?._id;
    const data = {
      userId: userId,
      triptype: triptype,
      airportname: airportname,
      flightno: flightno,
      childseat: SelectedCarData.car_hasChildSeat,
      luggage: SelectedCarData.car_luggageCapacity,
      passenger: SelectedCarData.car_seatingCapacity,
      carModel: SelectedCarData.car_model,
      carName: SelectedCarData.car_name,
      mobilenumber: phone,
      pickuplocationAdress: pickupAddress,
      pickuplocationMapLink: pickupLocation,
      pickupDate: pickupdate,
      pickuptime: pickuptime,
      dropofflocationAdress: dropoffAddress,
      dropofflocationMapLink: dropoffLocation,
      rentalprice: parseInt(FarePriceCalculationBymiles),
      createdDate: new Date(),
      status: "Pending",
      renterName: name,
      renterPhone: phone,
      hour: hour,
      distance: distance,
      paymentstatus: "pending",
      paymentmethod: paymentmethod,
      paymentid: "",
    };
    try {
      const response = await postMethod({
        route: endPoints.Customer.CreateBooking,
        postData: data,
      });
      if (response?.data?.statusCode === 201) {
        setIsbooking(false);
        dispatch(handleCitytocityStepNext(step + 1));
      } else {
        setIsbooking(false);
        toast.error("Please try Again");
      }
    } catch (error) {
      setIsbooking(false);
      console.error(error);
      toast.error("Please try Again");
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
    handleCreateBooking,
    isBooking,
  };
};

export default UseCityToCity;
