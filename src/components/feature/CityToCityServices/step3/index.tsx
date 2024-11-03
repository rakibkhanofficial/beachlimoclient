import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  Modal,
  ModalContent,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import UseCityToCity from "~@/modules/servicemodule/hocs/citytocityservice/useCitytoCityService";
import { handleCitytoCityInputChange } from "~@/modules/servicemodule/_redux/actions/citytocityActions";
import { useCustomSession } from "~@/hooks/customSessionhook";
import PaymentForm from "~@/components/elements/paymentform";
import CustomCalendar from "~@/components/elements/CustomCalender";
import CustomTimeInput from "~@/components/elements/CustomTimeInput";

type SelectedCarType = {
  car_id: number;
  car_name: string;
  car_slug: string;
  car_image: string;
  car_pricePerHour: string;
  car_pricePerMile: string;
  car_model: string;
  car_year: number;
  car_make: string;
  car_seatingCapacity: number;
  car_hasChildSeat: 0 | 1;
  car_hasWifi: 0 | 1;
  car_luggageCapacity: number;
  car_mileagePerGallon: string;
  car_transmission: string;
  car_fuelType: string;
  car_features: string;
  car_categoryId: number;
  car_subCategoryId: number;
  car_createdAt: string;
  car_updatedAt: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
};

const CitytocityOtherInformation: React.FC = () => {
  const { session } = useCustomSession();
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
    paymentmethod,
    FarePriceCalculationBymiles,
    step,
    onlinebookingData,
  } = UseCityToCity();
  const SelectedCarData: SelectedCarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (session?.user) {
      dispatch(handleCitytoCityInputChange("name", session?.user?.name));
      dispatch(handleCitytoCityInputChange("phone", session?.user?.phone));
    }
  }, [session, dispatch]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolling(true);
  //     const timeoutId = setTimeout(() => setIsScrolling(false), 100);
  //     return () => clearTimeout(timeoutId);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleDateChange = (date: Date, formattedDate: string) => {
    handleInputChange("pickupdate", formattedDate);
  };

  return (
    <div className="relative my-5 w-full p-2 lg:p-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-5 text-center text-xl font-semibold">
          Enter Booking Information
        </h1>
        <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-700 px-4 py-6 lg:w-[60%]">
          <Input
            placeholder="Enter Name"
            label="Name"
            className="rounded-xl"
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="Enter Phone"
            label="Phone"
            inputMode="numeric"
            className="rounded-xl"
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          <div className="w-full">
            <label className="text-gray-400">Pick Up Date</label>
            <CustomCalendar
              maxValue={new Date(2025, 11, 31)}
              onChange={handleDateChange}
              disablePastDates={false}
            />
          </div>
          <Input
            value={pickuptime}
            placeholder="Select Time"
            label="Pick Up Time"
            type="time"
            className="rounded-xl"
            onChange={(e) => handleInputChange("pickuptime", e.target.value)}
          />
          <RadioGroup
            label="Select Your Payment Method"
            color="secondary"
            defaultValue="cash"
          >
            <Radio
              onChange={(e) =>
                handleInputChange("paymentmethod", e.target.value)
              }
              value="online"
            >
              Online Payment
            </Radio>
            <Radio
              onChange={(e) =>
                handleInputChange("paymentmethod", e.target.value)
              }
              value="cash"
            >
              Cash Payment
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div
        className={`fixed bottom-0 left-0 z-50 flex w-full items-center justify-center bg-white px-2 py-2 transition-transform duration-300 dark:bg-gray-800 ${
          isScrolling ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <Button
          className={`w-[80%] lg:w-[40%] ${
            !name || !phone || !pickupdate || !pickuptime
              ? "cursor-not-allowed bg-gray-300 text-black"
              : "bg-blue-800 text-white"
          }`}
          onPress={onOpen}
          isDisabled={!name || !phone || !pickupdate || !pickuptime}
        >
          <span className="text-lg text-white">Next</span>
          <span className="text-lg text-white">
            <MdArrowForwardIos />
          </span>
        </Button>
      </div>
      <Modal
        className=" bg-gray-100 dark:bg-slate-900 "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <h1 className="my-3 text-center text-xl font-semibold text-black dark:text-white">
                Booking Information
              </h1>
              <div className="flex items-center justify-center">
                <Image
                  src={SelectedCarData?.car_image}
                  alt={SelectedCarData?.car_name}
                  height={200}
                  width={200}
                />
              </div>
              <div className="mx-2 grid grid-cols-2 gap-1 rounded-lg border p-2 dark:border-gray-600">
                <p className="text-black dark:text-white">Name:</p>
                <p className="text-black dark:text-white">{name}</p>
                <p className="text-black dark:text-white">Phone:</p>
                <p className="text-black dark:text-white">{phone}</p>
                <p className="text-black dark:text-white">Car Name:</p>
                <p className="text-black dark:text-white">
                  {SelectedCarData.car_name}
                </p>
                <p className="text-black dark:text-white">Pickup Address:</p>
                <p className="text-black dark:text-white">{pickupAddress}</p>
                <p className="text-black dark:text-white">Drop Off Address:</p>
                <p className="text-black dark:text-white">{dropoffAddress}</p>
                <p className="text-black dark:text-white">
                  PickUp Time & Date:
                </p>
                <p className="text-black dark:text-white">
                  {pickuptime}, {pickupdate}
                </p>
                <p className="text-black dark:text-white">Total Fare Price:</p>
                <p className="text-black dark:text-white">
                  {FarePriceCalculationBymiles} $
                </p>
                <p className="text-black dark:text-white">Payment Method:</p>
                <p className="text-black dark:text-white">{paymentmethod}</p>
              </div>
              {paymentmethod === "online" ? (
                <PaymentForm
                  amount={parseFloat(FarePriceCalculationBymiles)}
                  bookingData={onlinebookingData}
                  currentStep={step}
                />
              ) : (
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
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CitytocityOtherInformation;
