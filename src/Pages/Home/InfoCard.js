import React from "react";

const InfoCard = ({ data }) => {
  const { title, desc, bg, img } = data;
  return (
    <div
      className={`container card lg:card-side shadow-xl text-white ${bg}`}
    >
      <figure className="py-3 px-5">
        <img className="w-[60px] h-[60px]" src={img} alt="Album" />
      </figure>
      <div className="card-body px-5 py-3 md:py-5">
        <h2 className="card-title">{title}</h2>
        <p>{desc}.</p>
      </div>
    </div>
  );
};

export default InfoCard;
