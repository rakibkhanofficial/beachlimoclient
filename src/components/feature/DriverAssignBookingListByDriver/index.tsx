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
  Skeleton,
} from "@nextui-org/react";
import { convertTo12HourFormat } from "~@/utils/formatetime";
import ListSkeleton from "../commontableListSkeleton/tableListskeleton";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { FaCheckSquare, FaEye, FaFilter } from "react-icons/fa";
import { formatDate } from "~@/utils/formatdate";
import DriverBookingDetailsModal from "./driverBookingdetails";

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

const DriverAssignBookingListComponent = () => {
  const [userBookingList, setUserBookingList] = useState<userBookingListType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  // Details modal
  const [selectedId, setSelectedId] = useState<number | null | undefined>(null);
  const [ismodalShow, setModalShow] = useState<boolean>(false);
  const [isStatusUpdate, setIsStatusUpdate] = useState(false);

  useEffect(() => {
    const fetchUserBookingList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(
          endPoints.Driver.getRentAllAssignedforDriver(currentPage, limit),
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
  }, [isStatusUpdate]);

  const statusOptions = [
    "Pending",
    "Accepted",
    "Assigned",
    "Completed",
    "Canceled",
  ];

  const filteredProducts = userBookingList.filter((product) => {
    const matchesSearch =
      product.dropoffLocationAddress
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.rideStatus.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter =
      statusFilter === "" || product.rideStatus === statusFilter;

    return matchesSearch && matchesStatusFilter;
  });

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

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Accepted":
        return "primary";
      case "Assigned":
        return "secondary";
      case "Completed":
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
      className="min-h-screen bg-white py-2 dark:bg-zinc-900 md:px-2"
    >
      <Card shadow="none" className="mx-auto">
        <CardHeader className="flex flex-col items-center justify-between space-y-4 px-6 py-8 sm:space-y-0 lg:flex-row">
          <h1 className="my-4 text-2xl font-bold text-gray-800 dark:text-white lg:my-0 xl:text-3xl 2xl:text-4xl">
            Assigned Booking List
          </h1>
          <div className=" flex flex-col justify-between gap-3 lg:flex-row lg:items-center lg:space-x-4">
            <Input
              startContent={<IoIosSearch fontSize="1.5rem" />}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <div className=" flex justify-between lg:justify-center lg:gap-3 ">
              {/* <Dropdown>
                <DropdownTrigger>
                  <Button endContent={<FaFilter />} color="secondary">
                    Filter by Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectionMode="single"
                  selectedKeys={new Set([statusFilter])}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    if (selectedKey) {
                      setStatusFilter(selectedKey as string);
                    }
                  }}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem
                      className="text-black dark:text-white"
                      key={status}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown> */}
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
                    <DropdownItem
                      className="text-black dark:text-white"
                      key={option.value}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
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
            shadow="sm"
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
            <TableBody
              items={paginatedProducts || []}
              emptyContent={
                <div className="py-12 text-center">
                  <p className="text-2xl font-semibold text-gray-500">
                    Booking Not Available
                  </p>
                  <p className="mt-2 text-gray-400">
                    There are no Booking to display for the selected criteria.
                  </p>
                </div>
              }
              loadingContent={<Skeleton className="h-12 w-full" />}
              loadingState={isLoading ? "loading" : "idle"}
            >
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
                          setSelectedId(product?.id);
                          setModalShow(true);
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
      <DriverBookingDetailsModal
        ismodalShow={ismodalShow}
        setModalShow={setModalShow}
        selectedId={selectedId}
        setIsStatusUpdate={setIsStatusUpdate}
        isStatusUpdate={isStatusUpdate}
      />
    </motion.div>
  );
};

export default DriverAssignBookingListComponent;
