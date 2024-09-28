import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  Chip,
  Image,
  Link,
  Skeleton,
} from "@nextui-org/react";
import {
  FaCar,
  FaInfoCircle,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";
import { putMethod } from "~@/utils/api/putMethod";
import CustomSelect from "~@/components/elements/CustomSelect";

type PropsType = {
  selectedId: number | null | undefined;
  ismodalShow: boolean;
  isStatusUpdate: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
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

const AdminBookingDetailsModal = ({
  selectedId,
  ismodalShow,
  setModalShow,
  setIsStatusUpdate,
  isStatusUpdate,
}: PropsType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<BookingData>(
    {} as BookingData,
  );
  const [selectedStatus, setSelectedStatus] = useState<
    string | number | boolean | null
  >(null);

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
          setSelectedStatus(data.rideStatus);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId !== null && selectedId !== undefined) {
      fetchBookingDetails();
    }
  }, [selectedId]);

  const handleStatusChange = async () => {
    try {
      setIsStatusUpdate(true);
      const response = await putMethod({
        route: endPoints?.Admin.updateBookingStatusById(selectedId),
        updateData: {
          status: selectedStatus,
        },
      });
      if (response?.data?.statusCode === 200) {
        toast.success("Status updated successfully!");
        setIsStatusUpdate(false);
      } else {
        toast.error("Failed to update status. Please try again.");
        setIsStatusUpdate(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
      setIsStatusUpdate(false);
    }
  };

  const BookingInfoTab = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-56 w-full rounded-lg object-contain shadow-lg">
          <Image
            src={bookingDetails.carImage}
            alt="Car Image"
            className="h-56 w-full rounded-lg object-contain shadow-lg"
          />
        </div>
        <div className="relative h-56 w-full rounded-lg shadow-lg">
          <div className=" lg:top-25 absolute left-1 top-36 rounded-lg bg-opacity-90 p-3 shadow-md">
            <p className="flex items-center text-3xl font-bold text-green-600">
              <FaDollarSign className="mr-1" />
              {bookingDetails.totalBookingPrice}
            </p>
            <p className="text-sm text-gray-600">
              {bookingDetails.paymentStatus}
            </p>
          </div>
          <div className="w-full grid-cols-2 items-center justify-between px-1 lg:grid">
            <div className="flex gap-3 lg:gap-2">
              <p className="mb-2 text-lg font-semibold">Ride Status:</p>
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
            <div className="flex w-full flex-col gap-2">
              <CustomSelect
                value={selectedStatus}
                onChange={(newValue) => setSelectedStatus(newValue)}
                placeholder="Select an option"
                showSearch={false}
                allowClear={false}
                isLoading={false}
              >
                {[
                  "Pending",
                  // "Accepted",
                  // "Assigned",
                  // "Completed",
                  // "Canceled",
                ].map((status) => (
                  <CustomSelect.Option key={status} value={status}>
                    {status}
                  </CustomSelect.Option>
                ))}
              </CustomSelect>
              <Button
                className="w-full"
                size="sm"
                color="secondary"
                disabled={selectedStatus === null}
                onClick={handleStatusChange}
                isLoading={isStatusUpdate}
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard
          icon={<FaMapMarkerAlt className="text-blue-500" />}
          title="Pickup"
          content={bookingDetails.pickupLocationAddress}
          link={bookingDetails.pickupLocationMapLink}
        />
        <InfoCard
          icon={<FaMapMarkerAlt className="text-red-500" />}
          title="Drop-off"
          content={bookingDetails.dropoffLocationAddress}
          link={bookingDetails.dropoffLocationMapLink}
        />
        <InfoCard
          icon={<FaClock className="text-orange-500" />}
          title="Date & Time"
          content={`${bookingDetails.pickupDate} at ${bookingDetails.pickupTime}`}
        />
        <InfoCard
          icon={<FaCar className="text-purple-500" />}
          title="Trip Details"
          content={`${bookingDetails.tripType} • ${bookingDetails.distance} • ${bookingDetails.hour} hours`}
        />
      </div>
    </div>
  );

  const CarInfoTab = () => (
    <div className="space-y-4 ">
      <h3 className="mb-4 text-xl font-semibold">Vehicle Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="Name" value={bookingDetails.car?.name} />
        <InfoItem label="Model" value={bookingDetails.car?.model} />
        <InfoItem label="Year" value={`${bookingDetails.car?.year}`} />
        <InfoItem label="Make" value={bookingDetails.car?.make} />
        <InfoItem
          label="Seating Capacity"
          value={`${bookingDetails.car?.seatingCapacity}`}
        />
        <InfoItem label="Fuel Type" value={bookingDetails.car?.fuelType} />
      </div>
    </div>
  );

  const UserInfoTab = () => (
    <div className="space-y-4">
      <h3 className="mb-4 text-xl font-semibold">Customer Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="Name" value={bookingDetails.user?.name} />
        <InfoItem label="Email" value={bookingDetails.user?.email} />
        <InfoItem label="Phone" value={bookingDetails.user?.phone} />
      </div>
    </div>
  );
  console.log("ismodalShow", ismodalShow);
  return (
    <Modal
      backdrop="blur"
      isOpen={ismodalShow}
      onOpenChange={() => setModalShow(!ismodalShow)}
      placement="auto"
      size="5xl"
      // scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-0">
              <Card className="w-full">
                <CardHeader className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white xl:p-2 2xl:p-4">
                  <h1 className=" text-xl font-bold xl:text-2xl 2xl:text-3xl">
                    Booking Details
                  </h1>
                  <p className=" mt-1 text-lg 2xl:mt-2">
                    Booking ID: #{bookingDetails.id}
                  </p>
                </CardHeader>
                <CardBody className=" h-[30rem] md:h-[36.5rem] lg:h-[25rem] xl:h-[25rem] 2xl:h-[36.5rem] ">
                  {isLoading ? (
                    <BookingDetailsSkeleton />
                  ) : (
                    <Tabs
                      aria-label="Booking Details"
                      color="primary"
                      variant="underlined"
                      size="lg"
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
                        <BookingInfoTab />
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
                        <CarInfoTab />
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
                        <UserInfoTab />
                      </Tab>
                    </Tabs>
                  )}
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

type infoCardType = {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
};

const InfoCard = ({ icon, title, content, link }: infoCardType) => (
  <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-zinc-800">
    <div className="mb-2 flex items-center">
      {icon}
      <h3 className="ml-2 text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-700">{content}</p>
    {link && (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-blue-500 hover:underline"
      >
        View on Map
      </Link>
    )}
  </div>
);

type selectItemProps = {
  value: string;
  label: React.ReactNode;
};

const InfoItem = ({ label, value }: selectItemProps) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const BookingDetailsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-64 w-full rounded-lg" />
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-32 rounded-lg" />
      ))}
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-10 w-32 rounded-lg" />
      <Skeleton className="h-10 w-48 rounded-lg" />
    </div>
  </div>
);

export default AdminBookingDetailsModal;
