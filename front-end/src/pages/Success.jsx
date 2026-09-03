import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  useEffect(()=>{
    toast.success("Payment Successfully!");
  },[])
  return (
    <div className="m-2 dark:mx-auto dark:m-0 w-full max-w-md py-5 bg-green-200 p-4 dark:bg-black rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="dark:text-neutral-200 text-lg text-center text-green-700 font-bold">
        {Boolean(location?.state?.text) ? location?.state?.text : "Payment"}{" "}
        Successfully
      </p>
      <Link
        to={"/"}
        className="cursor-pointer border border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all px-4 py-1 "
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
