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
  Button,
  ModalBody,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import { convertTo12HourFormat } from "~@/utils/formatetime";
import { MdRemoveRedEye } from "react-icons/md";
import { putMethod } from "~@/utils/api/putMethod";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { SearchIcon } from "~@/components/elements/searchIcon/Searchincon";

const DriverAssignBookingListComponent = () => {
  const [userBookingList, setBookingList] = useState<IuserBookingListType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rentid, setRentId] = useState<string>("");
  const [isupdateStatus, setIsUpdateStatus] = useState<boolean>(false);
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // @ts-expect-error type error is not solved
    const UserId = session?.user?._id;
    const fetchUserBookingList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(
          endPoints.Driver.getAssignBookingList(UserId),
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
  }, [isupdateStatus]);

  const handleOpenModal = (index: number) => {
    onOpen();
    const seleteddata = userBookingList[index];
    setRentId(seleteddata?._id);
  };

  const handleStatusChange = async (status: string) => {
    setIsUpdateStatus(true);
    try {
      const response = await putMethod({
        route: endPoints?.Driver.updateStatusByDriver(rentid),
        updateData: {
          status: status,
        },
      });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        onOpenChange();
        setIsUpdateStatus(false);
      } else {
        toast.error(response?.data?.message);
        setIsUpdateStatus(false);
      }
    } catch (error) {
      // @ts-expect-error type error is not solved
      toast.error(error?.response?.data?.message);
      setIsUpdateStatus(false);
    }
  };

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
    <div className=" min-h-screen bg-white px-2 dark:bg-slate-900 lg:px-10">
      {isLoading === true ? (
        <div className=" flex min-h-screen items-center justify-center ">
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <h1 className=" my-10 text-center text-xl font-semibold text-black dark:text-white">
            Assign Booking List
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
          <div className=" hidden lg:inline ">
            <div className=" my-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-500 dark:bg-gray-700 dark:text-white">
              <p className=" col-span-1 text-center text-black dark:text-white">
                trip No
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                Name
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                Phone
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                PickUp time
              </p>
              <p className=" col-span-1 text-center text-black dark:text-white">
                Status
              </p>
              <p className=" col-span-3 text-center text-black dark:text-white">
                Pick Up Adress
              </p>
              <p className=" col-span-1 text-center text-black dark:text-white">
                Action
              </p>
            </div>
            <div className=" my-4">
              {filteredBookingList.length > 0 ? (
                filteredBookingList?.map((data, index) => (
                  <div
                    key={index}
                    className=" mb-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <p className=" col-span-1 text-center text-black dark:text-white">
                      {index + 1}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.renterName}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.renterPhone}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.pickupDate.slice(0, 10)}{" "}
                      {convertTo12HourFormat(data?.pickuptime)}
                    </p>
                    <p className=" col-span-1 text-center text-blue-500">
                      {data?.status}
                    </p>
                    <Link
                      target="_blank"
                      href={data?.pickuplocationMapLink}
                      className=" col-span-3 cursor-pointer text-center text-black dark:text-white"
                    >
                      {data?.pickuplocationAdress}
                    </Link>
                    <div className=" col-span-1 text-center text-black dark:text-white">
                      <button
                        onClick={() => handleOpenModal(index)}
                        title="view"
                        type="button"
                      >
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
                              <ModalBody>
                                <div className=" my-5 flex w-full flex-col px-5 ">
                                  <h1 className=" my-3 text-center text-xl font-semibold ">
                                    Complete Booking
                                  </h1>
                                  <div className=" flex items-center justify-center gap-5 ">
                                    <Button
                                      onClick={() =>handleStatusChange("cancel")}
                                      className=" rounded-lg bg-red-600 text-white hover:bg-green-700 "
                                    >
                                      {isupdateStatus ? (
                                        <Spinner color="primary" />
                                      ) : (
                                        "Cancel Ride"
                                      )}
                                    </Button>
                                    <Button
                                      onClick={() => handleStatusChange("complete")}
                                      className=" rounded-lg bg-green-600 text-white hover:bg-green-700 "
                                    >
                                      {isupdateStatus ? (
                                        <Spinner color="primary" />
                                      ) : (
                                        "Complete Ride"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" flex min-h-screen items-center justify-center ">
                  <h1 className=" text-center text-xl font-semibold text-red-600 ">
                    No Booking Data!
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className=" inline lg:hidden ">
            <div className=" grid grid-cols-1 text-black dark:text-white md:grid-cols-2 md:gap-2 ">
              {userBookingList.length > 0 ? (
                userBookingList?.map((data, index) => (
                  <div>
                    <div
                      key={index}
                      className=" mb-3 grid grid-cols-12 rounded-md border dark:border-slate-800 "
                    >
                      <div className=" col-span-4 flex flex-col gap-3 border-r px-2 py-2 text-sm dark:border-slate-800 ">
                        <p className=" text-black dark:text-white">Name:</p>
                        <p className=" text-black dark:text-white">Phone:</p>
                        <p className=" text-black dark:text-white">
                          Pickup Adress:
                        </p>
                        <p className=" text-black dark:text-white">
                          Pickup Date:
                        </p>
                        <p className=" text-black dark:text-white">Status:</p>
                      </div>
                      <div className=" col-span-8 flex flex-col gap-2 py-2 pl-2 text-sm ">
                        <p className=" text-black dark:text-white">
                          {data?.renterName}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.renterPhone}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.pickuplocationAdress}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.pickupDate.slice(0, 10)},{" "}
                          {convertTo12HourFormat(data?.pickuptime)}
                        </p>
                        <p className=" text-blue-500">{data?.status}</p>
                        <div className="text-center text-black dark:text-white">
                          <button
                            onClick={() => handleOpenModal(index)}
                            title="view"
                            type="button"
                          >
                            <MdRemoveRedEye />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" flex min-h-screen items-center justify-center ">
                  <h1 className=" text-center text-xl font-semibold text-red-600 ">
                    No Assign Booking Aailable
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

export default DriverAssignBookingListComponent;