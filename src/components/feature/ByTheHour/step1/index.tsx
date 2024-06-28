import { Button } from "@nextui-org/react";
import React from "react";
import { Cardata } from "./data";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import UseBytheHour from "~@/modules/servicemodule/hocs/bythehourservice/usebythehourService";

const CarSelection = () => {
  const { handleCitytoCityNext, handleSelectedcar, SelectedCarData } =
  UseBytheHour();

  return (
    <div className="w-full">
      <Link
        href="/"
        className=" flex items-center justify-start gap-2 font-medium text-black hover:text-blue-700 dark:text-white "
      >
        <span>
          <MdArrowBackIos />
        </span>
        <span>Go Back</span>
      </Link>
      <h1 className=" my-10 text-center text-xl font-semibold ">
        Choose Your Desire Car
      </h1>
      <div className=" grid grid-cols-1 items-center justify-center gap-3 px-2 py-3 lg:my-4 lg:grid-cols-2 lg:gap-10 lg:px-10 ">
        {Cardata?.map((data, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-md ${
              SelectedCarData?.Carname === data.Carname
                ? "bg-gray-300 dark:bg-slate-800"
                : "hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
            onClick={() => handleSelectedcar(data)}
          >
            <div className=" grid w-full grid-cols-12">
              <div className="col-span-5 flex items-center justify-center rounded-l-md border p-3">
                <Image
                  width={200}
                  height={200}
                  alt={data?.Carname}
                  src={data?.image}
                />
              </div>
              <div className="col-span-7 rounded-r-md border p-3">
                <h1 className=" text-medium font-medium lg:text-lg ">
                  {data?.Carname}
                </h1>
                <p>Per Hour Price: {data?.perhourPrice} $</p>
                <p>Passenger Quantity: {data?.passenger}</p>
                <p>Luggage Quantity: {data?.Luggage}</p>
                {data?.isWifi === true ? (
                  <p className=" text-green-600 ">Wifi Avaiable</p>
                ) : (
                  <p className=" text-red-600 ">Wifi Not Available</p>
                )}
                {data?.childSeat === true ? (
                  <p className=" text-green-600 ">Child Seat Available</p>
                ) : (
                  <p className=" text-red-600 ">Child Seat Not Available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-4 flex items-center justify-center ">
        <Button
          className={`w-[80%] lg:w-[40%] ${SelectedCarData.Carname === "" ? "cursor-not-allowed bg-gray-300 text-black" : " bg-blue-800 text-white "}`}
          onClick={handleCitytoCityNext}
          isDisabled={SelectedCarData.Carname === ""}
        >
          <span className=" text-white text-lg ">Next</span>
          <span className=" text-white text-lg ">
            <MdArrowForwardIos />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CarSelection;
