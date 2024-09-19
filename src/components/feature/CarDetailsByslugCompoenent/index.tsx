import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
  ScrollShadow,
  Tooltip,
  Skeleton,
} from "@nextui-org/react";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import {
  FaCar,
  FaGasPump,
  FaSuitcase,
  FaUsers,
  FaCog,
  FaWifi,
  FaClock,
} from "react-icons/fa";
import ImageZoom from "~@/components/elements/CustomImageZoom";

type CarDetails = {
  id: number;
  userId: number;
  name: string;
  description: string;
  slug: string;
  image: string;
  pricePerHour: string;
  pricePerMile: string;
  model: string;
  year: number;
  make: string;
  seatingCapacity: number;
  hasChildSeat: boolean;
  hasWifi: boolean;
  luggageCapacity: number;
  mileagePerGallon: string;
  transmission: string;
  fuelType: string;
  features: string[];
  isAvailable: boolean;
  isActive: boolean;
  categoryId: number;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
  subCategory: SubCategoryType;
};

export type SubCategoryType = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  categoryName: string; 
  category: CategoryType;
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

type PropsType = {
  car: CarDetails | null;
  loading: boolean;
  error: string | null;
};

const PremiumCarDetails = ({ car, loading, error }: PropsType) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  if (loading) {
    return (
      <Card className="mx-auto w-full max-w-7xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl dark:from-gray-900 dark:to-gray-800">
        <CardBody className="p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <Skeleton className="h-[400px] w-full rounded-xl lg:w-1/2" />
            <div className="w-full space-y-6 lg:w-1/2">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
              <Skeleton className="h-8 w-1/2 rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full rounded-lg" />
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 flex-1 rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>
            </div>
          </div>
          <Divider className="my-8" />
          <Skeleton className="mt-8 h-12 w-full rounded-lg" />
          <Skeleton className="mt-4 h-[300px] w-full rounded-lg" />
        </CardBody>
      </Card>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto p-4 sm:p-8">
        <Card className="mx-auto w-full max-w-6xl bg-gradient-to-br from-red-50 to-red-100 shadow-2xl dark:from-red-900 dark:to-red-800">
          <CardBody>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-300">
              {error || "Product not found"}
            </h3>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-7xl ">
      <CardBody className="p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full rounded-xl shadow-lg lg:w-1/2">
            <ImageZoom
              images={[
                {
                  thumbnail: car.image,
                  large: car.image,
                  small: car.image,
                  alt: car.name,
                },
              ]}
              zoomFactor={2.5}
              containerClassName="bg-white dark:bg-gray-800 p-2 rounded-xl"
              imageClassName="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              thumbnailClassName="hidden"
              zoomClassName="w-[600px] h-[600px]"
            />
          </div>

          <div className="w-full space-y-6 lg:w-1/2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                  {car.name}
                </h2>
                <p className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
                  ${car.pricePerHour}/hour • ${car.pricePerMile}/mile
                </p>
              </div>
              <Chip
                color={car.isAvailable ? "success" : "danger"}
                variant="shadow"
                size="lg"
                className="font-semibold text-white"
              >
                {car.isAvailable ? "Available" : "Unavailable"}
              </Chip>
            </div>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {car.description}
            </p>

            <div className="grid grid-cols-2 gap-6">
              <Tooltip content="Make & Model">
                <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                  <FaCar className="text-2xl text-purple-500" />
                  <span className="font-semibold">
                    {car.make} {car.model} ({car.year})
                  </span>
                </div>
              </Tooltip>
              <Tooltip content="Seating Capacity">
                <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                  <FaUsers className="text-2xl text-purple-500" />
                  <span className="font-semibold">
                    {car.seatingCapacity} seats
                  </span>
                </div>
              </Tooltip>
              <Tooltip content="Luggage Capacity">
                <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                  <FaSuitcase className="text-2xl text-purple-500" />
                  <span className="font-semibold">
                    {car.luggageCapacity} bags
                  </span>
                </div>
              </Tooltip>
              <Tooltip content="Fuel Efficiency">
                <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                  <FaGasPump className="text-2xl text-purple-500" />
                  <span className="font-semibold">
                    {car.mileagePerGallon} mpg
                  </span>
                </div>
              </Tooltip>
            </div>

            <div className="flex gap-4">
              <Button
                variant="shadow"
                color={isFavorite ? "danger" : "default"}
                startContent={
                  isFavorite ? (
                    <BsHeartFill className="text-xl" />
                  ) : (
                    <BsHeart className="text-xl" />
                  )
                }
                className="h-14 flex-1 rounded-full text-lg font-semibold transition-all hover:scale-105"
                onPress={toggleFavorite}
              >
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button
                variant="shadow"
                startContent={<BsShare className="text-xl" />}
                className="h-14 flex-1 rounded-full bg-blue-600 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        <Tabs
          aria-label="Car Details"
          color="secondary"
          variant="underlined"
          className="mt-8"
        >
          <Tab key="specifications" title="Specifications" className="text-lg">
            <ScrollShadow className="h-[300px] p-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaCog className="text-purple-500" />
                    <span>
                      <strong>Transmission:</strong> {car.transmission}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaGasPump className="text-purple-500" />
                    <span>
                      <strong>Fuel Type:</strong> {car.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaUsers className="text-purple-500" />
                    <span>
                      <strong>Child Seat:</strong>{" "}
                      {car.hasChildSeat ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaWifi className="text-purple-500" />
                    <span>
                      <strong>Wi-Fi:</strong>{" "}
                      {car.hasWifi ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaCar className="text-purple-500" />
                    <span>
                      <strong>Category:</strong> {car.category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaCar className="text-purple-500" />
                    <span>
                      <strong>Subcategory:</strong> {car.subCategory.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaClock className="text-purple-500" />
                    <span>
                      <strong>Listed:</strong>{" "}
                      {new Date(car.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800">
                    <FaClock className="text-purple-500" />
                    <span>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(car.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollShadow>
          </Tab>
          <Tab key="features" title="Features" className="text-lg">
            <ScrollShadow className="h-[300px] p-4">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {car.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
                  >
                    <FaCog className="text-purple-500" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollShadow>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default PremiumCarDetails;
