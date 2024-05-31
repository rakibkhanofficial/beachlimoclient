import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IuserBookingListType } from "~@/types";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const BookingListComponent = () => {
  const [userBookingList, setBookingList] = useState<IuserBookingListType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
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
  }, [session?.user?._id]);

  console.log(userBookingList);

  return (
    <div className=" min-h-screen bg-white px-10 dark:bg-slate-900">
      <h1 className=" my-10 text-center text-xl font-semibold text-black dark:text-white">
        All Booking List
      </h1>
      <div className=" my-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-500 dark:bg-gray-700 dark:text-white">
        <p className=" col-span-2 text-black dark:text-white">trip No</p>
        <p className=" col-span-2 text-black dark:text-white">Name</p>
        <p className=" col-span-2 text-black dark:text-white">Phone</p>
        <p className=" col-span-2 text-black dark:text-white">PickUp time</p>
        <p className=" col-span-2 text-black dark:text-white">Adress</p>
        <p className=" col-span-2 text-black dark:text-white">Status</p>
      </div>
      <div className=" my-4">
        {userBookingList.length > 0 ? (
          userBookingList?.map((data, index) => (
            <div
              key={index}
              className=" mb-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <p className=" col-span-2 text-black dark:text-white">
                {index + 1}
              </p>
              <p className=" col-span-2 text-black dark:text-white">
                {data?.renterName}
              </p>
              <p className=" col-span-2 text-black dark:text-white">
                {data?.renterPhone}
              </p>
              <p className=" col-span-2 text-black dark:text-white">
                {data?.pickupDate.slice(0, 10)}
              </p>
              <Link
                target="_blank"
                href={data?.pickuplocationMapLink}
                className=" col-span-2 cursor-pointer text-black dark:text-white"
              >
                {data?.pickuplocationAdress}
              </Link>
              {data?.status === "pending" ? (
                <p className=" col-span-2 text-green-500">{data?.status}</p>
              ) : (
                <p className=" col-span-2 text-blue-500">{data?.status}</p>
              )}
            </div>
          ))
        ) : (
          <div className=" min-h-screen text-xl font-semibold text-red-600 ">
            No Booking Data Aailable Please Book your car!
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingListComponent;
