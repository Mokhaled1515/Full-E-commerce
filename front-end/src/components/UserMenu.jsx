import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "./Common/SummerCommon";
import { logout } from "../store/UserSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToatsError";
import { HiExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const handlelogOut = async () => {

  //     try {
  //       const response = await Axios({
  //         ...SummaryApi.logout,
  //       });
  //       if (response.data.success) {
  //         // close();
  //         dispatch(logout());
  //         localStorage.clear();
  //         toast.success(response.data.message);
  //       }
  //     } catch (error) {
  //       AxiosToastError(error);
  //     }
  //   };

  // //   const handlelogOut = async () => {
  // //     try {
  // //         await Axios.post("/logout"); // إرسال طلب للخروج

  // //         // حذف التوكنات من LocalStorage
  // //         localStorage.removeItem("accesstoken");
  // //         localStorage.removeItem("refreshTooken");

  // //         // تنظيف الكاش في Axios
  // //         Axios.defaults.headers.common["Authorization"] = "";

  // //         toast.success("Logged out successfully!");
  // //         window.location.href = "/login"; // إعادة التوجيه لصفحة تسجيل الدخول
  // //     } catch (error) {
  // //         console.error("Logout Error:", error);
  // //         toast.error("Logout failed");
  // //     }
  // // };
  // // const handlelogOut = async () => {
  // //   try {
  // //       const response = await Axios.post("/logout");
  // //       console.log("Logout Response:", response); // ✅ طباعة رد السيرفر

  // //       localStorage.removeItem("accesstoken");
  // //       localStorage.removeItem("refreshTooken");

  // //       Axios.defaults.headers.common["Authorization"] = "";

  // //       toast.success("Logged out successfully!");
  // //       window.location.href = "/login";
  // //   } catch (error) {
  // //       console.error("Logout Error:", error.response ? error.response.data : error);
  // //       toast.error(error.response?.data?.message || "Logout failed");
  // //   }
  // // };
  // console.log("logout error");
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  const handlelogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          <span className="font-medium text-red-400 p-2">{user.role === "ADMIN" ? "(Admin)" : ""}</span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="dark:hover:text-blue-400
          hover:text-green-500
          "
        >
          <HiExternalLink size={18} />
        </Link>
      </div>
      <Divider />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/category"}
            className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
            onClick={handleClose}
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/subcategory"}
            className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
            onClick={handleClose}
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/upload-product"}
            className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
            onClick={handleClose}
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
           <Link
           to={"/dashboard/product"}
           className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
           onClick={handleClose}
         >
           Product
         </Link>
        )}

      

        <Link
          to={"/dashboard/myorders"}
          className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
          onClick={handleClose}
        >
          My Orders
        </Link>
        <Link
          to={"/dashboard/address"}
          className="px-2 py-1 hover:bg-green-400 dark:hover:text-black dark:hover:bg-blue-400"
          onClick={handleClose}
        >
          Save Address
        </Link>
        <button
          onClick={handlelogOut}
          className="text-left px-2 py-1 text-md hover:bg-green-600
           cursor-pointer dark:hover:text-black hover:font-bold dark:hover:bg-blue-400"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
