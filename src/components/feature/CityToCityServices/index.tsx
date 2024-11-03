import React from "react";
import { useAppSelector } from "~@/_redux/hooks/hooks";
import CarSelection from "./step1";
import CitytocityOtherInformation from "./step3";
import CarBookingBycitytovitySucessFull from "./step4";
import MapSelectLayout from "./step2/Layout";

const CityToCity = () => {
  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const stepper = () => {
    switch (step) {
      case 1:
        return <MapSelectLayout />;
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
