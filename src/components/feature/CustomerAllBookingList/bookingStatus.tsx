import React from "react";
import { CgSandClock } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FcProcess } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";

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
      case "pending":
        percentage = 1;
        currentStep = 1;
        break;
      case "accepted":
        percentage = 33;
        currentStep = 2;
        break;
      case "assigned":
        percentage = 66;
        currentStep = 3;
        break;
      case "complete":
        percentage = 100;
        currentStep = 4;
        break;
      case "canceled":
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
    <div className="rounded-lg bg-gray-100 p-5 text-black shadow-md">
      {bookingStatus ? (
        <div className="relative mb-6 flex w-full items-center justify-between">
          <div className="absolute h-1 w-full bg-gray-300"></div>
          <div
            className={`absolute h-1 ${bookingStatus === "canceled" ? "bg-red-500" : "bg-green-600"}`}
            style={{
              width: `${stepInfo.percentage}%`,
            }}
          ></div>
          {["pending", "accepted", "assigned", "complete"].map(
            (status, stepIndex) => (
              <div
                key={stepIndex}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${stepIndex <= stepInfo.stepIndex ? (bookingStatus === "canceled" ? "bg-red-500 text-white" : "bg-blue-500 text-white") : "bg-gray-300 text-gray-500"}`}
                >
                  {stepIndex === stepInfo.stepIndex && (
                    <>
                      {bookingStatus === "pending" && (
                        <CgSandClock fontSize={20} />
                      )}
                      {bookingStatus === "accepted" && (
                        <FcProcess fontSize={20} />
                      )}
                      {bookingStatus === "assigned" && (
                        <CiCircleCheck fontSize={20} />
                      )}
                      {bookingStatus === "complete" && (
                        <FcShipped fontSize={20} />
                      )}
                      {bookingStatus === "canceled" && (
                        <MdOutlineCancel fontSize={20} />
                      )}
                    </>
                  )}
                </div>
                <span className="text-xs">{status}</span>
              </div>
            ),
          )}
        </div>
      ) : (
        <div>No Booking status available.</div>
      )}
    </div>
  );
};

export default BookingStatus;
