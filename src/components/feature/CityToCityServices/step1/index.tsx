import { Button } from "@nextui-org/react";
import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CarSelection = () => {
  const { handleCitytoCityNext } = UseCityToCity();

  return (
    <div>
      <h1>Car Selection</h1>
      <div>Car Data</div>
      <Button color="success" onClick={handleCitytoCityNext}>
        Next
      </Button>
    </div>
  );
};

export default CarSelection;
