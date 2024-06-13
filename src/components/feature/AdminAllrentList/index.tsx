import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IuserBookingListType } from "~@/types";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import Link from "next/link";
import {
  Spinner,
  Modal,
  ModalContent,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { convertTo12HourFormat } from "~@/utils/formatetime";
import { MdRemoveRedEye } from "react-icons/md";
import { SearchIcon } from "./Searchincon";

const AdminAllBookingListComponent = () => {
  const [userBookingList, setBookingList] = useState<IuserBookingListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchUserBookingList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(
          endPoints.Admin.allbookinglistforadmin,
        );
        if (response?.data?.statusCode === 200) {
          setBookingList(response?.data?.data as IuserBookingListType[]);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBookingList = userBookingList.filter((booking) => {
    return (
      booking.renterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.renterPhone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-white px-2 dark:bg-slate-900 lg:px-10">
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <h1 className="my-10 text-center text-xl font-semibold text-black dark:text-white">
            All Booking List
          </h1>
          <div className="mx-auto my-3 flex w-[50%] items-center justify-center">
            <Input
              label="Search"
              isClearable
              radius="lg"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
              }
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="hidden lg:inline">
            <div className="my-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-500 dark:bg-gray-700 dark:text-white">
              <p className="col-span-1 text-center text-black dark:text-white">Trip No</p>
              <p className="col-span-2 text-center text-black dark:text-white">Name</p>
              <p className="col-span-2 text-center text-black dark:text-white">Phone</p>
              <p className="col-span-2 text-center text-black dark:text-white">PickUp time</p>
              <p className="col-span-1 text-center text-black dark:text-white">Status</p>
              <p className="col-span-3 text-center text-black dark:text-white">Pick Up Address</p>
              <p className="col-span-1 text-center text-black dark:text-white">Action</p>
            </div>
            <div className="my-4">
              {filteredBookingList.length > 0 ? (
                filteredBookingList.map((data, index) => (
                  <div
                    key={index}
                    className="mb-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <p className="col-span-1 text-center text-black dark:text-white">{index + 1}</p>
                    <p className="col-span-2 text-center text-black dark:text-white">{data?.renterName}</p>
                    <p className="col-span-2 text-center text-black dark:text-white">{data?.renterPhone}</p>
                    <p className="col-span-2 text-center text-black dark:text-white">
                      {data?.pickupDate.slice(0, 10)} {convertTo12HourFormat(data?.pickuptime)}
                    </p>
                    {data?.status === "pending" ? (
                      <p className="col-span-1 text-center text-blue-500">{data?.status}</p>
                    ) : (
                      <p className="col-span-1 text-center text-green-500">{data?.status}</p>
                    )}
                    <Link
                      target="_blank"
                      href={data?.pickuplocationMapLink}
                      className="col-span-3 cursor-pointer text-center text-black dark:text-white"
                    >
                      {data?.pickuplocationAdress}
                    </Link>
                    <div className="col-span-1 text-center text-black dark:text-white">
                      <button onClick={onOpen} title="view" type="button">
                        <MdRemoveRedEye />
                      </button>
                      <Modal
                        backdrop="transparent"
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="auto"
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <h1 className="my-3 text-center text-xl font-semibold text-black dark:text-white">
                                Booking Information
                              </h1>
                              <div className="flex items-center justify-center">
                                {/* <Image src={SelectedCarData?.image} alt={SelectedCarData?.Carname} height={200} width={200} /> */}
                              </div>
                              {/* <div className="grid grid-cols-2 gap-1 rounded-lg border p-2">
                                <p className="text-black dark:text-white">Name:</p>
                                <p className="text-black dark:text-white">{name}</p>
                                <p className="text-black dark:text-white">Phone:</p>
                                <p className="text-black dark:text-white">{phone}</p>
                                <p className="text-black dark:text-white">Car Name:</p>
                                <p className="text-black dark:text-white">{SelectedCarData.Carname}</p>
                                <p className="text-black dark:text-white">Pickup Address:</p>
                                <p className="text-black dark:text-white">{pickupAddress}</p>
                                <p className="text-black dark:text-white">Drop Off Address:</p>
                                <p className="text-black dark:text-white">{dropoffAddress}</p>
                                <p className="text-black dark:text-white">PickUp Time & Date:</p>
                                <p className="text-black dark:text-white">{pickuptime}, {pickupdate}</p>
                                <p className="text-black dark:text-white">Total Fare Price:</p>
                                <p className="text-black dark:text-white">{TotalFarePriceCalculationBymilesandhours} $</p>
                              </div>
                              <div className="flex w-full items-center justify-center my-3">
                                <Button
                                  className="mt-5 w-[80%] lg:w-[50%]"
                                  color="success"
                                  onPress={handleCreateBooking}
                                  isDisabled={!name || !phone || !pickupdate || !pickuptime}
                                >
                                  <span className="text-white text-lg">{isBooking ? <Spinner color="primary" /> : "Confirm Booking"}</span>
                                </Button>
                              </div> */}
                              {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                  Close
                                </Button>
                              </ModalFooter> */}
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                ))
              ) : (
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-xl font-semibold text-red-600">
                    No Booking Data Available!
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="inline lg:hidden">
            <div className="grid grid-cols-1 text-black dark:text-white md:grid-cols-2 md:gap-2">
              {filteredBookingList.length > 0 ? (
                filteredBookingList.map((data, index) => (
                  <div key={index} className="mb-3 grid grid-cols-12 rounded-md border dark:border-slate-800">
                    <div className="col-span-4 flex flex-col gap-3 border-r px-2 py-2 text-sm dark:border-slate-800">
                      <p className="text-black dark:text-white">Name:</p>
                      <p className="text-black dark:text-white">Phone:</p>
                      <p className="text-black dark:text-white">Pickup Address:</p>
                      <p className="text-black dark:text-white">Pickup Date:</p>
                      <p className="text-black dark:text-white">Status:</p>
                    </div>
                    <div className="col-span-8 flex flex-col gap-2 py-2 pl-2 text-sm">
                      <p className="text-black dark:text-white">{data?.renterName}</p>
                      <p className="text-black dark:text-white">{data?.renterPhone}</p>
                      <p className="text-black dark:text-white">{data?.pickuplocationAdress}</p>
                      <p className="text-black dark:text-white">{data?.pickupDate.slice(0, 10)}, {convertTo12HourFormat(data?.pickuptime)}</p>
                      {data?.status === "pending" ? (
                        <p className="text-green-500">{data?.status}</p>
                      ) : (
                        <p className="text-blue-500">{data?.status}</p>
                      )}
                      <div className="text-center text-black dark:text-white">
                        <button title="view" type="button">
                          <MdRemoveRedEye />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-xl font-semibold text-red-600">
                    No Booking Data Available!
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllBookingListComponent;
