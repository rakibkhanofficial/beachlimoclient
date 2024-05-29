import { Button, Input } from "@nextui-org/react";
import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";

const CitytocityOtherInformation = () => {
  const {
    handleCreateBooking,
    handleInputChange,
    name,
    phone,
    luggage,
    passenger,
    isBooking
  } = UseCityToCity();

  return (
    <div className=" my-5 w-full p-2 lg:p-5  ">
      <h1 className=" my-5 text-center text-xl font-semibold  ">
        Type This Iformation For booking
      </h1>
      <div className=" flex w-full flex-col gap-3 rounded-xl border border-slate-700 px-4 py-6 ">
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
        <Input
          placeholder="Enter Luggage Number"
          label="Luggage"
          value={luggage}
          className=" rounded-xl "
          onChange={(e) => handleInputChange("luggage", e.target.value)}
        />
        <Input
          placeholder="Enter Number of Passenger "
          label="passenger"
          value={passenger}
          className=" rounded-xl "
          onChange={(e) => handleInputChange("passenger", e.target.value)}
        />
      </div>
      <div className=" flex items-center justify-center ">
        <Button
          className=" mt-5 w-[80%] lg:w-[60%] "
          color="success"
          onClick={handleCreateBooking}
          isDisabled={
            name === "" &&
            phone === "" && 
            luggage === "" &&
            passenger === "" 
          }
        >
         {isBooking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default CitytocityOtherInformation;
