


import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-800/70 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-5 rounded shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-red-600">
            Permanent Delete
          </h2>
          <button
            onClick={close}
            aria-label="Close"
            className="text-gray-600 cursor-pointer hover:text-red-600 focus:outline-none"
          >
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Body */}
        <p className="my-4 text-neutral-700 dark:text-cyan-50">
          Are you sure you want to permanently delete this item?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={cancel}
            className="px-4 py-2 text-sm border cursor-pointer border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 cursor-pointer text-sm border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
