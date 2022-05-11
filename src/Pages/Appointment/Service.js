import React from "react";

const Service = ({ service, setTreatement }) => {
  const { name, slots } = service;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body text-center space-y-2">
        <h2 className="text-center text-secondary text-2xl font-semibold">
          {name}
        </h2>
        <p>
          {slots.length ? (
            <span className="text-base">{slots[0]}</span>
          ) : (
            <span className="text-red-500 font-semibold text-base">
              Try another day
            </span>
          )}
        </p>
        <p className="">
          {slots.length} {slots.length > 0 ? "spaces" : "space"} available
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            onClick={() => setTreatement(service)}
            disabled={slots.length === 0}
            className="btn btn-primary modal-button"
          >
            Book Appointmnet
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
