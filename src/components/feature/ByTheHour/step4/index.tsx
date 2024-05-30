import React from "react";
// import lottie, { type AnimationItem } from "lottie-web"; // Import AnimationItem
// import Successlottie from "../Success.json";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useAppDispatch } from "~@/_redux/hooks/hooks";
import { handleCitytocityStepNext } from "~@/modules/servicemodule/_redux/actions/citytocityActions";
import CarAnimation from "./CarAnimation";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";

const CarBookingBycitytovitySucessFull = () => {
  // const animationContainer = useRef<HTMLDivElement>(null);
  // const animationInstance = useRef<AnimationItem | null>(null); // Adjust the type here
  // const parentContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   animationInstance.current = lottie.loadAnimation({
  //     container: animationContainer.current!,
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: Successlottie,
  //     // Add width and height properties here
  //     rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice", // Adjust this according to your needs
  //       progressiveLoad: true,
  //     },
  //     // Adjust the width and height values as per your requirement
  //   });

  //   return () => {
  //     // Cleanup function to stop animation when component unmounts
  //     if (animationInstance.current) {
  //       animationInstance.current.destroy();
  //     }
  //   };
  // }, []);

  const handleNext = () => {
    router.push("/");
    dispatch(handleCitytocityStepNext(0));
  };

  const handleGotodashboard = () => {
    router.push("/userdashboard");
    dispatch(handleCitytocityStepNext(0));
  };

  return (
    <div className=" m-5 rounded p-2 lg:p-4">
      {/* <div>
        <Divider />
      </div> */}
      <div className=" flex min-h-[65vh] flex-col items-center justify-center ">
        <div className="h-[250px] w-[350] lg:w-[450px]">
          <CarAnimation />
        </div>
        <div className=" flex flex-col items-center justify-center ">
          <p className=" py-2 text-center text-base font-semibold text-gray-600 dark:text-gray-200 ">
            Car Booking Successfull
          </p>
          <p className=" w-[80%] pb-2 text-center text-sm text-gray-500 dark:text-gray-200 ">
            Congratulations Your Car Booking has been created succesfully. Click
            on button to continue
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center py-2 ">
          <Button
            onClick={handleGotodashboard}
            value="large"
            color="secondary"
            className=" my-2 h-10 text-sm font-semibold "
          >
            <span>Go to Dashbaord</span>
            <span>
              <MdOutlineDashboard />
            </span>
          </Button>
          <Button
            onClick={handleNext}
            value="large"
            color="primary"
            className=" my-2 h-10 text-sm font-semibold"
          >
            <span>Back to Home</span>{" "}
            <span>
              <MdOutlineHome />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarBookingBycitytovitySucessFull;
