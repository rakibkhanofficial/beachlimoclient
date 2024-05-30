import React from "react";
import { Button, Input } from "@nextui-org/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
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
    TotalFarePriceCalculationBymilesandhours,
  } = UseBytheHour();

  return (
    <div className="w-full px-2 text-black dark:text-white ">
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
      <h1 className=" my-3 text-center text-xl font-semibold lg:my-10 ">
        Select Your Pickup and Drop Off Location
      </h1>
      <div className="w-full">
        <div className=" grid w-full items-center gap-4 lg:my-5 lg:grid-cols-2 lg:justify-center lg:px-10 lg:py-5 ">
          <div className="w-full">
            <Googlemap />
          </div>
          <div className=" flex w-full flex-col gap-5 ">
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
            <div className=" rounded-2xl border border-gray-700 bg-gray-200 px-3 py-4 text-black dark:bg-zinc-700 dark:text-white">
              {TotalFarePriceCalculationBymilesandhours !== "NaN"
                ? TotalFarePriceCalculationBymilesandhours
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
            <span>Next</span>
            <span>
              <MdArrowForwardIos />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
