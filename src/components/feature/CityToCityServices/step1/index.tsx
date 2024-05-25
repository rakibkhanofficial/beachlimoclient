import { Button } from "@nextui-org/react";
import React from "react";
import UseCityToCity from "~@/modules/citotocityservice/hocs/citytocityservice/useCitytoCityService";
import { Cardata } from "./data";
import Image from "next/image";

const CarSelection = () => {
  const { handleCitytoCityNext } = UseCityToCity();

  return (
    <div>
      <h1 className=" my-10 text-center text-xl font-semibold ">
        Choose Your Desire Car
      </h1>
      <div className=" my-4 grid grid-cols-4 items-center justify-center gap-10 px-10 py-3 ">
        {Cardata?.map((data, index) => (
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-400 py-3 hover:bg-gray-200 dark:hover:bg-zinc-800"
            key={index}
          >
            <Image
              width={150}
              height={150}
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
      <div className=" flex items-center justify-center ">
        <Button
          className=" w-[40%] "
          color="success"
          onClick={handleCitytoCityNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarSelection;
