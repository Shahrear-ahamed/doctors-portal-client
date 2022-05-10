import React from "react";
import chair from "../../assets/images/chair.png";
import BtnPrimary from "../Utilities/BtnPrimary";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="">
      <div className="hero min-h-[80vh]">
        <div className="hero-content grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Your New Smile Starts Here
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {<BtnPrimary />}
          </div>
          <div className="flex order-1 md:order-1 md:justify-end">
            <img
              src={chair}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              alt="chair pic "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
