import React from "react";

const Reviews = ({ review }) => {
  const { name, img, location, desc } = review;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <p>{desc}</p>
        <div className="flex items-center mt-5">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={img} alt="" />
            </div>
          </div>
          <div className="ml-5">
            <h3 className="font-semibold text-base">{name}</h3>
            <h4>{location}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
