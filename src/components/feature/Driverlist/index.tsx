import React, { useEffect, useState } from "react";
import { DriverType } from "~@/types";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";

const DriverListComponenet = () => {
  const [driverlist, setDriverList] = useState<DriverType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDriverList = async () => {
      setIsLoading(true);
      try {
        const response = await getMethod(endPoints.Admin.getAllDriverList);
        if (response?.data?.statusCode === 200) {
          setDriverList(response?.data?.data as DriverType[]);
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
    void fetchDriverList();
  }, []);

  return (
    <div className=" min-h-screen bg-white px-2 dark:bg-slate-900 lg:px-10">
      {isLoading === true ? (
        <div className=" flex min-h-screen items-center justify-center ">
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <h1 className=" my-10 text-center text-xl font-semibold text-black dark:text-white">
            Driver List
          </h1>
          <div className=" hidden lg:inline ">
            <div className=" my-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-500 dark:bg-gray-700 dark:text-white">
              <p className=" col-span-1 text-center text-black dark:text-white">
                #Sl No:
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                Name
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                Phone
              </p>
              <p className=" col-span-2 text-center text-black dark:text-white">
                email
              </p>
              <p className=" col-span-1 text-center text-black dark:text-white">
                role
              </p>
              <p className=" col-span-3 text-center text-black dark:text-white">
                Status
              </p>
              <p className=" col-span-1 text-center text-black dark:text-white">
                Pic
              </p>
            </div>
            <div className=" my-4">
              {driverlist.length > 0 ? (
                driverlist?.map((data, index) => (
                  <div
                    key={index}
                    className=" mb-2 grid grid-cols-12 rounded-md border border-gray-100 bg-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <p className=" col-span-1 text-center text-black dark:text-white">
                      {index + 1}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.username}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.phone}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.email}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.role}
                    </p>
                    <p className=" col-span-2 text-center text-black dark:text-white">
                      {data?.status}
                    </p>
                    <div className=" col-span-1 text-center text-blue-500">
                      <Image
                        alt={data?.username}
                        src={
                          data?.image
                            ? data?.image
                            : "https://i.ibb.co/dtt67mC/avathar.png"
                        }
                        width={35}
                        height={35}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className=" min-h-screen text-xl font-semibold text-red-600 ">
                  Driver Data Not Aailable
                </div>
              )}
            </div>
          </div>
          <div className=" inline lg:hidden ">
            <div className=" grid grid-cols-1 text-black dark:text-white md:grid-cols-2 md:gap-2 ">
              {driverlist.length > 0 ? (
                driverlist?.map((data, index) => (
                  <div>
                    <div
                      key={index}
                      className=" mb-3 grid grid-cols-12 rounded-md border dark:border-slate-800 "
                    >
                      <div className=" col-span-4 flex flex-col gap-3 border-r px-2 py-2 text-sm dark:border-slate-800 ">
                        <p className=" text-black dark:text-white">Name:</p>
                        <p className=" text-black dark:text-white">Phone:</p>
                        <p className=" text-black dark:text-white">
                          email
                        </p>
                        <p className=" text-black dark:text-white">
                          role
                        </p>
                        <p className=" text-black dark:text-white">Status:</p>
                      </div>
                      <div className=" col-span-8 flex flex-col gap-2 py-2 pl-2 text-sm ">
                        <p className=" text-black dark:text-white">
                          {data?.username}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.phone}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.email}
                        </p>
                        <p className=" text-black dark:text-white">
                          {data?.role}
                        </p>
                        <p className=" text-green-500">{data?.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" min-h-screen text-xl font-semibold text-red-600 ">
                  Driver Not Aailable!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverListComponenet;
