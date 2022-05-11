import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointment = ({ date }) => {
  const [services, setServices] = useState([]);
  const [treatment, setTreatement] = useState(null);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  });
  return (
    <section className="container mx-auto">
      <h4 className="text-xl font-semibold text-secondary text-center">
        Available Appointments on {format(date, "PP")}
      </h4>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatement={setTreatement}
          />
        ))}
      </div>
      {treatment && <BookingModal treatment={treatment} />}
    </section>
  );
};

export default AvailableAppointment;
