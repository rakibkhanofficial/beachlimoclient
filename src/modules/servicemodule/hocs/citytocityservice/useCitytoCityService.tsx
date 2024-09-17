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

type selectedCarType = {
  id: number
  Carname: string;
  image: string;
  Model: string;
  perMilePrice: number;
  childSeat: boolean;
  perhourPrice : number
  passenger: number;
  Luggage: number;
  totalseat: number;
  isWifi: boolean
};

const UseCityToCity = () => {
  const dispatch = useAppDispatch();
  const { session } = useCustomSession();
  const [isBooking, setIsbooking] = useState(false)
  console.log("session", session)
  const SelectedCarData: selectedCarType  = useAppSelector(
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
    paymentmethod = ""
  } = cityToCityInput || {};

  const handleInputChange = (name: string, value: string | number | undefined) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  const handleSelectedcar = (value: selectedCarType) => {
    dispatch(handleSelectedcarData(value));
  };

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    if(session?.user?.accessToken !== undefined && session?.user?.accessToken !== null && session?.user?.accessToken !== "") { 
      dispatch(handleCitytocityStepNext(step + 1));
      dispatch(handleCitytoCityInputChange("triptype", "CityToCity"));
    }
    else{
      dispatch(handleAuthSubmitting(true));
    }
  };

  const handleCitytoCityBack = () => {
    dispatch(handleCitytocityStepNext(step - 1));
  };

  const FarePriceCalculationBymiles = (
    distance * SelectedCarData.perMilePrice
  ).toFixed(2);

  const handleCreateBooking = async () => {
    setIsbooking(true)
    const userId = session?.user?._id;
    const data = {
      userId: userId,
      triptype: triptype,
      airportname: airportname,
      flightno: flightno,
      childseat: SelectedCarData.childSeat,
      luggage: SelectedCarData.Luggage,
      passenger: SelectedCarData.passenger,
      carModel: SelectedCarData.Model,
      carName: SelectedCarData.Carname,
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
        setIsbooking(false)
        dispatch(handleCitytocityStepNext(step + 1));
      } else {
        setIsbooking(false)
        toast.error("Please try Again");
      }
    } catch (error) {
      setIsbooking(false)
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
    isBooking
  };
};

export default UseCityToCity;
