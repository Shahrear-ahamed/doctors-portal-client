import React from "react";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // custom messages
  let errorMessage;

  // SHOW ERROR
  if (gError || error) {
    errorMessage = (
      <p className="text-red-500">
        <small>{gError?.code.split("/")[1] || error?.code.split("/")[1]}</small>
      </p>
    );
  }
  if (user || gUser) {
    navigate(from);
  }
  // submit form
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    navigate("/appointment");
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <div className="card w-[450px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl text-center font-bold">Login</h2>

          {/* form are here  */}

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
            {/* password field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password must be required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 caracter or longer",
                  },
                })}
                className="input input-bordered w-full px-2 md:px-5 focus:outline-none"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {errorMessage}
            {gLoading || loading ? (
              <button className="btn w-full loading text-white">loading</button>
            ) : (
              <input
                type="submit"
                value="Login"
                className="btn w-full text-white"
              />
            )}
          </form>
          <p>
            <small>
              New to Doctors Portal?{" "}
              <Link to="/signup" className="text-primary">
                Create new account
              </Link>
            </small>
          </p>
          {/* form end here  */}
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
