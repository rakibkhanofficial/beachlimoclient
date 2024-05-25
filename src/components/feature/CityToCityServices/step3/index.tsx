import { Button } from "@nextui-org/react";
import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CitytocityOtherInformation = () => {
  const { handleCitytoCityNext } = UseCityToCity();

  return (
    <div>
      <h1> Other Information</h1>
      <div>Other Data</div>
      <Button color="success" onClick={handleCitytoCityNext}>
        Next
      </Button>
    </div>
  );
};

export default CitytocityOtherInformation;
