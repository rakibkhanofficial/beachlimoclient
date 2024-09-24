import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { convertTo12HourFormat } from "~@/utils/formatetime";
import BookingStatus from "./bookingStatus";
import ListSkeleton from "../commontableListSkeleton/tableListskeleton";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { FaCheckSquare, FaEye } from "react-icons/fa";
import { formatDate } from "~@/utils/formatdate";

type userBookingListType = {
  id: number;
  tripType: string;
  rideStatus: string;
  carImage: string;
  totalBookingPrice: string;
  paymentStatus: string;
  paymentMethod: string;
  pickupLocationAddress: string;
  pickupLocationMapLink: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocationAddress: string;
  dropoffLocationMapLink: string;
  hour: string;
  distance: string;
  createdAt: string;
  updatedAt: string;
};

const BookingListComponent = () => {
  const [userBookingList, setUserBookingList] = useState<userBookingListType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusmodalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    const fetchUserBookingList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(
          endPoints.Customer.getRentAllByuserId(currentPage, limit),
        );
        if (response?.data?.statusCode === 200) {
          setUserBookingList(
            response?.data?.data?.data as userBookingListType[],
          );
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error(response?.data?.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    void fetchUserBookingList();
  }, []);

  const filteredProducts = userBookingList.filter(
    (product) =>
      product.dropoffLocationAddress
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      product.rideStatus.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const statusOptions = ["all", "active", "inactive"];
  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "primary";
      case "Assigned":
        return "secondary";
      case "Complete":
        return "success";
      case "Canceled":
        return "danger";
      default:
        return "default";
    }
  };

  const handleDropDown = (value: string) => {
    setSortBy(value);
  };

  const handleOpenStatusModal = (status: string) => {
    setStatus(status);
    setModalShow(true);
  };

  if (isLoading) {
    return (
      <div>
        <ListSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 px-2 py-2 dark:bg-zinc-900"
    >
      <Card shadow="none" className="mx-auto">
        <CardHeader className="flex flex-col items-center justify-between space-y-4 px-6 py-8 lg:flex-row sm:space-y-0">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Booking List
          </h1>
          <div className=" flex flex-col gap-3 lg:flex-row  items-center space-x-4">
            <Input
              startContent={<IoIosSearch fontSize="1.5rem" />}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" color="default">
                  Sort by Date
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectionMode="single"
                selectedKeys={new Set([sortBy])}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0];
                  if (selectedKey) {
                    handleDropDown(selectedKey as string);
                  }
                }}
              >
                {sortOptions.map((option) => (
                  <DropdownItem key={option.value}>{option.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Total Products: {userBookingList.length}
            </p>
          </div>
          <Table
            aria-label="Registered product list table"
            className="min-w-full"
            shadow="none"
            isHeaderSticky
          >
            <TableHeader>
              <TableColumn>SL No</TableColumn>
              <TableColumn>Car Image</TableColumn>
              <TableColumn>Trip Type</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Pick up</TableColumn>
              <TableColumn>Drop off</TableColumn>
              <TableColumn>Distance: Hour</TableColumn>
              <TableColumn>Date: Time</TableColumn>
              <TableColumn>Booking price</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product, index) => (
                <TableRow
                  key={index}
                  className="hover:rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell>{index + 1 + (currentPage - 1) * limit}</TableCell>
                  <TableCell>
                    <Image
                      src={product.carImage}
                      alt={"car image"}
                      width={70}
                      height={70}
                    />
                  </TableCell>
                  <TableCell>{product.tripType}</TableCell>
                  <TableCell>
                    <Chip
                      startContent={<FaCheckSquare size={18} />}
                      color={getStatusColor(product.rideStatus)}
                      variant={product.rideStatus ? "faded" : "flat"}
                    >
                      {product.rideStatus}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Link
                      isExternal={true}
                      href={product.pickupLocationMapLink}
                      showAnchorIcon
                    >
                      {product.pickupLocationAddress.slice(0, 10)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      isExternal={true}
                      href={product.dropoffLocationMapLink}
                      showAnchorIcon
                    >
                      {product.dropoffLocationAddress.slice(0, 10)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {product.distance} Miles - {product.hour} hours
                  </TableCell>
                  <TableCell>
                    <div>
                      <span>{formatDate(product.pickupDate)}</span>
                      <span>{convertTo12HourFormat(product.pickupTime)}</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.totalBookingPrice}</TableCell>
                  <TableCell>
                    <Tooltip content="View Details">
                      <Button
                        color="primary"
                        size="sm"
                        onPress={() => {
                          handleOpenStatusModal(product?.rideStatus);
                        }}
                        isIconOnly
                      >
                        <FaEye />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="my-3 flex items-center justify-center">
            <Pagination
              initialPage={1}
              showControls
              total={Math.ceil(paginatedProducts.length / limit)}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        </CardBody>
      </Card>
      <Modal
        backdrop="blur"
        isOpen={statusmodalShow}
        onOpenChange={() => setModalShow(!statusmodalShow)}
        placement="auto"
        size="4xl"
      >
        <ModalContent>
          <>
            <ModalBody>
              <h1 className="mb-6 text-center text-2xl font-semibold text-black dark:text-white">
                Your Booking Status
              </h1>
              <BookingStatus bookingStatus={status} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setModalShow(!statusmodalShow)}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default BookingListComponent;
