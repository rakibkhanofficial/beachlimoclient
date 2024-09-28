import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Switch,
} from "@nextui-org/react";
import { GoDownload } from "react-icons/go";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the chart types we'll support
type ChartType = "line" | "bar" | "pie" | "donut" | "area";

// Define the structure of our data
interface DataPoint {
  x: string | number;
  y: number;
}

interface PieDonutData {
  labels: string[];
  values: number[];
}

// Define our component props
interface ChartComponentProps {
  data: DataPoint[];
  pieDonutData?: PieDonutData;
  type: ChartType;
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  loading?: boolean;
}

const colorSchemes = {
  default: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  pastel: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA", "#FFDFBA"],
  bold: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA600", "#9B59B6"],
  vibrant: ["#FF5733", "#C70039", "#900C3F", "#FFC300", "#DAF7A6"],
  muted: ["#A9A9A9", "#696969", "#808080", "#C0C0C0", "#D3D3D3"],
  glossy: ["#00CCFF", "#FF1493", "#32CD32", "#FFD700", "#FF4500"],
  glassmorphism: [
    "rgba(255, 255, 255, 0.4)", // Translucent white
    "rgba(173, 216, 230, 0.5)", // Light blue with transparency
    "rgba(144, 238, 144, 0.5)", // Light green with transparency
    "rgba(255, 182, 193, 0.5)", // Light pink with transparency
    "rgba(255, 215, 0, 0.4)", // Gold with transparency
  ],
};

