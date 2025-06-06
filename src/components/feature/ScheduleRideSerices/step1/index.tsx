import { Button, Card, Chip, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdWifi,
  MdChildCare,
  MdLuggage,
  MdPeople,
  MdLocalGasStation,
  MdSettings,
} from "react-icons/md";
import Link from "next/link";
import UseScheduleRide from "~@/modules/servicemodule/hocs/schedulerideservice/useScheduleRideService";
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

const CarSelection = () => {
  const [carList, setCarList] = useState<CarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { handleCitytoCityNext, handleSelectedcar, SelectedCarData } =
  UseScheduleRide();

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
      } finally {
        setLoading(false);
      }
    };
    fetchCarList();
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  // useEffect(() => {
  //   let timeoutId: ReturnType<typeof setTimeout>;

  //   const handleScroll = () => {
  //     setIsScrolling(true);

  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       setIsScrolling(false);
  //     }, 100);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const renderCarCard = (car: CarType) => (
    <Card
      key={car.car_id}
      isPressable
      onPress={() => handleSelectedcar(car)}
      className={`overflow-hidden transition-all duration-300 hover:shadow-2xl ${
        SelectedCarData?.car_name === car.car_name
          ? "border-2 border-primary shadow-primary/50"
          : "hover:scale-105"
      }`}
    >
      <div className="flex w-full items-end justify-end">
        <Chip color="primary" variant="shadow" size="sm">
          {car.categoryName}
        </Chip>
      </div>
      <div className=" h-48 mx-auto flex justify-center items-center">
        <Image
          src={car.car_image}
          alt={car.car_name}
          width={200}
          height={200}
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4 w-full">
        <h2 className="mb-2 text-center text-2xl font-bold">{car.car_name}</h2>
        <p className="mb-4 text-sm text-gray-500">
          {car.car_make} {car.car_model} - {car.car_year}
        </p>
        <div className="mb-4 w-full flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">
              ${car.car_pricePerMile}
            </span>
            <span className="text-sm text-gray-500"> /mile</span>
          </div>
          <div className="flex gap-2">
            <Chip startContent={<MdPeople />} variant="flat" color="primary">
              {car.car_seatingCapacity}
            </Chip>
            <Chip startContent={<MdLuggage />} variant="flat" color="secondary">
              {car.car_luggageCapacity}
            </Chip>
          </div>
        </div>
        <div className="mb-4 w-full grid grid-cols-2 gap-2">
          <Chip
            startContent={<MdWifi />}
            variant="dot"
            color={car.car_hasWifi === 1 ? "success" : "danger"}
          >
            {car.car_hasWifi === 1 ? "Wi-Fi" : "No Wi-Fi"}
          </Chip>
          <Chip
            startContent={<MdChildCare />}
            variant="dot"
            color={car.car_hasChildSeat === 1 ? "success" : "danger"}
          >
            {car.car_hasChildSeat === 1 ? "Child Seat" : "No Child Seat"}
          </Chip>
          <Chip startContent={<MdLocalGasStation />} variant="flat">
            {car.car_fuelType}
          </Chip>
          <Chip startContent={<MdSettings />} variant="flat">
            {car.car_transmission}
          </Chip>
        </div>
      </div>
    </Card>
  );

  const renderSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="mb-2 h-8 w-3/4 rounded" />
        <Skeleton className="mb-4 h-4 w-1/2 rounded" />
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-1/3 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 pb-24">
        <Link
          href="/"
          className="hover:text-primary-dark inline-flex items-center gap-2 py-4 text-lg font-medium text-primary transition-colors"
        >
          <MdArrowBackIos />
          <span>Go Back</span>
        </Link>
        <h1 className="mb-10 mt-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Select Your Luxury Ride
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
              ))
            : carList?.map(renderCarCard)}
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 z-10 w-full bg-white/80 p-2 shadow-lg backdrop-blur-md transition-transform duration-300 dark:bg-gray-800/80 ${
          isScrolling ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className=" flex items-center justify-center ">
          <Button
            className="mx-auto w-full max-w-md text-lg font-semibold"
            color="primary"
            size="md"
            onClick={handleCitytoCityNext}
            isDisabled={SelectedCarData.car_name === ""}
            endContent={<MdArrowForwardIos />}
          >
            Continue with Selected Car
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarSelection;
