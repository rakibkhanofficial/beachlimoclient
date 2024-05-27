import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import { Button, Input, TimeInput, DatePicker } from "@nextui-org/react";
import { MdArrowBackIos } from "react-icons/md";
import Googlemap from "./googlemap";
// import { CalendarDate, Time } from "@internationalized/date";

const LocationSelection = () => {
  const {
    pickupAddress,
    dropoffAddress,
    pickupdate,
    pickuptime,
    distance,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleInputChange,
    FarePriceCalculationBykilometer,
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
            <div className=" rounded-2xl text-gray-700 border bg-gray-200 px-3 py-4 dark:bg-slate-800 ">
              {FarePriceCalculationBykilometer !== "NaN"
                ? FarePriceCalculationBykilometer
                : "Fair Price"}{" "}
              $
            </div>
            <DatePicker
              // value={new CalendarDate(pickupdate, pickupdate, pickupdate)}
              onChange={(date) =>
                handleInputChange("pickupdate", date?.toString())
              }
              label="Pick Up Date"
              className="w-full"
            />
            <TimeInput
              // value={new Time(pickuptime, pickuptime)}
              onChange={(time) =>
                handleInputChange("pickuptime", time?.toString())
              }
              label="Pick Up Time"
            />
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
