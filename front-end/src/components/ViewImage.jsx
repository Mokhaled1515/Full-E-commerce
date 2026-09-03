import React from "react";
import { IoClose } from "react-icons/io5";
const ViewImage = ({ url, close }) => {
  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0
     bg-neutral-900/80 flex justify-center items-center z-50"
    >
      <div className="w-full max-w-sm p-4 max-h-auto bg-white m-1">
        <button className="cursor-pointer w-fit ml-auto block text-amber-600" onClick={close}>
          <IoClose size={28} /> 
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-7/8 h-6/8 object-scale-down mx-6"
        />
      </div>
    </div>
  );
};

export default ViewImage;
