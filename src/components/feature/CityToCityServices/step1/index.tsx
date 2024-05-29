import { Button } from "@nextui-org/react";
import React from "react";
import { Cardata } from "./data";
import Image from "next/image";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";

const CarSelection = () => {
  const { handleCitytoCityNext, handleSelectedcar, SelectedCarData } =
    UseCityToCity();

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
      <div className=" lg:my-4 grid grid-cols-2 lg:grid-cols-2 items-center justify-center gap-3 lg:gap-10 px-2 lg:px-10 py-3 ">
        {Cardata?.map((data, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-400 py-3 ${
              SelectedCarData?.Carname === data.Carname
                ? "bg-gray-300 dark:bg-slate-800"
                : "hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
            onClick={() => handleSelectedcar(data)}
          >
            <Image
              width={200}
              height={200}
              alt={data?.Carname}
              src={data?.image}
            />
            <h1 className=" text-center text-medium lg:text-lg font-medium ">
              {data?.Carname} {data?.Model}
            </h1>
            <p>Per KM Price: {data?.perKiloPrice} $</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-4 ">
        <Button
          className={`lg:w-[40%] w-[80%] ${SelectedCarData.Carname === "" ? "cursor-not-allowed bg-gray-300 text-black" : " bg-blue-800 text-white "}`}
          onClick={handleCitytoCityNext}
          isDisabled={SelectedCarData.Carname === ""}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarSelection;
