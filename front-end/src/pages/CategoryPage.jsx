import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../components/Common/SummerCommon";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosToatsError";
import { useSelector } from "react-redux";
const CategoryPage = ({ fetchCategory }) => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categorydata, setcategoryData] = useState([]);
  const [openEdit, setopenEdit] = useState(false);
  const [editData, seteditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setopenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setdeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  useEffect(() => {
    setcategoryData(allCategory);
  }, [allCategory]);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });
      const { data: responseData } = response;

      if (responseData.succuss) {
        toast.success(responseData.message);
        fetchCategory();
        setopenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="p-2 shadow-md flex justify-between items-center">
        <h2 className="font-semibold ">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-green-300 cursor-pointer
           hover:bg-green-400 px-3 py-1 rounded
           dark:text-white dark:hover:bg-black
           "
        >
          Add Category
        </button>
      </div>

      {!categorydata[0] && !loading && <NoData />}

      <div
        className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full"
        id="categoryy"
      >
        {categorydata.map((category, index) => {
          return (
            <div
              className="w-auto h-auto p-2 rounded shadow-xl"
              key={category._id}
              id="cat-div"
            >
              <img
                // loading="lazy"
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down h-3/4 hover:scale-105 cursor-pointer"
              />
              <div className="items-center h-9 flex gap-2 w-full sansa">
                <button
                  onClick={() => {
                    setopenEdit(true);
                    seteditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200
                 text-green-600 font-medium cursor-pointer py-1 rounded w-1/2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setopenConfirmBoxDelete(true);
                    setdeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200
                 text-red-600 font-medium cursor-pointer py-1 rounded w-1/2 del"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => {
            setopenEdit(false);
          }}
          fetchData={fetchCategory}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setopenConfirmBoxDelete(false)}
          cancel={() => setopenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
