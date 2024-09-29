import React, { useEffect, useState } from "react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import ChartComponent from "~@/components/elements/CustomChart";

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

  useEffect(() => {
    setLoading(true);
    const fetchBookingData = async () => {
      try {
        const response = await getMethod(endPoints.Admin.getBookingData);
        if (response?.data?.statusCode === 200) {
          setMonthlyBookingData(response?.data?.data?.monthlyBookingData);
          setPieDonutData(response?.data?.data?.pieDonutData);
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
  );
};

export default CompleteBookingChart;
