import React from "react";
import { Servicedata } from "./data";
import Link from "next/link";
import Image from "next/image";

const OurService = () => {
  return (
    <div>
      <h1 className=" my-4 text-center font-semibold text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl ">
        Our Service
      </h1>
      <div className=" grid grid-cols-2 mx-5 lg:mx-2 lg:grid-cols-4 justify-center items-center my-2 gap-3 py-2 lg:my-4 lg:px-10 lg:py-3 lg:gap-10 ">
        {Servicedata?.map((data, index) => (
          <div className="border hover:bg-gray-200 border-gray-400 cursor-pointer rounded-xl" key={index}>
            <Link
              className=" my-2 flex flex-col items-center justify-center p-2 "
              href={data?.url}
            >
              <Image
                src={data?.image}
                alt={data?.name}
                width={150}
                height={150}
              />
              <h1 className="text-center text-lg font-medium">{data?.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
