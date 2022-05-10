import React from "react";
import Footer from "../Shared/Footer/Footer";
import ContactUs from "./ContactUs";
import Hero from "./Hero";
import HomeAppoinment from "./HomeAppoinment";
import Services from "./Services";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HomeAppoinment />
      <Testimonial />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;
