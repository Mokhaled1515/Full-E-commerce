import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Axios from "../utils/Axios";
import SummaryApi from "./Common/SummerCommon";
import AxiosToatsError from "../utils/AxiosToatsError";
import CardLoading from "./CardLoading";
import CartProduct from "./CartProduct";
import { validURLConvert } from "../utils/ValidUrlConverter";
import toast from "react-hot-toast";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingPlaceholderCount = 6;

  useEffect(() => {
    const fetchCategoryWiseProduct = async () => {
      try {
        setLoading(true);
        const response = await Axios({
          ...SummaryApi.getProductByCategory,
          data: { id },
        });
        const { data: responseData } = response;
        if (responseData.success) {
          setData(responseData.data);
        }
      } catch (error) {
        AxiosToatsError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };




  const generateRedirectURL = () => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );

    const categorySlug = validURLConvert(name);
    const subcategorySlug = validURLConvert(subcategory?.name || "default");
    const subcategoryId = subcategory?._id; 

    return `/${categorySlug}-${id}/${subcategorySlug}-${subcategoryId}`;
  };


  const handleSeeAll = (e) => {
    if (loading) {
      e.preventDefault();
      return;
    }

    if (data.length === 0) {
      e.preventDefault();
      toast.error("Items not added!!");
      return;
    }

    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id),
    );

    if (!subcategory) {
      e.preventDefault();
      toast.error("Items not added!!");
      return;
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="container mx-auto p-4 flex justify-between items-center gap-4">
        <h3 className="font-semibold text-lg md:text-xl dark:text-cyan-50">
          {name}
        </h3>
        <Link
        onClick={handleSeeAll}
          to={generateRedirectURL()}
          className="text-green-600 dark:text-blue-600 dark:hover:text-blue-400 hover:text-green-400"
        >
          See All
        </Link>
      </div>

      {/* Product List with Horizontal Scroll */}
      <div className="relative flex items-center">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading
            ? Array.from({ length: loadingPlaceholderCount }).map(
                (_, index) => <CardLoading key={`loading-${index}`} />,
              )
            : data.map((p, index) => (
                <CartProduct key={`product-${p._id}-${index}`} data={p} />
              ))}
        </div>

        {/* Left/Right Scroll Buttons */}
        <div className="w-full absolute container mx-auto px-2 lg:flex hidden justify-between left-0 right-0">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white shadow-lg text-lg p-2 hover:bg-gray-300 rounded-full cursor-pointer dark:bg-gray-500/50"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white shadow-lg text-lg p-2 hover:bg-gray-300 rounded-full cursor-pointer dark:bg-gray-500/50"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
