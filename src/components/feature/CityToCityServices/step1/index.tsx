import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Cardata } from "./data";
import Image from "next/image";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";

type selectedCarType = {
  Carname: string;
  image: string;
};

const CarSelection = () => {
  const { handleCitytoCityNext } = UseCityToCity();
  const [selectedCar, setSelectedCar] = useState<selectedCarType | null>(null);

  const handleCarSelection = (car: selectedCarType) => {
    setSelectedCar(car);
  };

  console.log(selectedCar);

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
      <div className=" my-4 grid grid-cols-4 items-center justify-center gap-10 px-10 py-3 ">
        {Cardata?.map((data, index) => (
          <div
            key={index}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-400 py-3 ${
              selectedCar?.Carname === data.Carname
                ? "bg-gray-200 dark:bg-slate-800"
                : "hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
            onClick={() => handleCarSelection(data)}
          >
            <Image
              width={200}
              height={200}
              alt={data?.Carname}
              src={data?.image}
            />
            <h1 className=" text-center text-lg font-medium ">
              {data?.Carname} {data?.Model}
            </h1>
            <p>Per KM Price: {data?.perKiloPrice} $</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          className={`w-[40%] ${!selectedCar ? "cursor-not-allowed bg-gray-100 text-black" : " bg-blue-800 text-white "}`}
          onClick={handleCitytoCityNext}
          isDisabled={!selectedCar}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarSelection;
