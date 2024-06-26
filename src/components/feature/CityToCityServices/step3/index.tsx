import {
  Button,
  Input,
  TimeInput,
  DatePicker,
  Modal,
  ModalContent,
  // ModalBody,
  // ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { handleCitytoCityInputChange } from "~@/modules/servicemodule/_redux/actions/citytocityActions";

type selectedCarType = {
  id: number;
  Carname: string;
  image: string;
  Model: string;
  perMilePrice: number;
  childSeat: boolean;
  perhourPrice: number;
  passenger: number;
  Luggage: number;
  totalseat: number;
  isWifi: boolean;
};

const CitytocityOtherInformation = () => {
  const {data: session} = useSession();
  const dispatch = useAppDispatch();
  const {
    handleCreateBooking,
    handleInputChange,
    name,
    phone,
    pickupdate,
    pickuptime,
    isBooking,
    pickupAddress,
    dropoffAddress,
    FarePriceCalculationBymiles,
  } = UseCityToCity();
  const SelectedCarData: selectedCarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (session?.user){
      // @ts-expect-error type error is not solved
      dispatch(handleCitytoCityInputChange("name", session?.user?.username));
      // @ts-expect-error type error is not solved
      dispatch(handleCitytoCityInputChange("phone", session?.user?.phone));
    }
  },[session,dispatch])

  return (
    <div className=" my-5 w-full p-2 lg:p-5  ">
      <div className=" flex flex-col items-center justify-center">
        <h1 className=" my-5 text-center text-xl font-semibold  ">
          Type This Iformation For booking
        </h1>
        <div className=" flex w-full flex-col gap-3 rounded-xl border border-slate-700 px-4 py-6 lg:w-[60%] ">
          <Input
            placeholder="Enter Name"
            label="name"
            className=" rounded-xl "
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Enter Phone"
            label="phone"
            inputMode="numeric"
            className=" rounded-xl "
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          <Input
            value={pickupdate}
            placeholder="Select Date"
            label="Date"
            type="date"
            className=" rounded-xl "
            onChange={(e) => handleInputChange("pickupdate", e.target.value)}
          />
          <Input
            value={pickuptime}
            placeholder="Select Date"
            label="Time"
            type="time"
            className=" rounded-xl "
            onChange={(e) => handleInputChange("pickuptime", e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <Button
            className="mt-5 w-[80%] lg:w-[50%]"
            color="success"
            onPress={onOpen}
            isDisabled={!name || !phone || !pickupdate || !pickuptime}
          >
            <span className="text-white">Next</span>
            <span className="text-white">
              <MdArrowForwardIos />
            </span>
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
            <ModalContent>
              {(onClose) => (
                <>
                  <h1 className=" my-3 text-center text-xl font-semibold text-black dark:text-white ">
                    Booking Information
                  </h1>
                  <div className="flex items-center justify-center">
                    <Image
                      src={SelectedCarData?.image}
                      alt={SelectedCarData?.Carname}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className=" grid grid-cols-2 gap-1 rounded-lg border p-2 ">
                    <p className=" text-black dark:text-white ">Name:</p>
                    <p className=" text-black dark:text-white ">{name}</p>
                    <p className=" text-black dark:text-white ">Phone:</p>
                    <p className=" text-black dark:text-white ">{phone}</p>
                    <p className=" text-black dark:text-white ">Car Name:</p>
                    <p className=" text-black dark:text-white ">
                      {SelectedCarData.Carname}
                    </p>
                    <p className=" text-black dark:text-white ">
                      Pickup Address:
                    </p>
                    <p className=" text-black dark:text-white ">
                      {pickupAddress}
                    </p>
                    <p className=" text-black dark:text-white ">
                      Drop Off Address:
                    </p>
                    <p className=" text-black dark:text-white ">
                      {dropoffAddress}
                    </p>
                    <p className=" text-black dark:text-white ">
                      PickUp Time & Date:
                    </p>
                    <p className=" text-black dark:text-white ">
                      {pickuptime}, {pickupdate}
                    </p>
                    <p className=" text-black dark:text-white ">
                      Total Fare Price:
                    </p>
                    <p className=" text-black dark:text-white ">
                      {FarePriceCalculationBymiles} $
                    </p>
                  </div>
                  <div className="my-3 flex w-full items-center justify-center">
                    <Button
                      className="mt-5 w-[80%] lg:w-[50%]"
                      color="success"
                      onPress={handleCreateBooking}
                      isDisabled={!name || !phone || !pickupdate || !pickuptime}
                    >
                      <span className="text-white">
                        {isBooking ? (
                          <Spinner color="primary" />
                        ) : (
                          "Confirm Booking"
                        )}
                      </span>
                    </Button>
                  </div>
                  {/* <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter> */}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CitytocityOtherInformation;
