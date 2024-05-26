import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import { handleCitytoCityInputChange, handleCitytocityStepNext, handleSelectedcarData } from "../../_redux/actions/citytocityActions";
import { useState } from "react";

type selectedCarType = {
  Carname: string;
  image: string;
  Model: string
  perKiloPrice: number
};

const UseCityToCity = () => {
  const dispatch = useAppDispatch();

  const SelectedCarData = useAppSelector(
    (state) =>
      state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  console.log("selected car",SelectedCarData)

  const cityToCityInput = useAppSelector(
    (state) =>
      state.cityTocityServiceReducer?.citytocity?.CitytoCityServiceInput,
  );

  const {
    branchname = "",
    city = "",
    area = "",
    pickupLocation = "",
    pickupAddress = "",
    dropoffLocation = "",
    dropoffAddress = "",
    distance = "",
    adress = "",
    adressdescription = "",
  } = cityToCityInput || {};

  const handleInputChange = (name: string, value: string) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  const handleSelectedcar = (value:selectedCarType) => {
    dispatch(handleSelectedcarData(value))
  }

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    dispatch(handleCitytocityStepNext(step + 1));
  }

  const handleCitytoCityBack = () => {
    dispatch(handleCitytocityStepNext(step - 1));
  }

  return {
    handleInputChange,
    pickupLocation,
    pickupAddress,
    dropoffLocation,
    dropoffAddress,
    distance,
    adress,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleSelectedcar,
    SelectedCarData
  };
};

export default UseCityToCity;
