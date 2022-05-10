import React from "react";
import treatment from "../../assets/images/treatment.png";
import BtnPrimary from "../Utilities/BtnPrimary";

const ServiceHero = () => {
  return (
    <div className="hero min-h-[75vh]">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2 justify-items-center">
        <img
          src={treatment}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="our service img"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {<BtnPrimary />}
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
