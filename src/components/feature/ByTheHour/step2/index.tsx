import React from "react";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBackIos } from "react-icons/md";
import Googlemap from "./googlemap";
import UseBytheHour from "~@/modules/servicemodule/hocs/bythehourservice/usebythehourService";
// import { CalendarDate, Time } from "@internationalized/date";

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    distance,
    handleCitytoCityNext,
    handleCitytoCityBack,
    FarePriceCalculationBymiles,
  } = UseBytheHour();

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
              readOnly
              label="Pick Up Location"
              placeholder="Select Pick Up Adress From Map"
              className="text-black dark:text-white"
              value={pickupAddress}
            />
            <Input
              readOnly
              label="Drop Off Location"
              placeholder="Select Drop Off Adress From Map"
              className="text-black dark:text-white"
              value={dropoffAddress}
            />
            <Input
              readOnly
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
        <div className=" flex items-center justify-center my-4 ">
          <Button
            className=" lg:w-[40%] w-[80%] "
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
