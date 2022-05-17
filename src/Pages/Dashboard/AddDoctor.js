import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const imageApiKey = "ba4ff4edefd1c59c93a156adaaba5a42";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5000/service").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        // if store data in imgBB
        if (result.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: result.data.url,
          };
          // send data to backend and database
          fetch("http://localhost:5000/doctor", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.acknowledged) {
                toast.success("Doctor add successfully");
                reset();
              } else {
                toast.error("Doctor not add");
              }
            });
        }
      });
  };
  return (
    <div>
      <h2 className="text-2xl mb-3">Add a new doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Doctor Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            className="input input-bordered w-full px-2 md:px-5 focus:outline-none"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text text-red-600">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Doctor Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="input input-bordered w-full px-2 md:px-5 focus:outline-none"
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text text-red-600">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text text-red-600">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
        {/* Specialty field */}
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className="select select-bordered w-full px-2 md:px-5 focus:outline-none"
          >
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <label className="label">
            {errors.password?.type === "required" && (
              <span className="label-text text-red-600">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>
        {/* image field */}
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Doctor Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: {
                value: true,
                message: "Image is required",
              },
            })}
            className="input input-bordered w-full px-2 md:px-5 focus:outline-none"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text text-red-600">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <input
          type="submit"
          value="Add"
          className="btn w-full max-w-md text-white"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
