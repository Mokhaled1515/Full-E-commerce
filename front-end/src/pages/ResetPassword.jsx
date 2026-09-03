import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import SummaryApi from "../components/Common/SummerCommon";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [showpassword, setshowpassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // console.log("data reset Password", data);

  const habdleSubmit = async (e) => {
    e.preventDefault();

    if (data.newpassword !== data.confirmpassword) {
      toast.error("New Password and confirm Password must be same.");
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newpassword: "",
          confirmpassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section
      className=" w-full container mx-auto px-2 flex"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="100"
    >
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 dark:bg-black dark:text-white">
        {/* <p className="text-center p-1 text-green-500 text-2xl font-bold">Login</p> */}
        <p className="text-center font-semibold text-lg">Enter Your Password</p>
        <form action="" className="grid gap-4 py-4 w-full" onSubmit={habdleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newpassword">New Password :</label>

            <div
              className="bg-blue-50 p-2 flex justify-between 
                       items-center border rounded focus-within:border-red-400"
            >
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                name="newpassword"
                className="w-full outline-0 dark:text-black dark:placeholder:text-neutral-700"
                value={data.newpassword}
                onChange={handleChange}
                placeholder="Enter your new Password"
              />
              <div
                onClick={() => setshowpassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showpassword ? <IoEye className="dark:text-black"/> : <IoEyeOffSharp className="dark:text-black"/>}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmpassword">Confirm Password :</label>

            <div
              className="bg-blue-50 p-2 flex justify-between 
                       items-center border rounded focus-within:border-red-400"
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                name="confirmpassword"
                className="w-full outline-none dark:placeholder:text-neutral-700 dark:text-black"
                value={data.confirmpassword}
                onChange={handleChange}
                placeholder="Enter your confirm Password"
              />
              <div
                onClick={() => setshowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <IoEye className="dark:text-black"/> : <IoEyeOffSharp className="dark:text-black"/>}
              </div>
            </div>
          </div>

          <button
            className={` ${
              validValue
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700 duration-75 ease-in"
            } text-white py-2 rounded
          my-3 tracking-wide font-semibold cursor-pointer`}
            disabled={!validValue}
          >
            Change password
          </button>
        </form>
        <p>
          Already have account?   <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-900"
          >
            Login
          </Link>
          
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
