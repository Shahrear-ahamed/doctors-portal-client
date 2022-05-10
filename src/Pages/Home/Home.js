import React from "react";
import Hero from "./Hero";
import Info from "./Info";
import Services from "./Services";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero />
      <Info />
      <Services />
    </div>
  );
};

export default Home;
