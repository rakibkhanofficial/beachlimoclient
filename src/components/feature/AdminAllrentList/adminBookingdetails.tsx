import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  Divider,
  Image,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "../../../utils/api/route";
import BookingDetailsSkeleton from "./bookingDetailsSkeleton";
import { FaCar, FaInfoCircle, FaUser } from "react-icons/fa";

type PropsType = {
  selectedId: number | null;
  ismodalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  isStatusUpdate: boolean;
  setIsStatusUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

type TripType = "CityToCity" | "AirportTransfer" | "ByTheHour" | "ScheduleRide";
type RideStatus =
  | "Pending"
  | "Accepted"
  | "Assigned"
  | "Completed"
  | "Canceled";
type PaymentStatus = "Paid" | "Unpaid";
type PaymentMethod = "online" | "cash";

interface Car {
  name: string;
  model: string;
  year: number;
  make: string;
  seatingCapacity: number;
  fuelType: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

interface BookingData {
  id: number;
  tripType: TripType;
  airportName: string | null;
  rideStatus: RideStatus;
  carImage: string;
  pickupLocationAddress: string;
  pickupLocationMapLink: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocationAddress: string;
  dropoffLocationMapLink: string;
  totalBookingPrice: string;
  hour: number;
  distance: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  car: Car;
  user: User;
}

const AdminBookinglistDetails = ({
  selectedId,
  ismodalShow,
  setModalShow,
  isStatusUpdate,
  setIsStatusUpdate,
}: PropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<BookingData>(
    {} as BookingData,
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchBookingDetails = async () => {
      try {
        const response = await getMethod(
          endPoints?.Admin.getBookingDetails(selectedId),
        );
        if (response?.data?.statusCode === 200) {
          const data = response?.data?.data;
          setBookingDetails(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId !== null) {
      fetchBookingDetails();
    }
  }, [selectedId]);

  const handleStatusChange = (value: string) => {
    // Implement status change logic here
    console.log("New status:", value);
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={ismodalShow}
        onOpenChange={() => setModalShow(!ismodalShow)}
        placement="auto"
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalBody className="p-0">
            <Card className="w-full">
              <CardHeader className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                <h1 className="text-3xl font-bold">Booking Details</h1>
              </CardHeader>
              <CardBody>
                <Tabs
                  aria-label="Booking Details"
                  color="primary"
                  variant="underlined"
                >
                  <Tab
                    key="booking"
                    title={
                      <div className="flex items-center space-x-2">
                        <FaInfoCircle />
                        <span>Booking Info</span>
                      </div>
                    }
                  >
                    <div>
                      <div className="flex items-center justify-center">
                        <Image
                          src={bookingDetails.carImage}
                          alt="Car Image"
                          className="h-60 w-full object-cover"
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4 px-5 text-start">
                        <div className="w-full">
                          <p>
                            <strong>Trip Type:</strong>{" "}
                            {bookingDetails.tripType}
                          </p>
                          <p>
                            <strong>Pickup:</strong>{" "}
                            {bookingDetails.pickupLocationAddress}
                          </p>
                          <p>
                            <strong>Dropoff:</strong>{" "}
                            {bookingDetails.dropoffLocationAddress}
                          </p>
                          <p>
                            <strong>Pickup Date:</strong>{" "}
                            {bookingDetails.pickupDate}
                          </p>
                          <p>
                            <strong>Pickup Time:</strong>{" "}
                            {bookingDetails.pickupTime}
                          </p>
                        </div>
                        <div className="w-full">
                          <p>
                            <strong>Total Price:</strong>{" "}
                            {bookingDetails.totalBookingPrice}
                          </p>
                          <p>
                            <strong>Distance:</strong> {bookingDetails.distance}
                          </p>
                          <p>
                            <strong>Duration:</strong> {bookingDetails.hour}{" "}
                            hours
                          </p>
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {bookingDetails.paymentMethod}
                          </p>
                          <div>
                            <strong>Ride Status: </strong>
                            <Chip
                              color={
                                bookingDetails.rideStatus === "Completed"
                                  ? "success"
                                  : "warning"
                              }
                              variant="shadow"
                              size="sm"
                            >
                              {bookingDetails.rideStatus}
                            </Chip>
                          </div>
                          <div>
                            <strong>Payment Status: </strong>
                            <Chip
                              color={
                                bookingDetails.paymentStatus === "Paid"
                                  ? "success"
                                  : "danger"
                              }
                              variant="shadow"
                              size="sm"
                            >
                              {bookingDetails.paymentStatus}
                            </Chip>
                          </div>
                        </div>
                        <div className=" w-full">
                          <Select
                            label="Change Ride Status"
                            placeholder="Select new status"
                            selectedKeys={bookingDetails?.rideStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                          >
                            <SelectItem
                              className="text-black dark:text-white"
                              key="Pending"
                              value="Pending"
                            >
                              Pending
                            </SelectItem>
                            <SelectItem
                              className="text-black dark:text-white"
                              key="Accepted"
                              value="Accepted"
                            >
                              Accepted
                            </SelectItem>
                            <SelectItem
                              className="text-black dark:text-white"
                              key="Assigned"
                              value="Assigned"
                            >
                              Assigned
                            </SelectItem>
                            <SelectItem
                              className="text-black dark:text-white"
                              key="Completed"
                              value="Completed"
                            >
                              Completed
                            </SelectItem>
                            <SelectItem
                              className="text-black dark:text-white"
                              key="Canceled"
                              value="Canceled"
                            >
                              Canceled
                            </SelectItem>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="car"
                    title={
                      <div className="flex items-center space-x-2">
                        <FaCar />
                        <span>Car Info</span>
                      </div>
                    }
                  >
                    <div className="px-5 text-start">
                      <p>
                        <strong>Name:</strong> {bookingDetails.car?.name}
                      </p>
                      <p>
                        <strong>Model:</strong> {bookingDetails.car?.model}
                      </p>
                      <p>
                        <strong>Year:</strong> {bookingDetails.car?.year}
                      </p>
                      <p>
                        <strong>Make:</strong> {bookingDetails.car?.make}
                      </p>
                      <p>
                        <strong>Seating Capacity:</strong>{" "}
                        {bookingDetails.car?.seatingCapacity}
                      </p>
                      <p>
                        <strong>Fuel Type:</strong>{" "}
                        {bookingDetails.car?.fuelType}
                      </p>
                    </div>
                  </Tab>
                  <Tab
                    key="user"
                    title={
                      <div className="flex items-center space-x-2">
                        <FaUser />
                        <span>User Info</span>
                      </div>
                    }
                  >
                    <div className="px-5 text-start">
                      <p>
                        <strong>Name:</strong> {bookingDetails.user?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {bookingDetails.user?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {bookingDetails.user?.phone}
                      </p>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setModalShow(!ismodalShow)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminBookinglistDetails;
