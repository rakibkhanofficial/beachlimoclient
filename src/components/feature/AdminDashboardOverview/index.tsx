import { Card, CardBody, Skeleton } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import CountUp from "react-countup";

const CompleteBookingCharts = dynamic(() => import("./CompleteBookingChart"), {
  ssr: false,
});

const AdminDashbaordOverView = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className=" flex flex-col gap-5 bg-white text-black dark:bg-black dark:text-white p-4 ">
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-4 ">
        <Card className="w-full bg-[#519921] px-2 py-8 text-white shadow-md shadow-[#afafaf] dark:shadow-slate-700 ">
          <CardBody>
            {loading ? (
              <div className=" flex items-center justify-between ">
                <div>
                  <Skeleton className="mb-2 h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className=" grid grid-cols-2 items-center justify-center gap-2 lg:grid-cols-1 2xl:grid-cols-2 ">
                <div className=" text-start text-xl font-semibold lg:text-center 2xl:text-start ">
                  Total Complete Booking
                </div>
                <div className=" text-end text-5xl font-bold lg:text-center 2xl:text-end ">
                  <CountUp start={0} end={10} duration={4} delay={1} />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="w-full bg-[#ad6326] px-2 py-8 text-white shadow-md shadow-[#afafaf] dark:shadow-slate-700 ">
          <CardBody>
            {loading ? (
              <div className=" flex items-center justify-between ">
                <div>
                  <Skeleton className="mb-2 h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className=" grid grid-cols-2 items-center justify-center gap-2 lg:grid-cols-1 2xl:grid-cols-2 ">
                <div className=" text-start text-xl font-semibold lg:text-center 2xl:text-start ">
                  Total Assigned Booking
                </div>
                <div className=" text-end text-5xl font-bold lg:text-center 2xl:text-end ">
                  <CountUp start={0} end={20} duration={4} delay={1} />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="w-full bg-[#f50000] px-2 py-8 text-white shadow-md shadow-[#afafaf] dark:shadow-slate-700 ">
          <CardBody>
            {loading ? (
              <div className=" flex items-center justify-between ">
                <div>
                  <Skeleton className="mb-2 h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className=" grid grid-cols-2 items-center justify-center gap-2 lg:grid-cols-1 2xl:grid-cols-2 ">
                <div className=" text-start text-xl font-semibold lg:text-center 2xl:text-start ">
                  Total Canceled Booking
                </div>
                <div className=" text-end text-5xl font-bold lg:text-center 2xl:text-end ">
                  <CountUp start={0} end={30} duration={4} delay={1} />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="w-full bg-[#0072F5] px-2 py-8 text-white shadow-md shadow-[#afafaf] dark:shadow-slate-700 ">
          <CardBody>
            {loading ? (
              <div className=" flex items-center justify-between ">
                <div>
                  <Skeleton className="mb-2 h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className=" grid grid-cols-2 items-center justify-center gap-2 lg:grid-cols-1 2xl:grid-cols-2 ">
                <div className=" text-start text-xl font-semibold lg:text-center 2xl:text-start ">
                  Total Pending Booking
                </div>
                <div className=" text-end text-5xl font-bold lg:text-center 2xl:text-end ">
                  <CountUp start={0} end={40} duration={4} delay={1} />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <div className=" my-4 border border-gray-300 rounded-lg">
        <CompleteBookingCharts />
      </div>
    </div>
  );
};

export default AdminDashbaordOverView;