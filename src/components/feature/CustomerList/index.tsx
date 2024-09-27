import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import {
  Input,
  Chip,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Skeleton,
  CardHeader,
} from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { IoIosInformationCircle, IoIosSearch } from "react-icons/io";
import { motion } from "framer-motion";

interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  birthdaydate: string | null;
  homeaddress: string | null;
  officeaddress: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CustomerListComponent = () => {
  const [customerList, setCustomerList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await getMethod(endPoints.Admin.getAllCustomersList);
        if (response?.data?.statusCode === 200) {
          setCustomerList(response?.data?.data as User[]);
          setTotalPages(Math.ceil(response?.data?.data.length / itemsPerPage));
        } else {
          console.error(response?.data?.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchCustomerList();
  }, []);

  const filteredCustomerList = customerList.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive =
      activeFilter === "all" ||
      (activeFilter === "active" && customer.isActive) ||
      (activeFilter === "inactive" && !customer.isActive);
    return matchesSearch && matchesActive;
  });

  const sortedCustomerList = [...filteredCustomerList].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const paginatedCustomerList = sortedCustomerList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderDesktopView = () => (
    <Table aria-label="Customer list table">
      <TableHeader>
        <TableColumn>SL No</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PHONE</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array(itemsPerPage)
              .fill(null)
              .map((_, index) => (
                <TableRow key={index}>
                  {Array(7)
                    .fill(null)
                    .map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          : paginatedCustomerList.map((customer: User, index) => (
              <TableRow key={customer.userId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar
                      src={
                        customer.image || "https://i.ibb.co/dtt67mC/avathar.png"
                      }
                      size="sm"
                    />
                    <span className="ml-2">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>
                  <Chip
                    color={customer.isActive ? "success" : "danger"}
                    variant="flat"
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Tooltip content="View Details">
                    <Button isIconOnly size="sm" variant="light">
                      <IoIosInformationCircle size={20} />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );

  const renderMobileView = () => (
    <div className="space-y-4">
      {isLoading
        ? Array(itemsPerPage)
            .fill(null)
            .map((_, index) => (
              <Card key={index}>
                <CardBody>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-3 w-1/2 rounded-lg" />
                      <Skeleton className="h-3 w-1/2 rounded-lg" />
                      <Skeleton className="h-6 w-20 rounded-lg" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
        : paginatedCustomerList.map((customer) => (
            <Card key={customer.userId}>
              <CardBody>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={
                      customer.image || "https://i.ibb.co/dtt67mC/avathar.png"
                    }
                    size="lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                    <Chip
                      color={customer.isActive ? "success" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {customer.isActive ? "Active" : "Inactive"}
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-zinc-900 md:px-2 lg:py-2"
    >
      <Card shadow="none">
        <CardHeader className="flex w-full flex-col items-center justify-between space-y-4 sm:space-y-0 lg:flex-row lg:px-6 lg:py-8">
          <h1 className="my-1 w-full text-2xl text-center lg:text-start font-bold text-gray-800 dark:text-white lg:my-0 xl:text-3xl 2xl:text-4xl">
            Customer List
          </h1>
          <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:items-center lg:space-x-4">
            <div className="flex w-full justify-center lg:justify-end">
              <Input
                startContent={
                  <IoIosSearch
                    className="text-black dark:text-white"
                    fontSize="1.5rem"
                  />
                }
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex justify-between md:gap-3 lg:justify-start">
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary" endContent={<FaFilter />}>
                    Filter by Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter options"
                  selectedKeys={[activeFilter]}
                  selectionMode="single"
                  onSelectionChange={(keys) =>
                    setActiveFilter(Array.from(keys)[0] as string)
                  }
                >
                  <DropdownItem
                    className="text-black dark:text-white"
                    key="all"
                  >
                    All
                  </DropdownItem>
                  <DropdownItem
                    className="text-black dark:text-white"
                    key="active"
                  >
                    Active
                  </DropdownItem>
                  <DropdownItem
                    className="text-black dark:text-white"
                    key="inactive"
                  >
                    Inactive
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Sort by Date</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort options"
                  selectedKeys={[sortBy]}
                  selectionMode="single"
                  onSelectionChange={(keys) =>
                    setSortBy(Array.from(keys)[0] as string)
                  }
                >
                  <DropdownItem
                    className="text-black dark:text-white"
                    key="newest"
                  >
                    Newest
                  </DropdownItem>
                  <DropdownItem
                    className="text-black dark:text-white"
                    key="oldest"
                  >
                    Oldest
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>
        <CardBody className="w-full">
          <div className="mb-4 flex justify-between">
            <p className="flex items-center justify-start gap-2 text-sm text-gray-700 dark:text-gray-200">
              Total Customers:{" "}
              {isLoading ? (
                <Skeleton className="inline-block h-6 w-10 rounded-lg" />
              ) : (
                customerList.length
              )}
            </p>
          </div>
          <div className="hidden lg:block">{renderDesktopView()}</div>
          <div className="lg:hidden">{renderMobileView()}</div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
            showControls
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CustomerListComponent;
