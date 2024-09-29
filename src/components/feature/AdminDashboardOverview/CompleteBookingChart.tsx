import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import ChartComponent from "~@/components/elements/CustomChart";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

// Type for monthlyBookingData
type MonthlyBookingData = { x: string; y: number };

// Type for pieDonutData
type PieDonutData = {
  labels: string[];
  values: number[];
};

const CompleteBookingChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [monthlyBookingData, setMonthlyBookingData] = useState<
    MonthlyBookingData[]
  >([]);
  const [pieDonutData, setPieDonutData] = useState<PieDonutData>(
    {} as PieDonutData,
  );
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const fetchBookingData = async () => {
      try {
        const response = await getMethod(endPoints.Admin.getBookingData);
        if (response?.data?.statusCode === 200) {
          setMonthlyBookingData(response?.data?.data?.monthlyBookingData);
          setPieDonutData(response?.data?.data?.pieDonutData);
          setTotalBookings(response?.data?.data?.totalBookings);
          setTotalRevenue(response?.data?.data?.totalRevenue);
        }
      } catch (error) {
        console.error("Error fetching booking data: ", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchBookingData();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h1 className="text-3xl">Total Bookings</h1>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold">{totalBookings}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h1 className="text-3xl">Total Revenue</h1>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold">${totalRevenue}</p>
          </CardBody>
        </Card>
      </div>
      <div className="w-full lg:flex">
        <ChartComponent
          loading={loading}
          data={monthlyBookingData}
          pieDonutData={pieDonutData}
          type="area"
          title="Monthly Booking Performance"
          xAxisTitle="Month"
          yAxisTitle="Booking ($)"
        />
        <ChartComponent
          loading={loading}
          data={monthlyBookingData}
          pieDonutData={pieDonutData}
          type="pie"
          title="Monthly Booking By Service Type"
          xAxisTitle="Month"
          yAxisTitle="Booking ($)"
        />
      </div>
    </div>
  );
};

export default CompleteBookingChart;
