import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import { handleCitytoCityInputChange } from "../../_redux/actions/citytocityActions";

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

  console.log("distance",distance)

  const handleInputChange = (name: string, value: string) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  return {
    handleInputChange,
    pickupLocation,
    pickupAddress,
    dropoffLocation,
    dropoffAddress,
    adress,
  };
};

export default UseCityToCity;
