import React, { useEffect } from "react";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const naivgate = useNavigate();
  const location = useLocation();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, , upError] = useUpdateProfile(auth);
  const [sendEmailVerification, , emailiError] = useSendEmailVerification(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const from = location.state?.from?.pathname || "/";

  // custom messages
  let errorMessage;

  // SHOW ERROR
  if (gError || error || upError || emailiError) {
    const googleError = gError?.code.split("/")[1];
    const createError = error?.code.split("/")[1];
    const updateError = upError?.code.split("/")[1];
    const emailVerifyError = emailiError?.cond.split("/")[1];
    errorMessage = (
      <p className="text-red-500">
        <small>
          {googleError || createError || updateError || emailVerifyError}
        </small>
      </p>
    );
  }
  useEffect(() => {
    if (user || gUser) {
      toast.success("Email verification was send. please verify your account");
      naivgate(from);
      // console.log(user);
    }
  }, [from, user, gUser, naivgate]);
  // submit form
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification(data.email);
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <div className="card w-[450px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl text-center font-bold">Sign Up</h2>

          {/* form are here  */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-ful">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
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
            <p className="py-3">
              <small>
                <Link to="/forgetpassword">Forget password?</Link>
              </small>
            </p>
            {errorMessage}
            {gLoading || loading ? (
              <button className="btn w-full loading text-white">loading</button>
            ) : (
              <input
                type="submit"
                value="Sign Up"
                className="btn w-full text-white"
              />
            )}
          </form>
          <p>
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                please login
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