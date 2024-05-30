import { useAppDispatch, useAppSelector } from "../../../../_redux/hooks/hooks";
import {
  handleCitytoCityInputChange,
  handleCitytocityStepNext,
  handleSelectedcarData,
} from "../../_redux/actions/citytocityActions";
import { useSession } from "next-auth/react";
import { postMethod } from "../../../../utils/api/postMethod";
import toast from "react-hot-toast";
import { useState } from "react";
import { endPoints } from '../../../../utils/api/route';

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

const UseBytheHour = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [isBooking, setIsbooking] = useState(false)

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
    distance = "",
    adress = "",
    name = "",
    phone = "",
    luggage = "",
    passenger = "",
  } = cityToCityInput || {};

  const handleInputChange = (name: string, value: string) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  const handleSelectedcar = (value: selectedCarType) => {
    dispatch(handleSelectedcarData(value));
  };

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    dispatch(handleCitytocityStepNext(step + 1));
    dispatch(handleCitytoCityInputChange("triptype", "ByTheHour"));
  };

  const handleCitytoCityBack = () => {
    dispatch(handleCitytocityStepNext(step - 1));
  };

  // console.log("pickupdate", pickupdate);
  // console.log("pickuptime", pickuptime);

  // Remove 'km' and convert the distance to a number
  const numericDistance = parseFloat(distance.replace(" mi", ""));

  const FarePriceCalculationBymiles = (
    numericDistance * SelectedCarData.perhourPrice
  ).toFixed(2);

  const handleCreateBooking = async () => {
    setIsbooking(true)
    // @ts-expect-error type error is not solved
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
    handleCreateBooking,
    isBooking
  };
};

export default UseBytheHour;
