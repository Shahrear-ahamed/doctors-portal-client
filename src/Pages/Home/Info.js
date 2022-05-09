import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";

const Info = () => {
  const heroData = [
    {
      title: "Opening Hours",
      desc: "Lorem Ipsum is simply dummy text of the pri",
      img: clock,
      bg: "bg-gradient-to-r from-secondary to-primary",
    },
    {
      title: "Visit our location",
      desc: "Brooklyn, NY 10036, United States",
      img: marker,
      bg: "bg-accent",
    },
    {
      title: "Contact us now",
      desc: "+000 123 456789",
      img: phone,
      bg: "bg-gradient-to-r from-secondary to-primary",
    },
  ];
  return (
    <div className="mx-4 md:mx-0 my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      {heroData.map((data, index) => (
        <InfoCard data={data} key={index} />
      ))}
    </div>
  );
};

export default Info;
