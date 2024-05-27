import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import GoogleMap from "./map";
import { Button, Input, TimeInput, DatePicker } from "@nextui-org/react";
import { MdArrowBackIos } from "react-icons/md";

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    handleCitytoCityNext,
    handleCitytoCityBack,
    FarePriceCalculationBykilometer,
  } = UseCityToCity();

  return (
    <div className="w-full text-black dark:text-white ">
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
      <h1 className=" my-10 text-center text-xl font-semibold ">
        {" "}
        Select Your Pickup and Drop Off Location
      </h1>
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
              value={distance.replace(" km", "")}
            />
            <Input
              label="Fare Price"
              placeholder="Select Pick Up Adress and Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={
                FarePriceCalculationBykilometer !== "NaN"
                  ? FarePriceCalculationBykilometer
                  : "Select Location"
              }
            />
            <TimeInput label="Pick Up Time" />
            <DatePicker label="Birth date" className="w-full" />
          </div>
        </div>
        <div className=" flex items-center justify-center ">
          <Button
            className=" w-[40%] "
            color="success"
            isDisabled={distance === ""}
            onClick={handleCitytoCityNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
