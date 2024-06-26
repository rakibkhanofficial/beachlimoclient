import React from "react";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Googlemap from "./googlemap";

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleInputChange,
    FarePriceCalculationBymiles,
  } = UseCityToCity();

  return (
    <div className="w-full text-black dark:text-white px-2 ">
      <button
        title="go back"
        type="button"
        onClick={handleCitytoCityBack}
        className=" flex items-center justify-center gap-2 font-medium text-black hover:text-blue-700 dark:text-white "
      >
        <span>
          <MdArrowBackIos />
        </span>
        <span>Go Back</span>
      </button>
      <h1 className=" my-3 lg:my-10 text-center text-xl font-semibold ">
        Select Your Pickup and Drop Off Location
      </h1>
      <div className="w-full">
        <div className=" w-full lg:my-5 grid lg:grid-cols-2 items-center lg:justify-center gap-4 lg:px-10 lg:py-5 ">
          <div className="w-full">
            <Googlemap />
          </div>
          <div className=" w-full flex flex-col gap-5 ">
            <Input
              onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
              label="Pick Up Location"
              placeholder="Select Pick Up Adress From Map"
              className="text-black dark:text-white"
              value={pickupAddress}
            />
            <Input
              onChange={(e) => handleInputChange("dropoffAddress", e.target.value)}
              label="Drop Off Location"
              placeholder="Select Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={dropoffAddress}
            />
            <Input
              onChange={(e) => handleInputChange("distance", e.target.value)}
              label="Distance"
              placeholder="Select Pick Up Adress and Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={distance}
            />
            <div className=" rounded-2xl text-black dark:text-white border border-gray-700 bg-gray-200 px-3 py-4 dark:bg-zinc-700">
              {FarePriceCalculationBymiles !== "NaN"
                ? FarePriceCalculationBymiles
                : "Fair Price"}{" "}
              $
            </div>

          </div>
        </div>
        <div className=" my-4 flex items-center justify-center ">
          <Button
            className=" w-[80%] lg:w-[40%] "
            color="success"
            isDisabled={distance === ""}
            onClick={handleCitytoCityNext}
          >
            <span className=" text-white text-lg ">Next</span>
            <span className=" text-white text-lg ">
              <MdArrowForwardIos />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
