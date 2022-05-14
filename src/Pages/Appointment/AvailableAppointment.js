import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointment = ({ date }) => {
  const [treatment, setTreatement] = useState(null);
  const formattedDate = format(date, "PP");

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["services", formattedDate], () =>
    fetch(`http://localhost:5000/available?date=${formattedDate}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="container mx-auto px-5 xl:px-0">
      <h4 className="text-xl font-semibold text-secondary text-center">
        Available Appointments on{" "}
        <span className="block md:inline">{format(date, "PP")}</span>
      </h4>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services?.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatement={setTreatement}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          refetch={refetch}
          setTreatment={setTreatement}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
