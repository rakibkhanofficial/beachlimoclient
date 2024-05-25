import React from "react";
import GoogleMap from "./map";
import { Input } from "@nextui-org/react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CityToCity = () => {
  const { maplink, adress } = UseCityToCity();

  //   console.log(cityToCityInput)
  return (
    <div className=" text-black dark:text-white ">
        <div>
        <h1 className=" text-center text-xl font-semibold my-5 ">
        City To City Service
      </h1>
      <div className=" grid grid-cols-2 gap-4 my-5 px-10 py-5 justify-center items-center ">
        <div>
          <GoogleMap />
        </div>
        <div className=" flex flex-col gap-5 ">
          <Input
            placeholder="Select Location"
            className="text-black dark:text-white"
            value={maplink}
          />
          <Input
            placeholder="Select Location"
            className="text-black dark:text-white"
            value={adress}
          />
        </div>
      </div>
        </div>
    </div>
  );
};

export default CityToCity;
