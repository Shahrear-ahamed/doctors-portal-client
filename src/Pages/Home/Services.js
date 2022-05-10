import React from "react";
import flouride from "../../assets/images/fluoride.png";
import cavity from "../../assets/images/cavity.png";
import whitening from "../../assets/images/whitening.png";
import Service from "./Service";
import ServiceHero from "./ServiceHero";

const Services = () => {
  const services = [
    {
      _id: 1,
      title: "Fluoride Treatment",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maxime fugiat aliquam.",
      img: flouride,
    },
    {
      _id: 2,
      title: "Cavity Treatment",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maxime fugiat aliquam.",
      img: cavity,
    },
    {
      _id: 3,
      title: "Teeth Whitening",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maxime fugiat aliquam.",
      img: whitening,
    },
  ];
  return (
    <div className="my-16">
      <div className="text-center">
        <h3 className="text-xl uppercase text-secondary font-bold">
          Our Services
        </h3>
        <h2 className="text-4xl font-semibold">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10">
        {services.map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>
      <div>{<ServiceHero />}</div>
    </div>
  );
};

export default Services;
