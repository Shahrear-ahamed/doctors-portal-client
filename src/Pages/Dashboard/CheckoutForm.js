import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [serverClientSecret, setServerClientSecret] = useState("");
  const { price } = appointment;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setServerClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check data has or not
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        onChange={() => setCardError("")}
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 mt-3">{cardError}</p>}
      <button
        className="btn btn-secondary btn-sm mt-4 hover:text-white"
        type="submit"
        disabled={!stripe || !serverClientSecret}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
