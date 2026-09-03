import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-neutral-900/70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded p-4 max-w-md w-full dark:bg-neutral-700">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Field</h1>
          <button
            onClick={close}
            type="button"
            className="cursor-pointer hover:text-red-500"
          >
            <IoClose size={25} />
          </button>
        </div>

        <input
          type="text"
          className="bg-blue-50 my-3 p-2 border border-blue-300 outline-none focus:border-green-300 rounded w-full dark:bg-black"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />

        <button
          onClick={submit}
          type="button"
          className="dark:text-black bg-green-600 px-4 py-2 rounded text-white cursor-pointer mx-auto w-fit block hover:bg-green-500 border border-yellow-200"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
