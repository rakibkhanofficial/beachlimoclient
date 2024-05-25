import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import GoogleMap from "./map";
import { Button, Input } from "@nextui-org/react";

const LocationSelection = () => {
  const { pickupAddress, dropoffAddress, distance, handleCitytoCityNext } =
    UseCityToCity();

  return (
    <div className=" text-black dark:text-white ">
      <div>
        <div className=" my-5 grid grid-cols-2 items-center justify-center gap-4 px-10 py-5 ">
          <div>
            <GoogleMap />
          </div>
          <div className=" flex flex-col gap-5 ">
            <Input
              label="Pick Up Location"
              placeholder="Select Pick Up Adress From Map"
              className="text-black dark:text-white"
              value={pickupAddress}
            />
            <Input
              label="Drop Off Location"
              placeholder="Select Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={dropoffAddress}
            />
            <Input
              label="Distance"
              placeholder="Select Pick Up Adress and Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={distance}
            />
          </div>
        </div>
        <Button color="success" onClick={handleCitytoCityNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default LocationSelection;
