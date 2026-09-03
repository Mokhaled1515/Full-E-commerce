import React, { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../components/Common/SummerCommon"
import AxiosToastError from "../utils/AxiosToatsError";
import { Link, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";


const Rigester = () => {
  useEffect(()=>{
      Aos.init()
    },[])
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const [showConfirm, SetShowConfirm] = useState(false);
const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(data).every(el => el)

const habdleSubmit = async (e)=>{
e.preventDefault();
if(data.password !== data.confirmPassword){
  toast.error(
    "password and confirm password must be same"
  )
  return 
}
 
// try{
//   const response = await Axios({
//     ...SummaryApi.register,
//     // data: data
//   });
//   console.log("response", response)
// }
// catch (error){
//   AxiosToastError(error)
// }


try{
  const response = await Axios({
    ...SummaryApi.register,
    data: data
  })
if(response.data.error){
toast.error(response.data.message)
}
if(response.data.success){
toast.success(response.data.message);
setData({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
})
navigate("/login")
}
}

catch(error){
  AxiosToastError(error)
}


}




return (
    <section className="flex w-full container mx-auto px-2"  data-aos="zoom-in" data-aos-duration="500" data-aos-delay="100">
      <div className="bg-white dark:bg-black/50 my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center p-1 text-green-500 text-2xl font-bold dark:text-gray-100">Welcome To Marmar</p>
        <form action="" className="grid gap-4 mt-6 w-full" onSubmit={habdleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="dark:text-white">Name :</label>
            <input
              type="text"
              id="name"
              autoFocus
              name="name"
              className="bg-blue-50 p-2 w-full dark:bg-gray-500 dark:text-white border rounded outline-none focus:border-amber-300"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email" className="dark:text-white">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-blue-50 w-full dark:bg-gray-500 dark:text-white p-2 border rounded outline-none focus:border-amber-300"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="dark:text-white">Password :</label>
            <div
              className="bg-blue-50 p-2 flex justify-between
              items-center border rounded focus-within:border-red-400 dark:bg-gray-500 dark:text-white"
            >
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                autoFocus
                name="password"
                className="w-full outline-0"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
              <div
                onClick={() => setshowpassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showpassword ? <IoEye /> : <IoEyeOffSharp />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="dark:text-white">confirm Password :</label>
            <div
              className="bg-blue-50 p-2 flex justify-between 
              items-center border rounded  focus-within:border-red-400 dark:bg-gray-500 dark:text-white"
            >
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                autoFocus
                name="confirmPassword"
                className="w-full outline-0"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
              <div
                onClick={() => SetShowConfirm((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirm ? <IoEye /> : <IoEyeOffSharp />}
              </div>
            </div>
          </div>
          <button 
          className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700 duration-75 ease-in"} text-white py-2 rounded
            my-3 tracking-wide font-semibold cursor-pointer`}
            disabled={!validValue}
            >
            Register
          </button>
        </form>
        <p className="dark:text-white">
          Already have account ? <Link to={"/login"}
          className="dark:text-green-400 dark:hover:text-green-600 font-semibold text-green-700 hover:text-green-900"
          >Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Rigester;
