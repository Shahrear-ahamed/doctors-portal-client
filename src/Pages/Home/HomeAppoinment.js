import React from "react";
import doctor from "../../assets/images/doctor.png";
import BtnPrimary from "../Utilities/BtnPrimary";
import appoinment from "../../assets/images/appointment.png";

const HomeAppoinment = () => {
  return (
    <section
      className="flex justify-center items-center mt-[70px]"
      style={{ background: `url(${appoinment})` }}
    >
      <div className="flex-1 mt-[-100px] hidden md:block">
        <img src={doctor} alt="doctor img" />
      </div>
      <div className="flex-1 space-y-4 py-14 px-5">
        <h3 className="text-secondary text-lg font-bold">Appoinment</h3>
        <h2 className="text-3xl font-semibold text-white">
          Make an appointment Today
        </h2>
        <p className="text-white">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <BtnPrimary>Get Started</BtnPrimary>
      </div>
    </section>
  );
};

export default HomeAppoinment;
