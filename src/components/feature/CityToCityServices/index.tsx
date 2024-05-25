import React from "react";
import GoogleMap from "./map";
import { Input } from "@nextui-org/react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CityToCity = () => {
  const {
    pickupLocation,
    pickupAddress,
    dropoffLocation,
    dropoffAddress,
  } = UseCityToCity();

  //   console.log(cityToCityInput)
  return (
    <div className=" text-black dark:text-white ">
      <div>
        <h1 className=" my-5 text-center text-xl font-semibold ">
          City To City Service
        </h1>
        <div className=" my-5 grid grid-cols-2 items-center justify-center gap-4 px-10 py-5 ">
          <div>
            <GoogleMap />
          </div>
          <div className=" flex flex-col gap-5 ">
            <Input
              placeholder="Select Pick UP Location"
              className="text-black dark:text-white"
              value={pickupLocation}
            />
            <Input
              placeholder="Select Pick Adress"
              className="text-black dark:text-white"
              value={pickupAddress}
            />
            <Input
              placeholder="Select Drop Off Location"
              className="text-black dark:text-white"
              value={dropoffLocation}
            />
            <Input
              placeholder="Select Drop Off Adress"
              className="text-black dark:text-white"
              value={dropoffAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityToCity;
