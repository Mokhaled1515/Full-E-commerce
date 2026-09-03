import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../components/Common/SummerCommon";
import AxiosToastError from "../utils/AxiosToatsError";
import SuccessAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    products: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, SetselectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [moreFeild, setMoreFeild] = useState([]);

  const [openAddField, setopenAddField] = useState(false);
  const [fieldName, setfieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: Imageresponse } = response;
    const imageUrl = Imageresponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };
  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      };
    });
  };
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setfieldName("");
    setopenAddField(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(SummaryApi.createProduct.url, data);

      const { data: responseData } = response;
      if (responseData.success) {
        SuccessAlert(responseData.message);
        setData({
          name: "",
          image: [],
          products: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  // useEffect(()=>{
  //   SuccessAlert("Upload successfully")
  // },[])

  return (
    <section className="">
      <div className="p-2 shadow-md flex justify-between items-center">
        <h2 className="font-semibold ">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form action="" className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              name="name"
              required
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            rounded
            focus-within:border-green-500
            dark:bg-gray-800
            "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleChange}
              name="description"
              required
              multiple
              rows={3}
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            dark:bg-gray-800
            rounded
            focus-within:border-green-500 resize-none"
            />
          </div>
          <div>
            <p className="font-medium">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border dark:bg-gray-800 border-gray-400 rounded cursor-pointer flex justify-center items-center"
              >
                <div className="flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={36} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="cursor-pointer hidden"
                  id="productImage"
                  onChange={handleUploadImage}
                  accept="image/*"
                />
              </label>
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 w-20 mt-1 min-w-20
                       bg-blue-50 border p-1 border-gray-400 my-2 relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(img)}
                        // loading="lazy"
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1
                       bg-red-500 hover:bg-red-600 rounded text-white
                      hidden group-hover:block cursor-pointer"
                      >
                        <MdDeleteOutline />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="" className="font-medium">
              Category
            </label>
            <div>
              <select
                name=""
                id=""
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find((el) => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  SetselectCategory("");
                }}
                className="bg-blue-50 border dark:bg-gray-600 border-green-400 w-full p-2 rounded"
              >
                <option value={""}>Select Category</option>
                {
                 
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>
                        {c.name}
                      </option>
                    );
                  })
                }
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id+index+"productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-1 dark:bg-gray-800 p-1"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoMdClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="" className="font-medium">
              Sub Category
            </label>
            <div className="">
              <select
                name=""
                id=""
                
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const SubCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, SubCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
                className="bg-blue-50 border border-green-400 w-full p-2 rounded dark:bg-gray-700"
              >
                <option value={""} className="text-neutral-500">
                  Select Sub Category
                </option>
            
                {allSubCategory.map((c, index) => {
                  return (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      // key={c._id+index+"productsection"}
                      key={c?._id || index}
                    className="text-sm flex items-center gap-1 bg-blue-50 mt-1 dark:bg-gray-800 p-1"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoMdClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              name="unit"
              required
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            rounded
            focus-within:border-green-500
            dark:bg-gray-800
            "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Number of Stock
            </label>
            <input
              type="number"
              id="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleChange}
              name="stock"
              required
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            rounded
            focus-within:border-green-500
            dark:bg-gray-800
            "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              name="price"
              required
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            rounded
            focus-within:border-green-500
            dark:bg-gray-800
            "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
              name="discount"
              required
              className="bg-blue-50 border p-2 outline-none
            border-gray-400
            rounded
            focus-within:border-green-500
            dark:bg-gray-800
            "
            />
          </div>
          {/* Add more field */}

          {Object.keys(data?.more_details)?.map((k, index) => {
            return (
              <div className="grid gap-1" key={k || index}>

                <label htmlFor={k} className="font-medium">
                  {k}
                </label>
                <input
                  type="text"
                  id={k}
                  value={data?.more_details[k]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((preve) => {
                      return {
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [k]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 border p-2 outline-none
                    border-gray-400
                    rounded
                    focus-within:border-green-500
                    dark:bg-gray-800
                    "
                />
              </div>
            );
          })}

          <div
            onClick={() => setopenAddField(true)}
            className=" hover:bg-green-500 bg-white py-1
           px-3 w-32 text-center font-semibold border-1 
           cursor-pointer rounded border-green-500
           dark:text-green-800
           dark:bg-green-300
            hover:text-neutral-700 
             dark:hover:text-black"
          >
            Add Fields
          </div>
          <button
            className="bg-green-400 hover:bg-green-500
         py-2 rounded font-semibold my-4 cursor-pointer dark:hover:bg-black/90 dark:bg-black/70"
          >
            Submit
          </button>
        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}
      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setfieldName(e.target.value)}
          submit={handleAddField}
          close={() => setopenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProduct;
