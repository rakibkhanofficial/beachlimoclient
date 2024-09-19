import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~@/_redux/hooks/hooks";
import {
  handleCitytoCityInputChange,
  handleCitytocityStepNext,
  handleSelectedcarData,
} from "../../_redux/actions/citytocityActions";
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";
import { useCustomSession } from "~@/hooks/customSessionhook";
import { handleAuthSubmitting } from "~@/_redux/actions/authopen";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
);

type CarType = {
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

const UseCityToCity = () => {
  const dispatch = useAppDispatch();
  const { session } = useCustomSession();
  const [isBooking, setIsBooking] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const SelectedCarData: CarType = useAppSelector(
    (state) => state.selectedCarDataReducer?.selectedCaradata?.SelectedcarData,
  );

  const cityToCityInput = useAppSelector(
    (state) =>
      state.cityTocityServiceReducer?.citytocity?.CitytoCityServiceInput,
  );

  const {
    airportname = "",
    flightno = "",
    area = "",
    adressdescription = "",
    triptype = "",
    pickupLocation = "",
    pickupAddress = "",
    pickupdate = "",
    pickuptime = "",
    dropoffLocation = "",
    dropoffAddress = "",
    distance = 0,
    adress = "",
    name = "",
    phone = "",
    luggage = "",
    passenger = "",
    hour = 0,
    paymentmethod = "",
  } = cityToCityInput || {};

  const handleInputChange = (
    name: string,
    value: string | number | undefined,
  ) => {
    dispatch(handleCitytoCityInputChange(name, value));
  };

  const handleSelectedcar = (value: CarType) => {
    dispatch(handleSelectedcarData(value));
  };

  const step: number = useAppSelector(
    (state) => state?.cityTocityServiceReducer?.citytocity?.step,
  );

  const handleCitytoCityNext = () => {
    if (session?.user?.accessToken) {
      dispatch(handleCitytocityStepNext(step + 1));
      dispatch(handleCitytoCityInputChange("triptype", "CityToCity"));
    } else {
      dispatch(handleAuthSubmitting(true));
    }
  };

  const handleCitytoCityBack = () => {
    dispatch(handleCitytocityStepNext(step - 1));
  };

  const FarePriceCalculationBymiles = (
    distance * Number(SelectedCarData.car_pricePerMile)
  ).toFixed(2);

  const handleCreateBooking = async () => {
    setIsBooking(true);
    const bookingData = {
      carId: SelectedCarData?.car_id,
      tripType: triptype,
      airportName: airportname,
      flightNo: flightno,
      childSeat: SelectedCarData.car_hasChildSeat,
      luggage: SelectedCarData.car_luggageCapacity,
      passenger: SelectedCarData.car_seatingCapacity,
      mobileNumber: phone,
      pickupLocationAddress: pickupAddress,
      totalBookingPrice: parseInt(FarePriceCalculationBymiles),
      pickupLocationMapLink: pickupLocation,
      pickupDate: pickupdate,
      pickupTime: pickuptime,
      dropoffLocationAddress: dropoffAddress,
      dropoffLocationMapLink: dropoffLocation,
      hour: hour,
      distance: distance,
      paymentMethod: paymentmethod,
    };

    try {
      if (paymentmethod === "cash") {
        const response = await postMethod({
          route: endPoints.Customer.createBookingByCash,
          postData: { ...bookingData, paymentStatus: "pending" },
        });
        if (response?.data?.statusCode === 201) {
          setIsBooking(false);
          dispatch(handleCitytocityStepNext(step + 1));
          toast.success("Booking created successfully");
        } else {
          setIsBooking(false);
          toast.error("Failed to create booking. Please try again.");
        }
      } else {
        if (!stripe || !elements) {
          toast.error(
            "Payment processing is not available. Please try again later."
          );
          setIsBooking(false);
          return;
        }
        setIsProcessingPayment(true);

        // Create payment intent
        const intentResponse = await postMethod({
          route: endPoints.Customer.createPaymentIntent,
          postData: { amount: Math.round(bookingData.totalBookingPrice * 100) },
        });

        if (intentResponse?.data?.statusCode !== 200) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = intentResponse.data.data;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error("Card element not found");
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
              phone: phone,
            },
          },
        });

        if (result.error) {
          toast.error(result.error.message || "Payment failed");
          setIsProcessingPayment(false);
          setIsBooking(false);
        } else if (result.paymentIntent.status === "succeeded") {
          // Create booking after successful payment
          const bookingResponse = await postMethod({
            route: endPoints.Customer.createBookingAfterPayment,
            postData: {
              ...bookingData,
              paymentStatus: "Paid",
              stripePaymentIntentId: result.paymentIntent.id,
            },
          });

          if (bookingResponse?.data?.statusCode === 201) {
            setIsBooking(false);
            setIsProcessingPayment(false);
            dispatch(handleCitytocityStepNext(step + 1));
            toast.success("Payment processed and booking created successfully");
          } else {
            toast.error(
              "Payment succeeded but booking creation failed. Please contact support."
            );
            setIsBooking(false);
            setIsProcessingPayment(false);
          }
        }
      }
    } catch (error) {
      setIsBooking(false);
      setIsProcessingPayment(false);
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };


  return {
    handleInputChange,
    pickupLocation,
    pickupAddress,
    pickupdate,
    pickuptime,
    dropoffLocation,
    dropoffAddress,
    distance,
    adress,
    handleCitytoCityNext,
    handleCitytoCityBack,
    handleSelectedcar,
    SelectedCarData,
    FarePriceCalculationBymiles,
    name,
    phone,
    luggage,
    passenger,
    paymentmethod,
    handleCreateBooking,
    isBooking,
    isProcessingPayment,
  };
};

export default UseCityToCity;
