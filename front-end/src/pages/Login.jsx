import React, { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../components/Common/SummerCommon"
import AxiosToastError from "../utils/AxiosToatsError.js";
import { Link, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import fetchUserDetails from "../utils/fetchUserDetails.js";
import { useDispatch } from "react-redux";
import { setUserDeatils } from "../store/UserSlice";


const Login = () => {
  useEffect(()=>{
    Aos.init()
  },[])
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);
const navigate = useNavigate()
const dispatch = useDispatch()

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



try{
  const response = await Axios({
    ...SummaryApi.login,
    data: data
  })
  
if(response.data.error){
// toast.error(response.data.message)
toast.error("d")
}


 
if(response.data.success){
toast.success(response.data.message);

localStorage.setItem('accesstoken', response.data.data.accesstoken)
localStorage.setItem('refreshToken', response.data.refreshToken)

// refreshToken elmafrod gded

// refreshTooken  refreshTooken qdeem

const userDetails = await fetchUserDetails()

dispatch(setUserDeatils(userDetails.data))
setData({
  email: "",
  password: "",
})
navigate("/")
}
}

catch(error){
  AxiosToastError(error)
}


}




return (
    <section className=" w-full container mx-auto px-2 flex justify-center items-center" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 dark:bg-black">
        {/* <p className="text-center p-1 text-green-500 text-2xl font-bold">Login</p> */}
        <form action="" className="grid gap-4 py-4 w-full" onSubmit={habdleSubmit}>
          
          <div className="grid gap-1">
            <label htmlFor="email" className="dark:text-white">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-blue-50 p-2 dark:bg-gray-500 w-full dark:text-white border rounded outline-none focus:border-amber-300"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="dark:text-white">Password :</label>
            <div
              className="bg-blue-50 dark:bg-gray-500 dark:text-white p-2 flex justify-between 
              items-center border rounded focus-within:border-red-400"
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
                {
                showpassword ? (
                  <IoEye />
                ) : (
                  <IoEyeOffSharp />
                )
                
              } 
              </div>
            </div>
            <Link to={"/forgot-password"} className="block ml-auto dark:text-yellow-400 hover:text-orange-400 text-lg">Forgot Password ?</Link>
          </div>
         
          <button 
          className={` ${validValue ? "bg-green-800 hover:bg-green-700 dark:bg-green-600" : "bg-gray-600 hover:bg-gray-700 duration-75 ease-in"} text-white py-2 rounded
            my-3 tracking-wide font-semibold cursor-pointer`}
            disabled={!validValue}
            >
            Login
          </button>
        </form>
        <p className="dark:text-white">
          Don't have account? <Link to={"/register"}
          className="font-semibold text-green-700 hover:text-green-900"
          >Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
