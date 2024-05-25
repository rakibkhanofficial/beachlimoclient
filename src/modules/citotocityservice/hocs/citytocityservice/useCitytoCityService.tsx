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
    maplink = "",
    adress = "",
    adressdescription = "",
  } = cityToCityInput || {};

  const handleInputChange = (name: string, value: string) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  return {
    handleInputChange,
    maplink,
    adress,
  };
};

export default UseCityToCity;
