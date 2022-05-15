import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const BookingModal = ({ treatment, date, refetch, setTreatment }) => {
  const [user] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const treatmentDate = format(date, "PP");

  //modal submit and store data
  const handleModal = (e) => {
    e.preventDefault();

    // get data and send to database
    const slot = e.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: treatmentDate,
      slot,
      patientName: user.displayName,
      patient: user.email,
      phone: e.target.phone.value,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Successfully booked. ${treatmentDate} at ${slot}`);
        } else {
          toast.warning(
            `Already have an appointment. on ${data.booking.date} at ${data.booking.slot}`
          );
        }
        refetch();
        // close modal are here
        setTreatment(null);
      });
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
          <form onSubmit={handleModal} className="space-y-4 mt-5">
            <input
              type="text"
              name="name"
              readOnly
              value={treatmentDate}
              className="input input-bordered w-full focus:outline-none"
            />
            <select
              name="slot"
              className="select select-bordered w-full focus:outline-none"
            >
              {slots.map((slot, index) => (
                <option key={index}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full focus:outline-none"
            />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full focus:outline-none"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone number"
              className="input input-bordered w-full focus:outline-none"
            />
            <input
              type="submit"
              value="Submit"
              className="w-full text-white bg-accent py-3 rounded-md cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
