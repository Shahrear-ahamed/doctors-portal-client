import React from "react";

const BookingModal = ({ treatment, count }) => {
  const { name } = treatment;

  //modal submit and store data
  const handleModal = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{name}</h3>
          {/* userinput are here */}
          <form onSubmit={handleModal}>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
            />
            <input type="submit" value="Submit" className="w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
