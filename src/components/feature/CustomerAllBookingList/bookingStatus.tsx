import React from "react";
import CarRunningAnimation from "./CarAnimation";
import ZeepCarRunningAnimation from "./jeepcaranimation";
interface StepInfo {
  stepIndex: number;
  percentage: number;
  currentStep: number;
}

type BookingStatusType = {
  bookingStatus: string;
};

const BookingStatus = ({ bookingStatus }: BookingStatusType) => {
  const mapOrderStatusToStep = (status: string): StepInfo => {
    let percentage = 0;
    let currentStep = 0;

    switch (status) {
      case "Pending":
        percentage = 0;
        currentStep = 1;
        break;
      case "Accepted":
        percentage = 33.33;
        currentStep = 2;
        break;
      case "Assigned":
        percentage = 66.66;
        currentStep = 3;
        break;
      case "Complete":
        percentage = 100;
        currentStep = 4;
        break;
      case "Canceled":
        percentage = 100;
        currentStep = 4;
        break;
      default:
        percentage = 0;
        currentStep = 0;
    }

    return {
      stepIndex: currentStep,
      percentage,
      currentStep,
    };
  };

  const stepInfo = mapOrderStatusToStep(bookingStatus);

  return (
    <div className="rounded-lg bg-gray-50 p-5 text-black shadow-sm dark:bg-zinc-800 dark:text-white">
      {bookingStatus ? (
        <div>
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute h-1 w-full bg-gray-300"></div>
            <div
              className={`absolute h-1 ${bookingStatus === "canceled" ? "bg-red-500" : "bg-green-600"}`}
              style={{
                width: `${stepInfo.percentage}%`,
              }}
            ></div>
            {["Pending", "Accepted", "Assigned", "Complete"].map(
              (status, stepIndex) => (
                <div
                  key={stepIndex}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className={`mb-2 flex h-14 w-14 items-center justify-center ${stepIndex <= stepInfo.stepIndex ? (bookingStatus === "canceled" ? "bg-red-500 text-white" : " text-white") : ""}`}
                  >
                    {bookingStatus === status && (
                      <div>
                        <CarRunningAnimation />
                      </div>
                    )}
                  </div>
                  <span className="text-xs">{status}</span>
                </div>
              ),
            )}
          </div>

          <div className=" mx-auto flex h-[200px] w-[320px] items-center justify-center ">
            <ZeepCarRunningAnimation />
          </div>
        </div>
      ) : (
        <div>No Booking status available.</div>
      )}
    </div>
  );
};

export default BookingStatus;
