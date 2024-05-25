import React from "react";
import { useAppSelector } from "~@/_redux/hooks/hooks";
import CarSelection from "./step1";
import LocationSelection from "./step2";
import CitytocityOtherInformation from "./step3";
import CarBookingBycitytovitySucessFull from "./step4";

const CityToCity = () => {
  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const stepper = () => {
    switch (step) {
      case 1:
        return <LocationSelection />;
      case 2:
        return <CitytocityOtherInformation />;
      case 3:
        return <CarBookingBycitytovitySucessFull />;
      default:
        return <CarSelection />;
    }
  };
  return <>{stepper()}</>;
};

export default CityToCity;
