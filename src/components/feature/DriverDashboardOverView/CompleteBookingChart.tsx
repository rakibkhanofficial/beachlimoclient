import React, { useEffect, useState } from "react";
import Chart, { type Props } from "react-apexcharts";
import { Skeleton } from "@nextui-org/react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import { formatDate } from "~@/utils/formatdate";
import { useSession } from "next-auth/react";

export type completeBookingchartType = {
  id: number;
  day: string;
  count: number;
};

const CompleteBookingChart = () => {
  const { data: session } = useSession();
  const [completeBookingcount, setCompleteBookingcount] = useState<completeBookingchartType[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // @ts-expect-error type error is not solved
    const DriverId = session?.user?._id;
    const fetchDailyCompleteBookingycount = async () => {
      try {
        setLoading(true);
        const response = await getMethod(
          endPoints.Driver.getCompleteBookingDaily(DriverId),
        );
        const responseData = response?.data?.data as completeBookingchartType[];
        setCompleteBookingcount(responseData);
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

   void fetchDailyCompleteBookingycount();
   // @ts-expect-error type error is not solved
  }, [session?.user?._id]);

  const seriesData = completeBookingcount?.map((item) => item.count);
  const categoriesxaxis = completeBookingcount?.length;
  // const indexArray = [...Array(categoriesxaxis)]?.map((_, index) => index + 1);
  const DateArray = completeBookingcount?.map((item, index) => formatDate(item?.day))
  
  const state: Props["series"] = [
    {
      data: seriesData,
    },
  ];

  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        easing: "linear",
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      fontFamily: "Inter, sans-serif",
      foreColor: "red",
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: DateArray,
      labels: {
        style: {
          colors: "green",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: {
        color: "gray",
      },
      axisTicks: {
        color: "blue",
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "Blue",
          fontFamily: "Inter, sans-serif",
        },
      },
    },

    tooltip: {
      enabled: false,
    },

    subtitle: {
      align: "center",
    },

    grid: {
      show: true,
      borderColor: "gray",
      strokeDashArray: 0,
      position: "back",
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["green"],
      },
    },
  };

  return (
    <>
      <div>
        <div id="chart">
          {loading ? (
            <div>
              <Skeleton className="mb-2 h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-3/5 rounded-lg" />
            </div>
          ) : (
            <div>
              <Chart
                options={options}
                series={state}
                type="area"
                height={425}
              />
              <h1 className=" text-center ">
                Complete Booking Last {categoriesxaxis} Days
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompleteBookingChart;
