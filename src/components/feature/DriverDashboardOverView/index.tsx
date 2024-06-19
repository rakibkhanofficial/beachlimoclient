import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";

const CompleteBookingCharts = dynamic(() => import("./CompleteBookingChart"), {
  ssr: false,
});

type IuserBookingListType = {
  totalAssignedBookingdata: number | undefined;
  totalCompleteBookingdata: number | undefined;
  totalCanceledBookingdata: number | undefined;
};

const DriverDashboardOverview = () => {
  const { data: session } = useSession();
  const [totalBookings, setTotalBookings] = useState<
    IuserBookingListType | undefined
  >({} as IuserBookingListType);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // @ts-expect-error type error is not solved
    const UserId = session?.user?._id;
    const fetchTotalBookings = async () => {
      try {
        const response = await getMethod(
          endPoints?.Driver?.getTotalBooking(UserId),
        );
        if (response?.data?.statusCode === 200) {
          setTotalBookings(response?.data?.data as IuserBookingListType);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    void fetchTotalBookings();
    // @ts-expect-error type error is not solved
  }, [session?.user?._id]);

  return (
    <div className=" flex flex-col gap-5 bg-white p-4 text-black dark:bg-black dark:text-white ">
      <div className=" my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
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
                  <CountUp
                    start={0}
                    // @ts-expect-error type error is not solved
                    end={totalBookings?.totalCompleteBookingdata}
                    duration={4}
                    delay={1}
                  />
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
                  <CountUp
                    start={0}
                    // @ts-expect-error type error is not solved
                    end={totalBookings?.totalAssignedBookingdata}
                    duration={4}
                    delay={1}
                  />
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
                  <CountUp
                    start={0}
                    // @ts-expect-error type error is not solved
                    end={totalBookings?.totalCanceledBookingdata}
                    duration={4}
                    delay={1}
                  />
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <div className=" my-4 rounded-lg border border-gray-300">
        <CompleteBookingCharts />
      </div>
    </div>
  );
};

export default DriverDashboardOverview;
