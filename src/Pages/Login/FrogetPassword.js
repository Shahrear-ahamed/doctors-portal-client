import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const FrogetPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // custom messages
  let errorMessage;

  // SHOW ERROR
  if (error) {
    errorMessage = (
      <p className="text-red-500">
        <small>{error?.code.split("/")[1]}</small>
      </p>
    );
  }

  const onSubmit = async (data) => {
    await sendPasswordResetEmail(data.email);
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <div className="card w-[450px] bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
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
            {errorMessage}
            {sending ? (
              <button className="btn w-full loading text-white">loading</button>
            ) : (
              <input
                type="submit"
                value="Send Reset Link"
                className="btn w-full text-white"
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FrogetPassword;
