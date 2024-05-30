import { Button, Input, TimeInput, DatePicker } from "@nextui-org/react";
import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CitytocityOtherInformation = () => {
  const {
    handleCreateBooking,
    handleInputChange,
    name,
    phone,
    pickupdate,
    pickuptime,
    isBooking,
  } = UseCityToCity();

  return (
    <div className=" my-5 w-full p-2 lg:p-5  ">
      <div className=" flex flex-col items-center justify-center">
        <h1 className=" my-5 text-center text-xl font-semibold  ">
          Type This Iformation For booking
        </h1>
        <div className=" flex w-full flex-col gap-3 rounded-xl border border-slate-700 px-4 py-6 lg:w-[60%] ">
          <Input
            placeholder="Enter Name"
            label="name"
            className=" rounded-xl "
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Enter Phone"
            label="phone"
            className=" rounded-xl "
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
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
        <div className="flex w-full items-center justify-center ">
          <Button
            className=" mt-5 w-[80%] lg:w-[50%] "
            color="success"
            onClick={handleCreateBooking}
            isDisabled={
              name === "" || phone === "" || pickupdate === "" || pickuptime === ""
            }
          >
            {isBooking ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CitytocityOtherInformation;
