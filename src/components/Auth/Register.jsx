import { useState } from "react";
import { useForm } from "react-hook-form";

const Register = ({ signUp, setLogInType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const [showPass, setShowPass] = useState(false);



  const sign_up = (data) => {
    // console.log(data, "data");

    const params = {
      name: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      ...data,
    };

    delete params.firstname;
    delete params.lastname;

    signUp(params);

    reset()
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => sign_up(data))} autoComplete="off">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstname">First name</label>
            <input
              name="firstname"
              type="text"
              className="custom-input"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <p className={`error`}>First name is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname">Last name</label>
            <input
              name="lastname"
              type="text"
              className="custom-input"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <p className={`error`}>Last name is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              className="custom-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="username">User name</label>
            <input
              name="username"
              type="text"
              className="custom-input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className={`error`}>User name is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              type="number"
              className="custom-input"
              {...register("phone", {
                required: { value: true, message: "Phone number is required" },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className="custom-input"
              {...register("password", { required: true })}
            />
            {/* <div>
            <IoEyeOff />
            </div> */}
            {errors.password && <p className={`error`}>Password is required</p>}
          </div>
        </div>

        <div className="w-1/2 m-[0_auto] py-5">
          <button type="submit" className="primary_btn">
            Submit
          </button>
        </div>
      </form>
      <h6 className={`text-sm`}>
        Already have an account ? {" "}
        <span
          onClick={() => setLogInType("login")}
          className={`text-sm font-semibold cursor-pointer`}
        >
          Login
        </span>
      </h6>
    </>
  );
};

export default Register;
