import React, { useState } from "react";
import Footer from "../Shared/Footer/Footer";
import AppointmentHero from "./AppointmentHero";
import AvailableAppointment from "./AvailableAppointment";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <AppointmentHero date={date} setDate={setDate} />
      <AvailableAppointment date={date} />
      <Footer />
    </div>
  );
};

export default Appointment;
