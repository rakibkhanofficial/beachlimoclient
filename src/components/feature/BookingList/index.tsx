import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IuserBookingListType } from "~@/types";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { convertTo12HourFormat } from "~@/utils/formatetime";

const BookingListComponent = () => {
  const [userBookingList, setBookingList] = useState<IuserBookingListType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    // @ts-expect-error type error is not solved
    const UserId = session?.user?._id;
    const fetchUserBookingList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(
          endPoints.Customer.getRentAllByuserId(UserId),
        );
        if (response?.data?.statusCode === 200) {
          setBookingList(response?.data?.rentals as IuserBookingListType[]);
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
    if (UserId) {
      void fetchUserBookingList();
    }
    // @ts-expect-error type error is not solved
  }, [session?.user?._id]);

  console.log(userBookingList);

  return (
    <div className=" min-h-screen bg-white px-4 dark:bg-slate-900 lg:px-10">
      {isLoading === true ? (
        <div className=" flex min-h-screen items-center justify-center ">
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <h1 className=" my-10 text-center text-xl font-semibold text-black dark:text-white">
            All Booking List
          </h1>
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
              <p className=" col-span-4 text-center text-black dark:text-white">
                Pick Up Adress
              </p>
            </div>
            <div className=" my-4">
              {userBookingList.length > 0 ? (
                userBookingList?.map((data, index) => (
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
                    {data?.status === "pending" ? (
                      <p className=" col-span-1 text-center text-green-500">
                        {data?.status}
                      </p>
                    ) : (
                      <p className=" col-span-1 text-center text-blue-500">
                        {data?.status}
                      </p>
                    )}
                    <Link
                      target="_blank"
                      href={data?.pickuplocationMapLink}
                      className=" col-span-4 cursor-pointer text-center text-black dark:text-white"
                    >
                      {data?.pickuplocationAdress}
                    </Link>
                  </div>
                ))
              ) : (
                <div className=" min-h-screen text-xl font-semibold text-red-600 ">
                  No Booking Data Aailable Please Book your car!
                </div>
              )}
            </div>
          </div>
          <div className=" inline lg:hidden ">
            <div className=" grid grid-cols-1 text-black dark:text-white md:grid-cols-2 md:gap-2 ">
              {userBookingList.length > 0 ? (
                userBookingList?.map((data, index) => (
                  <div
                    key={index}
                    className=" mb-3 grid grid-cols-12 rounded-md border "
                  >
                    <div className=" col-span-4 flex flex-col gap-2 border-r px-2 py-2 text-sm ">
                      <p>Name:</p>
                      <p>Phone:</p>
                      <p>Pickup Adress:</p>
                      <p>Pickup Date:</p>
                      <p>Status:</p>
                    </div>
                    <div className=" col-span-8 flex flex-col gap-2 py-2 pl-2 text-sm ">
                      <p>{data?.renterName}</p>
                      <p>{data?.renterPhone}</p>
                      <p>{data?.pickuplocationAdress}</p>
                      <p>{convertTo12HourFormat(data?.pickupDate)}</p>
                      {data?.status === "pending" ? (
                        <p className=" text-green-500">{data?.status}</p>
                      ) : (
                        <p className=" text-blue-500">{data?.status}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className=" min-h-screen text-xl font-semibold text-red-600 ">
                  No Booking Data Aailable Please Book your car!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingListComponent;
