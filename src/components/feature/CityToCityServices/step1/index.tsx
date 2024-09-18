import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";

type CarType = {
  car_id: number;
  car_name: string;
  car_slug: string;
  car_image: string;
  car_pricePerHour: string;
  car_pricePerMile: string;
  car_model: string;
  car_year: number;
  car_make: string;
  car_seatingCapacity: number;
  car_hasChildSeat: 0 | 1;
  car_hasWifi: 0 | 1;
  car_luggageCapacity: number;
  car_mileagePerGallon: string;
  car_transmission: string;
  car_fuelType: string;
  car_features: string;
  car_categoryId: number;
  car_subCategoryId: number;
  car_createdAt: string;
  car_updatedAt: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
};

const CarSelection: React.FC = () => {
  const [carList, setCarList] = useState<CarType[]>([]);
  const { handleCitytoCityNext, handleSelectedcar, SelectedCarData } =
    UseCityToCity();

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const response = await getMethod(endPoints?.cars?.getAllPublicCarList);
        if (response?.data?.statusCode === 200) {
          setCarList(response?.data?.data as CarType[]);
        } else {
          console.error("Error fetching car list:", response?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching car list:", error);
      }
    };
    fetchCarList();
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div className="pb-16">
        {" "}
        {/* Padding bottom to avoid content hiding behind the button */}
        <Link
          href="/"
          className=" flex items-center justify-start gap-2 font-medium text-black hover:text-blue-700 dark:text-white "
        >
          <span>
            <MdArrowBackIos />
          </span>
          <span>Go Back</span>
        </Link>
        <h1 className="my-10 text-center text-xl font-semibold">
          Choose Your Desire Car
        </h1>
        <div className="grid grid-cols-1 items-center justify-center gap-3 px-2 py-3 lg:my-4 lg:grid-cols-2 lg:gap-10 lg:px-10">
          {carList?.map((data, index) => (
            <div
              key={index}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md ${
                SelectedCarData?.car_name === data.car_name
                  ? "bg-gray-300 dark:bg-slate-800"
                  : "hover:bg-gray-200 dark:hover:bg-zinc-800"
              }`}
              onClick={() => handleSelectedcar(data)}
            >
              <div className="grid w-full grid-cols-12">
                <div className="col-span-5 flex items-center justify-center rounded-l-md border p-3 dark:border-slate-800">
                  <Image
                    width={200}
                    height={200}
                    alt={data?.car_name}
                    src={data?.car_image}
                  />
                </div>
                <div className="col-span-7 rounded-r-md border p-3 dark:border-slate-800">
                  <h1 className="text-medium font-medium lg:text-lg">
                    {data?.car_name}
                  </h1>
                  <p>Per Miles Price: {data?.car_pricePerMile} $</p>
                  <p>Passenger Quantity: {data?.car_seatingCapacity}</p>
                  <p>Luggage Quantity: {data?.car_luggageCapacity}</p>
                  {data?.car_hasWifi === 1 ? (
                    <p className="text-green-600">Wifi Available</p>
                  ) : (
                    <p className="text-red-600">Wifi Not Available</p>
                  )}
                  {data?.car_hasChildSeat === 1 ? (
                    <p className="text-green-600">Child Seat Available</p>
                  ) : (
                    <p className="text-red-600">Child Seat Not Available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 flex w-full items-center justify-center bg-white px-4 py-2 transition-transform duration-300 dark:bg-gray-800 ${isScrolling ? "translate-y-full" : "translate-y-0"}`}
      >
        <Button
          className={`w-[80%] lg:w-[40%] ${
            SelectedCarData.car_name === ""
              ? "cursor-not-allowed bg-gray-300 text-black"
              : "bg-blue-800 text-white"
          }`}
          onClick={handleCitytoCityNext}
          isDisabled={SelectedCarData.car_name === ""}
        >
          <span className="text-lg text-white">Next</span>
          <span className="text-lg text-white">
            <MdArrowForwardIos />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CarSelection;
