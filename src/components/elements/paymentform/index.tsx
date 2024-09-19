import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Spinner } from '@nextui-org/react';
import { postMethod } from "~@/utils/api/postMethod";
import { endPoints } from "~@/utils/api/route";
import toast from "react-hot-toast";
import { useAppDispatch } from "~@/_redux/hooks/hooks";
import { handleCitytocityStepNext } from "~@/modules/servicemodule/_redux/actions/citytocityActions";

interface PaymentFormProps {
  amount: number;
  bookingData: any;
  currentStep: number;
}

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const PaymentFormContent: React.FC<PaymentFormProps> = ({ amount, bookingData, currentStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not been initialized");
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const intentResponse = await postMethod({
        route: endPoints.Customer.createPaymentIntent,
        postData: { amount: Math.round(amount * 100) },
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
            name: bookingData.name,
            phone: bookingData.mobileNumber,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
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
          toast.success("Payment processed and booking created successfully");
          dispatch(handleCitytocityStepNext(currentStep + 1));
        } else {
          throw new Error("Payment succeeded but booking creation failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during payment processing");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || isProcessing} className="mt-4">
        {isProcessing ? <Spinner /> : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm;