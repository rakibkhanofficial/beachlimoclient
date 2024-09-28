import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getMethod } from "~@/utils/api/getMethod";
import { endPoints } from "~@/utils/api/route";
import ChartComponent from "~@/components/elements/CustomChart";

export type completeBookingchartType = {
  id: number;
  day: string;
  count: number;
};

const CompleteBookingChart = () => {
  const [loading, setLoading] = useState<boolean>(false);


  const monthlySalesData = [
    { x: "Jan", y: 5000 },
    { x: "Feb", y: 6200 },
    { x: "Mar", y: 7800 },
    { x: "Apr", y: 5500 },
    { x: "May", y: 6800 },
    { x: "Jun", y: 7400 },
  ];

  const pieDonutData = {
    labels: ["Category A", "Category B", "Category C"],
    values: [30, 40, 30],
  };

  return (
    <div className="w-full lg:flex">
      <ChartComponent
        loading={loading}
        data={monthlySalesData}
        pieDonutData={pieDonutData}
        type="area"
        title="Monthly Sales Performance"
        xAxisTitle="Month"
        yAxisTitle="Sales ($)"
      />
      <ChartComponent
        loading={loading}
        data={monthlySalesData}
        pieDonutData={pieDonutData}
        type="pie"
        title="Monthly Sales Performance"
        xAxisTitle="Month"
        yAxisTitle="Sales ($)"
      />
    </div>
  );
};

export default CompleteBookingChart;
