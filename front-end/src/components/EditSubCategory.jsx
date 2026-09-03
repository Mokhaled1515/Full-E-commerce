import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import Axios from "../utils/Axios";
import SummaryApi from "./Common/SummerCommon";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToatsError";

const EditSubCategory = ({ close,data,fetchData }) => {
  const [subcategoryData, setsubcategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);
  // console.log("All Category sub category page", allCategory);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setsubcategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadSubcategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    const { data: Imageresponse } = response;

    setsubcategoryData((preve) => {
      return {
        ...preve,
        image: Imageresponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subcategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subcategoryData.category.splice(index, 1);
    setsubcategoryData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleSubmitsubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subcategoryData,
      });
      const { data: responseData } = response;

      // console.log("responseData", responseData);
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();

        }
        if(fetchData){
            fetchData()
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded dark:bg-gray-800">
        <div className=" items-center flex justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button className="cursor-pointer" onClick={close}>
            <IoCloseSharp size={25} />
          </button>
        </div>
        <form
          action=""
          className="my-4 grid gap-3"
          onSubmit={handleSubmitsubcategory}
        >
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={subcategoryData.name}
              onChange={handleChange}
              className="p-3 bg-blue-100 border
                     dark:bg-gray-700 dark:border-gray-200
                      border-gray-400 outline-none
                       focus-within:border-green-400 rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col gap-3 lg:flex-row items-center">
              <div className="border bg-blue-100 dark:bg-teal-900 border-gray-300 h-36 w-full lg:w-36 flex justify-center items-center">
                {!subcategoryData.image ? (
                  <p className="text-sm text-neutral-400">No image</p>
                ) : (
                  <img
                    src={subcategoryData.image}
                    alt="subCategory"
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className="px-4 rounded hover:bg-green-200 py-1 border
                         border-emerald-400 text-green-500
                          hover:text-neutral-500 cursor-pointer"
                >
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubcategoryImage}
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>
            <div
              className="border focus-within:border-green-500
            rounded 
            "
            >
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {subcategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoMdClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>

              {/* select category */}
              <select
                name=""
                id=""
                className="w-full p-2 bg-transparent cursor-pointer outline-none "
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );
                  setsubcategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className={`
            px-4 py-2 border border-gray-300 cursor-pointer
            ${
              subcategoryData?.name &&
              subcategoryData?.image &&
              subcategoryData?.category[0]
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-400"
            }
            font-semibold
            `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
