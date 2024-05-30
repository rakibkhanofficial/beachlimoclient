import {   Button,
  Input,
  TimeInput,
  DatePicker,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure, } from "@nextui-org/react";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppSelector } from "~@/_redux/hooks/hooks";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import Image from "next/image";


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
    FarePriceCalculationBymiles
  } = UseCityToCity();
  const SelectedCarData: selectedCarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            className=" rounded-xl "
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          <DatePicker
            // value={new CalendarDate(pickupdate, pickupdate, pickupdate)}
            onChange={(date) =>
              handleInputChange("pickupdate", date?.toString())
            }
            label="Pick Up Date"
            className="w-full"
          />
          <TimeInput
            // value={new Time(pickuptime, pickuptime)}
            onChange={(time) =>
              handleInputChange("pickuptime", time?.toString())
            }
            label="Pick Up Time"
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
                  <ModalBody>
                    <h1 className=" text-black dark:text-white my-3 text-center font-semibold text-xl ">Booking Information</h1>
                    <div className="flex items-center justify-center">
                      <Image
                        src={SelectedCarData?.image}
                        alt={SelectedCarData?.Carname}
                        height={200}
                        width={200}
                      />
                    </div>
                    <div className=" grid grid-cols-2 gap-1 rounded-lg border p-4 ">
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
                    <div className="flex w-full items-center justify-center">
                      <Button
                        className="mt-5 w-[80%] lg:w-[50%]"
                        color="success"
                        onPress={handleCreateBooking}
                        isDisabled={
                          !name || !phone || !pickupdate || !pickuptime
                        }
                      >
                       <span className="text-white">{isBooking ? "Booking..." : "Confirm Booking"}</span>
                      </Button >
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
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
