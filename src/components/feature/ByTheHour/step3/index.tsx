import React from "react";
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
  Spinner
} from "@nextui-org/react";
import UseBytheHour from "~@/modules/servicemodule/hocs/bythehourservice/usebythehourService";
import Image from "next/image";
import { useAppSelector } from "~@/_redux/hooks/hooks";
import { MdArrowForwardIos } from "react-icons/md";

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

const OtherInformation = () => {
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
    TotalFarePriceCalculationBymilesandhours,
  } = UseBytheHour();
  const SelectedCarData: selectedCarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="my-5 w-full p-2 lg:p-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-5 text-center text-xl font-semibold">
          Type This Information For Booking
        </h1>
        <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-700 px-4 py-6 lg:w-[60%]">
          <Input
            placeholder="Enter Name"
            label="name"
            className="rounded-xl"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Enter Phone"
            inputMode="numeric"
            label="phone"
            className="rounded-xl"
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          <DatePicker
            onChange={(date) =>
              handleInputChange("pickupdate", date?.toString())
            }
            label="Pick Up Date"
            className="w-full"
          />
          <TimeInput
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
            <span className="text-white text-lg">Next</span>
            <span className=" text-white text-lg ">
              <MdArrowForwardIos />
            </span>
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
            <ModalContent>
              {(onClose) => (
                <>
                    <h1 className=" text-black dark:text-white my-3 text-center font-semibold text-xl ">Booking Information</h1>
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
                        {TotalFarePriceCalculationBymilesandhours} $
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-center my-3">
                      <Button
                        className="mt-5 w-[80%] lg:w-[50%]"
                        color="success"
                        onPress={handleCreateBooking}
                        isDisabled={
                          !name || !phone || !pickupdate || !pickuptime
                        }
                      >
                       <span className="text-white text-lg">{isBooking ? <Spinner color="primary"/> : "Confirm Booking"}</span>
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

export default OtherInformation;
