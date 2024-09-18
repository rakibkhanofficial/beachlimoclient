import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
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

const AllCars = () => {
  const router = useRouter();
  const [carList, setCarList] = useState<CarType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleViewDetails = (slug: string) => {
    router.push(`/${slug}`);
  };

  const renderCarCard = (car: CarType) => (
    <Card key={car.car_id} isPressable>
      <CardHeader className="bg-slate-100 dark:bg-slate-800">
        <div className="flex w-full items-end justify-end">
          <Chip color="primary" variant="shadow" size="sm">
            {car.categoryName}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className=" bg-slate-50 dark:bg-gray-800 md:p-2">
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
          <div className="mb-4 grid w-full grid-cols-2 gap-2">
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
      </CardBody>
      <CardFooter className="flex justify-between border-t border-gray-200 bg-gray-50 p-2 dark:border-slate-700 dark:bg-slate-800">
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

  console.log(carList);

  return (
    <div>
      <h1 className="mb-10 mt-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
        All Your Luxury Ride
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>{renderSkeleton()}</div>
            ))
          : carList?.map(renderCarCard)}
      </div>
    </div>
  );
};

export default AllCars;
