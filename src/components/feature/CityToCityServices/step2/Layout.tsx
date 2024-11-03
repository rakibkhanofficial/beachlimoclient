"use client";
import React, { useState } from "react";
import LocationSelection from ".";
import Googlemap from "./googlemap";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { Button } from "@nextui-org/react";

const MapSelectLayout = () => {
  const { distance, handleCitytoCityNext, handleCitytoCityBack } =
    UseCityToCity();
    const [pickuplatlng, setPickuplatlng] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)
    const [dropOfflatlng, setDropofflatlng] = useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)

  return (
    <>
      <div className="relative w-full px-2 text-black dark:text-white">
        <div className=" w-full">
          <button
            title="go back"
            type="button"
            onClick={handleCitytoCityBack}
            className="flex items-center justify-center gap-2 font-medium text-black hover:text-blue-700 dark:text-white"
          >
            <span>
              <MdArrowBackIos />
            </span>
            <span>Go Back</span>
          </button>
          <h1 className="my-3 text-center text-xl font-semibold lg:my-10">
            Select Your Pickup and Drop Off Location
          </h1>
          <div className="w-full">
            <div className="grid w-full items-center gap-4 lg:my-5 lg:grid-cols-2 lg:justify-center lg:px-10 lg:py-5">
              <div className="w-full">
                <Googlemap pickuplatlng={pickuplatlng} dropOfflatlng={dropOfflatlng} />
              </div>
              <LocationSelection setPickuplatlng={setPickuplatlng} setDropofflatlng={setDropofflatlng} />
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-0 left-0 z-50 flex w-full items-center justify-center bg-white px-2 py-2 transition-transform duration-300 dark:bg-gray-800`}
        >
          <Button
            className={`w-[80%] lg:w-[40%] ${
              distance === 0
                ? "cursor-not-allowed bg-gray-300 text-black"
                : "bg-blue-800 text-white"
            }`}
            onClick={handleCitytoCityNext}
            isDisabled={distance === 0}
          >
            <span className="text-lg text-white">Next</span>
            <span className="text-lg text-white">
              <MdArrowForwardIos />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MapSelectLayout;
