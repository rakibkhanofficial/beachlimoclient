import React from "react";
import { useAppSelector } from "~@/_redux/hooks/hooks";
import CarSelection from "./step1";
import LocationSelection from "./step2";
import OtherInformation from "./step3";
import CarBookingSucessFull from "./step4";

const AirportTranserServiceComponenet = () => {
  
  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const stepper = () => {
    switch (step) {
      case 1:
        return <LocationSelection />;
      case 2:
        return <OtherInformation />;
      case 3:
        return <CarBookingSucessFull />;
      default:
        return <CarSelection />;
    }
  };
  return <>{stepper()}</>;
};

export default AirportTranserServiceComponenet;
