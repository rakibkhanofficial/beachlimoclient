import React, { useEffect, useState } from "react";
import { deleteMethod } from "~@/utils/api/deleteMethod";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Chip,
  Skeleton,
  Image,
  CardHeader,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

interface Car {
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
  hasChildSeat: number;
  hasWifi: number;
  luggageCapacity: number;
  mileagePerGallon: string;
  transmission: string;
  fuelType: string;
  features: string;
  isAvailable: number;
  isActive: number;
  categoryId: number;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
}

const EnlistedCarListComponent = () => {
  const [carList, setCarList] = useState<Car[]>([]);
  const [filteredList, setFilteredList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    fetchCarList();
  }, []);

  useEffect(() => {
    filterCars();
  }, [searchQuery, filterType, carList]);

  const fetchCarList = async () => {
    setLoading(true);
    try {
      const response = await getMethod(endPoints?.cars?.getAllCars);
      if (response?.data?.statusCode === 200) {
        setCarList(response?.data?.data as Car[]);
      } else {
        console.error("Error fetching car list:", response?.data?.message);
        toast.error("Failed to fetch cars");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching cars");
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = carList;

    if (searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === "new") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filterType === "old") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFilteredList(filtered);
  };

  const handleDeleteCar = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteMethod({
        route: endPoints?.cars?.deleteCar(id),
        deleteData: "",
      });
      if (response?.data?.statusCode === 200) {
        setCarList((prevList) =>
          prevList.filter((car) => car.id !== id)
        );
        toast.success("Car deleted successfully!");
      } else {
        console.error("Error deleting car:", response?.data?.message);
        toast.error(response?.data?.message as string);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the car");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    onOpen();
  };

  const handleSaveEdit = async (updatedCar: Car) => {
    // Implement the API call to update the car here
    // For now, we'll just update the local state
    setCarList((prevList) =>
      prevList.map((c) => (c.id === updatedCar.id ? updatedCar : c))
    );
    onClose();
    toast.success("Car updated successfully!");
  };

  const renderSkeletons = () => {
    return Array(6).fill(null).map((_, index) => (
      <Card key={index} className="max-w-sm">
        <Skeleton className="h-48" />
        <CardBody>
          <Skeleton className="h-6 mb-2" />
          <Skeleton className="h-4" />
        </CardBody>
      </Card>
    ));
  };

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl text-center text-black dark:text-white font-bold mb-6 text-gradient">
        Enlisted Car List
      </h1>

      <div className="w-full flex-col justify-center md:flex md:justify-between mb-4">
        <Skeleton
          className="flex justify-center mx-auto rounded-lg"
          isLoaded={!loading}
        >
          <Input
            startContent={<CiSearch className="text-gray-400" />}
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Skeleton>
        <Skeleton className="rounded-lg w-[20%] my-3" isLoaded={!loading}>
          <Tabs
            aria-label="Filter options"
            selectedKey={filterType}
            onSelectionChange={(key) => setFilterType(key as string)}
          >
            <Tab key="all" title="All" />
            <Tab key="new" title="Newest" />
            <Tab key="old" title="Oldest" />
          </Tabs>
        </Skeleton>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-2 2xl:gap-6">
        {loading
          ? renderSkeletons()
          : filteredList.map((car) => (
              <Card
                key={car.id}
                className="w-full hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:gradient-to-br dark:from-slate-800 dark:to-slate-900"
              >
                <CardHeader className="bg-slate-100 dark:bg-slate-800">
                  <div className="flex justify-between">
                    <Image
                      width={25}
                      height={25}
                      src={car.image || "/placeholder-image.jpg"}
                      alt={car.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Chip color="primary" variant="shadow">
                        {car.categoryName}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="md:p-4 bg-slate-50 dark:bg-gray-800">
                  <div className="my-2 flex justify-center">
                    <Image
                      width={250}
                      height={250}
                      src={car.image || "/placeholder-image.jpg"}
                      alt={car.name}
                      className="object-cover w-full h-auto max-w-[150px] md:max-w-[250px] max-h-[150px] md:max-h-[250px]"
                    />
                  </div>

                  <h2 className="text-xs md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">
                    {car.name}
                  </h2>

                  <p className="text-sm md:text-base hidden md:inline text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {car.description}
                  </p>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg md:text-2xl font-bold text-primary">
                      ${car.pricePerHour}/hr
                    </span>

                    <Chip
                      color={car.isAvailable ? "success" : "danger"}
                      variant="flat"
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </Chip>
                  </div>

                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    Make: {car.make} | Model: {car.model} | Year: {car.year}
                  </p>
                </CardBody>

                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-4">
                  <Tooltip color="primary" content="View Details">
                    <Button
                      isIconOnly={true}
                      color="primary"
                      variant="light"
                      className="text-lg"
                    >
                      <FiEye />
                    </Button>
                  </Tooltip>

                  <Tooltip color="warning" content="Edit Car">
                    <Button
                      isIconOnly={true}
                      color="warning"
                      variant="light"
                      onPress={() => handleEditCar(car)}
                      className="text-lg"
                    >
                      <FaEdit />
                    </Button>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete Car">
                    <Button
                      isIconOnly={true}
                      color="danger"
                      variant="light"
                      onPress={() => handleDeleteCar(car.id)}
                      className="text-lg"
                    >
                      <IoMdTrash />
                    </Button>
                  </Tooltip>
                </CardFooter>
              </Card>
            ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Car</ModalHeader>
              <ModalBody>
                {editingCar && (
                  <div>
                    <Input
                      label="Name"
                      value={editingCar.name}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          name: e.target.value,
                        })
                      }
                      className="mb-2"
                    />
                    <Input
                      label="Price per Hour"
                      value={editingCar.pricePerHour}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          pricePerHour: e.target.value,
                        })
                      }
                      className="mb-2"
                    />
                    <Input
                      label="Seating Capacity"
                      type="number"
                      value={editingCar.seatingCapacity.toString()}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          seatingCapacity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSaveEdit(editingCar!)}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EnlistedCarListComponent;