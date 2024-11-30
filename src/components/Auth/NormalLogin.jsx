import { useState } from 'react'
import { useForm } from 'react-hook-form';

const NormalLogin = ({setLogInType,logIn}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const log_in = (data) => {
    // console.log(data, "data");
    logIn(data);
    reset()
  };


  return (
    <>
      <form onSubmit={handleSubmit((data) => log_in(data))} autoComplete="off">
        <div className="grid grid-cols-1 gap-4">  
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
            login
          </button>
        </div>
      </form>

      <h6 className={`text-sm`}>Don't have an account ? <span onClick={()=> setLogInType('register')} className={`text-sm font-semibold cursor-pointer`}>Register</span></h6>
    </>
  )
}

export default NormalLogin
