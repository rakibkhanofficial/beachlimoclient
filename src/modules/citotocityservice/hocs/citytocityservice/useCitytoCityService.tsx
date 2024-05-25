import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import { handleCitytoCityInputChange, handleCitytocityStepNext } from "../../_redux/actions/citytocityActions";

const UseCityToCity = () => {
  const dispatch = useAppDispatch();
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

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    dispatch(handleCitytocityStepNext(step + 1));
  }

  return {
    handleInputChange,
    pickupLocation,
    pickupAddress,
    dropoffLocation,
    dropoffAddress,
    distance,
    adress,
    handleCitytoCityNext
  };
};

export default UseCityToCity;