type ColorScheme = keyof typeof colorSchemes;

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  pieDonutData,
  type,
  title,
  xAxisTitle,
  yAxisTitle,
  loading = false,
}) => {
  const [chartType, setChartType] = useState<ChartType>(type);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("default");
  const [opacity, setOpacity] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showDataLabels, setShowDataLabels] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [chartTitle, setChartTitle] = useState(title);

  const getGlassmorphismColors = (baseColors: string[], opacity: number) => {
    return baseColors.map((color) => {
      const rgba = color.match(/\d+/g);
      if (rgba && rgba.length >= 3) {
        return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacity})`;
      }
      return color;
    });
  };

  const options: ApexOptions = useMemo(() => {
    const commonOptions: ApexOptions = {
      chart: {
        id: "basic-chart",
        type: chartType,
        background: darkMode ? "#1a1a1a" : "transparent",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: animationDuration,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      theme: {
        mode: darkMode ? "dark" : "light",
      },
      title: {
        text: chartTitle,
        style: {
          color: darkMode ? "#ffffff" : "#333333",
        },
      },

      colors:
        colorScheme === "glassmorphism"
          ? getGlassmorphismColors(colorSchemes[colorScheme], opacity)
          : colorSchemes[colorScheme],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: opacity,
          opacityTo: opacity,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
      dataLabels: {
        enabled: showDataLabels,
        style: {
          colors: [darkMode ? "#ffffff" : "#333333"],
        },
      },
    };

    if (chartType === "pie" || chartType === "donut") {
      return {
        ...commonOptions,
        labels: pieDonutData?.labels || [],
      };
    }

    return {
      ...commonOptions,
      xaxis: {
        title: {
          text: xAxisTitle,
        },
      },
      yaxis: {
        title: {
          text: yAxisTitle,
        },
      },
    };
  }, [
    chartType,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    colorScheme,
    opacity,
    darkMode,
    showDataLabels,
    animationDuration,
    pieDonutData,
  ]);

  const series = useMemo(() => {
    if (chartType === "pie" || chartType === "donut") {
      return pieDonutData?.values || [];
    }

    return [
      {
        name: yAxisTitle,
        data: data.map((point) => point.y),
      },
    ];
  }, [
    chartType,
    title,
    xAxisTitle,
    yAxisTitle,
    colorScheme,
    opacity,
    pieDonutData,
  ]);

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      const chart = (window as any).ApexCharts.getChartByID("basic-chart");
      if (chart) {
        chart.exportToCSV();
      }
    }
  };

  const ChartSkeleton = () => (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <Skeleton className="w-1/2 h-10 rounded-lg" />
        <Skeleton className="w-1/2 h-10 rounded-lg" />
      </div>
      <Skeleton className="w-3/4 h-4 rounded-lg" />
      <Skeleton className="w-1/2 h-3 rounded-lg" />
      <Skeleton className="w-full h-[300px] rounded-lg" />
      <div className="flex justify-between">
        <Skeleton className="w-1/4 h-3 rounded-lg" />
        <Skeleton className="w-1/4 h-3 rounded-lg" />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Card className="max-w-[800px] m-2">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-medium font-semibold leading-none text-default-600">
              {title}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">{`${xAxisTitle} vs ${yAxisTitle}`}</h5>
          </div>
        </CardHeader>
        <CardBody>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <>
              <div className="flex text-black dark:text-white gap-4 mb-4">
                <Select
                  label="Chart Type"
                  placeholder="Select chart type"
                  selectedKeys={[chartType]}
                  className="max-w-xs text-black dark:text-white"
                  onChange={(e) => setChartType(e.target.value as ChartType)}
                >
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="line"
                    value="line"
                  >
                    Line
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="bar"
                    value="bar"
                  >
                    Bar
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="pie"
                    value="pie"
                  >
                    Pie
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="donut"
                    value="donut"
                  >
                    Donut
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="area"
                    value="area"
                  >
                    Area
                  </SelectItem>
                </Select>
                <Select
                  label="Color Scheme"
                  placeholder="Select color scheme"
                  selectedKeys={[colorScheme]}
                  className="max-w-xs"
                  onChange={(e) =>
                    setColorScheme(e.target.value as ColorScheme)
                  }
                >
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="default"
                    value="default"
                  >
                    Default
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="pastel"
                    value="pastel"
                  >
                    Pastel
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="bold"
                    value="bold"
                  >
                    Bold
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="vibrant"
                    value="vibrant"
                  >
                    Vibrant
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="muted"
                    value="muted"
                  >
                    Muted
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="glossy"
                    value="glossy"
                  >
                    Glossy
                  </SelectItem>
                  <SelectItem
                    className=" text-black dark:text-white "
                    key="glassmorphism"
                    value="glassmorphism"
                  >
                    Glassmorphism
                  </SelectItem>
                </Select>
              </div>
              {colorScheme === "glassmorphism" && (
                <div className="w-full">
                  <Slider
                    label="Opacity"
                    step={0.1}
                    maxValue={1}
                    minValue={0.1}
                    value={opacity}
                    onChange={(value) => setOpacity(value as number)}
                    className="max-w-md"
                  />
                </div>
              )}
              {/* <div className="flex gap-4 items-center">
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                >
                  Dark Mode
                </Switch>
                <Switch
                  checked={showDataLabels}
                  onChange={(e) => setShowDataLabels(e.target.checked)}
                >
                  Show Data Labels
                </Switch>
              </div> */}
              <div className="w-full flex justify-end items-center">
                {/* <Slider
                  label="Animation Duration (ms)"
                  step={100}
                  maxValue={2000}
                  minValue={0}
                  value={animationDuration}
                  onChange={(value) => setAnimationDuration(value as number)}
                  className="max-w-md col-span-8"
                /> */}
                <Button
                  color="primary"
                  endContent={<GoDownload />}
                  onClick={handleDownload}
                >
                  Download CSV
                </Button>
              </div>
              {typeof window !== "undefined" && (
                <Chart
                  options={options}
                  series={series}
                  type={chartType}
                  height={350}
                />
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChartComponent;

// Usage example:
const ExampleUsage: React.FC = () => {
  const sampleData: DataPoint[] = [
    { x: "Jan", y: 30 },
    { x: "Feb", y: 40 },
    { x: "Mar", y: 35 },
    { x: "Apr", y: 50 },
    { x: "May", y: 45 },
  ];

  const pieDonutData = {
    labels: ["Category A", "Category B", "Category C"],
    values: [30, 40, 30],
  };

  return (
    <ChartComponent
      data={sampleData}
      pieDonutData={pieDonutData}
      type="line"
      title="Monthly Sales"
      xAxisTitle="Month"
      yAxisTitle="Sales ($)"
    />
  );
};
