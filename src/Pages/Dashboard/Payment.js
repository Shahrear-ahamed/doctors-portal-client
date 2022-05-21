import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L1NV5AlO9OJiFpifgfWumRmZDbx7WPDiUH61SCd466UwSPXSdhJdrogfxfJVOa69axIn0mUCM9oRvjP0PkGcTbg00ZM5Ztwxa"
);

const Payment = () => {
  const { id } = useParams();
  const url = `https://doctors-portal-shahrear.herokuapp.com/booking/${id}`;
  const { data: appointment, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  const { treatment, date, slot, patientName, price } = appointment;

  return (
    <div className="my-10 mx-6 space-y-8">
      <div className="card w-50 max-w-md  bg-base-100 shadow-xl">
        <div className="card-body">
          <p>Hello, {patientName}</p>
          <h2 className="card-title">Please pay for {treatment}</h2>
          <p>
            Your appointment <span className="text-secondary">{date}</span> at{" "}
            {slot}
          </p>
          <p>Please pay for: ${price}</p>
        </div>
      </div>
      <div className="card w-50 max-w-md flex-shrink-0 shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointment={appointment}/>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
