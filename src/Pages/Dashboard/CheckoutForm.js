import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [serverClientSecret, setServerClientSecret] = useState("");
  const { _id, price, patient, patientName, phone } = appointment;

  useEffect(() => {
    fetch("https://doctors-portal-shahrear.herokuapp.com/create-payment-intent", {
      method: "POST",
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
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    // make payment
    const { paymentIntent, intentError } = await stripe.confirmCardPayment(
      serverClientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patient,
            phone,
          },
        },
      }
    );
    if (intentError) {
      setProcessing(false);
      setServerClientSecret(intentError?.message);
    } else {
      setServerClientSecret("");
      setTransactionId(paymentIntent?.id);
      setSuccess("Congrats! Your payment is done");

      // store payment info in database
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };
      fetch(`https://doctors-portal-shahrear.herokuapp.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
  };

  // return ui are here
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
      {processing ? (
        <button className="btn btn-secondary btn-sm mt-4 loading" />
      ) : (
        <button
          className="btn btn-secondary btn-sm mt-4 hover:text-white"
          type="submit"
          disabled={!stripe || !serverClientSecret}
        >
          Pay
        </button>
      )}
      {success && (
        <div className="text-green-500 mt-3">
          <p>{success}</p>
          <p>
            {" "}
            your transaction id:
            <span className="text-orange-500 font-semibold">
              {transactionId}
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
