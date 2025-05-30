import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import Image from "next/image";
import {
  MdWifi,
  MdChildCare,
  MdLuggage,
  MdPeople,
  MdLocalGasStation,
  MdSettings,
} from "react-icons/md";
import { useRouter } from "next/router";
import { FiEye } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

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

type PropsType = {
  filteredList: CarType[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
};

const AllCars = ({
  filteredList,
  loading,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
}: PropsType) => {
  const router = useRouter();

  const handleViewDetails = (slug: string) => {
    router.push(`/${slug}`);
  };

  const renderCarCard = (car: CarType) => (
    <Card key={car.car_id} isPressable>
      <CardHeader>
        <div className="flex w-full items-end justify-end">
          <Chip color="primary" variant="shadow" size="sm">
            {car.categoryName}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className=" md:p-2">
        <div className=" mx-auto flex h-48 items-center justify-center">
          <Image
            src={car.car_image}
            alt={car.car_name}
            width={200}
            height={200}
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="w-full p-4">
          <h2 className="mb-2 text-center text-2xl font-bold">
            {car.car_name}
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            {car.car_make} {car.car_model} - {car.car_year}
          </p>
          <div className="mb-4 flex w-full items-center justify-between">
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
              <Chip
                startContent={<MdLuggage />}
                variant="flat"
                color="secondary"
              >
                {car.car_luggageCapacity}
              </Chip>
            </div>
          </div>
          <div className="mb-4 flex justify-between">
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
          </div>
          <div className="flex justify-between">
          <Chip startContent={<MdLocalGasStation />} variant="flat">
              {car.car_fuelType}
            </Chip>
            <Chip startContent={<MdSettings />} variant="flat">
              {car.car_transmission}
            </Chip>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between border-t border-gray-200 bg-gray-50 p-2 dark:border-slate-700 dark:bg-zinc-900">
        <Tooltip color="primary" content="View Details">
          <Button
            onClick={() => handleViewDetails(car.car_slug)}
            isIconOnly={true}
            color="primary"
            variant="light"
            className="text-lg"
            title="view details"
            type="button"
          >
            <FiEye />
          </Button>
        </Tooltip>

        <Tooltip color="warning" content="Add to Cart">
          <Button
            color="secondary"
            // onClick={() => handleAddToCart(product.product_id)}
            // isDisabled={product.product_stockQuantity === 0}
            className=" px-5 md:px-10 "
            title="add to cart"
            type="button"
          >
            <BsCartPlus size={20} />
          </Button>
        </Tooltip>
      </CardFooter>
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
    <div className="w-full px-2 pt-4 lg:p-5 lg:pb-4 lg:pt-8 2xl:p-10">
      <div className="min-h-[60vh]">
        <h1 className="mb-10 mt-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
          All Your Luxury Ride
        </h1>
        {loading ? (
          <div className="my-5 flex w-full flex-col justify-between gap-4 md:flex-row">
            <Skeleton className=" flex w-full justify-center rounded-lg md:justify-end" />
            <Skeleton className="flex w-[100%] justify-end rounded-lg " />
          </div>
        ) : (
          <div className="my-5 flex w-full flex-col justify-between gap-4 md:flex-row">
            <div className="flex w-full justify-center md:justify-start">
              <Input
                startContent={<CiSearch className="text-gray-400" />}
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" w-[80%] md:w-[60%]"
              />
            </div>
            <div className="flex w-[100%] justify-end">
              <Tabs
                aria-label="Filter options"
                selectedKey={filterType}
                onSelectionChange={(key) => setFilterType(key as string)}
              >
                <Tab key="all" title="All" />
                <Tab key="new" title="Newest" />
                <Tab key="old" title="Oldest" />
              </Tabs>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
              ))
            : filteredList?.map(renderCarCard)}
        </div>
      </div>
    </div>
  );
};

export default AllCars;
