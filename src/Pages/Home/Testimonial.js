import React from "react";
import qoute from "../../assets/icons/quote.svg";
import people1 from "../../assets/images/people1.png";
import people2 from "../../assets/images/people2.png";
import people3 from "../../assets/images/people3.png";
import Reviews from "./Reviews";

const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      img: people1,
      name: "Winson Harry",
      location: "California",
      desc: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 2,
      img: people2,
      name: "Winson Harry",
      location: "California",
      desc: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 3,
      img: people3,
      name: "Winson Harry",
      location: "California",
      desc: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
  ];
  return (
    <section className="container mx-auto w-[90%] my-10">
      <div className="flex justify-between">
        <div className="md:mt-5">
          <h4 className="text-primary text-xl">Testimonial</h4>
          <h2 className="font-semibold text-3xl">What Our Patients Says</h2>
        </div>
        <div>
          <img
            src={qoute}
            alt="testimonials qoute images"
            className="w-[100px] md:w-[150px] lg:w-[195px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Reviews key={review._id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
