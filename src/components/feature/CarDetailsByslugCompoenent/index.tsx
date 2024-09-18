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
  Skeleton
} from "@nextui-org/react";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { FaCar, FaGasPump, FaSuitcase, FaUsers, FaCog, FaWifi, FaClock } from "react-icons/fa";
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
      <Card className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl">
        <CardBody className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <Skeleton className="w-full lg:w-1/2 h-[400px] rounded-xl" />
            <div className="w-full lg:w-1/2 space-y-6">
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
          <Skeleton className="h-12 w-full rounded-lg mt-8" />
          <Skeleton className="h-[300px] w-full rounded-lg mt-4" />
        </CardBody>
      </Card>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto p-4 sm:p-8">
        <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 shadow-2xl">
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
    <Card className="w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 shadow-2xl">
      <CardBody className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <ImageZoom
              images={[{ thumbnail: car.image, large: car.image, small: car.image, alt: car.name }]}
              zoomFactor={2.5}
              containerClassName="bg-white dark:bg-gray-800 p-2 rounded-xl"
              imageClassName="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              thumbnailClassName="hidden"
              zoomClassName="w-[600px] h-[600px]"
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{car.name}</h2>
                <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-2">
                  ${car.pricePerHour}/hour • ${car.pricePerMile}/mile
                </p>
              </div>
              <Chip color={car.isAvailable ? "success" : "danger"} variant="shadow" size="lg" className="text-white font-semibold">
                {car.isAvailable ? "Available" : "Unavailable"}
              </Chip>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{car.description}</p>

            <div className="grid grid-cols-2 gap-6">
              <Tooltip content="Make & Model">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <FaCar className="text-purple-500 text-2xl" />
                  <span className="font-semibold">{car.make} {car.model} ({car.year})</span>
                </div>
              </Tooltip>
              <Tooltip content="Seating Capacity">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <FaUsers className="text-purple-500 text-2xl" />
                  <span className="font-semibold">{car.seatingCapacity} seats</span>
                </div>
              </Tooltip>
              <Tooltip content="Luggage Capacity">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <FaSuitcase className="text-purple-500 text-2xl" />
                  <span className="font-semibold">{car.luggageCapacity} bags</span>
                </div>
              </Tooltip>
              <Tooltip content="Fuel Efficiency">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <FaGasPump className="text-purple-500 text-2xl" />
                  <span className="font-semibold">{car.mileagePerGallon} mpg</span>
                </div>
              </Tooltip>
            </div>

            <div className="flex gap-4">
              <Button
                variant="shadow"
                color={isFavorite ? "danger" : "default"}
                startContent={isFavorite ? <BsHeartFill className="text-xl" /> : <BsHeart className="text-xl" />}
                className="flex-1 h-14 text-lg font-semibold transition-all rounded-full hover:scale-105"
                onPress={toggleFavorite}
              >
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button
                variant="shadow"
                startContent={<BsShare className="text-xl" />}
                className="flex-1 h-14 text-lg font-semibold transition-all rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              >
                Share
              </Button>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        <Tabs aria-label="Car Details" color="secondary" variant="underlined" className="mt-8">
          <Tab key="features" title="Features" className="text-lg">
            <ScrollShadow className="h-[300px] p-4">
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaCog className="text-purple-500" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollShadow>
          </Tab>
          <Tab key="specifications" title="Specifications" className="text-lg">
            <ScrollShadow className="h-[300px] p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaCog className="text-purple-500" />
                    <span><strong>Transmission:</strong> {car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaGasPump className="text-purple-500" />
                    <span><strong>Fuel Type:</strong> {car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaUsers className="text-purple-500" />
                    <span><strong>Child Seat:</strong> {car.hasChildSeat ? "Available" : "Not Available"}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaWifi className="text-purple-500" />
                    <span><strong>Wi-Fi:</strong> {car.hasWifi ? "Available" : "Not Available"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaCar className="text-purple-500" />
                    <span><strong>Category ID:</strong> {car.categoryId}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaCar className="text-purple-500" />
                    <span><strong>Subcategory ID:</strong> {car.subCategoryId}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaClock className="text-purple-500" />
                    <span><strong>Listed:</strong> {new Date(car.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                    <FaClock className="text-purple-500" />
                    <span><strong>Last Updated:</strong> {new Date(car.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </ScrollShadow>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default PremiumCarDetails;