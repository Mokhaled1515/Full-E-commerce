import React from "react";
import Banner from "../assets/309296.jpg";
import BannerMobile from "../assets/5939551_3075966.jpg";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/ValidUrlConverter";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const handleRedirectProductListpage = (id, cat) => {
    //  console.log(id,cat)
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
    //  console.log(url)
  };

  return (
    <section id="home" className="bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto">
        <div
          className={`w-full h-full bg-blue-200 min-h-48 rounded ${!Banner && "animate-pulse my-2"}`}
        >
          <img
            src={Banner}
            alt="Banner"
            className="w-full h-full rounded hidden lg:block"
            //  loading='lazy'
          />
          <img
            //  loading="lazy"
            src={BannerMobile}
            alt="Banner"
            className="w-full h-full lg:hidden"
          />
        </div>
      </div>

      {/* <div className="container mx-auto px-4 py-2 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-gray-100 rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-200 min-h-24 rounded"></div>
                  <div className="bg-blue-200 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((c, index) => {
              return (
                <div
                  key={c._id + "displayCategory"}
                  className="w-full cursor-pointer"
                  onClick={() => handleRedirectProductListpage(c._id, c.name)}
                >
                  <div className="w-full h-28 flex items-center justify-center">
                    <img
                      className="max-w-full max-h-full object-cover hover:scale-105 hover:transition-all"
                      src={c.image}
                      alt=""
                    />
                  </div>
                  <p className="text-center text-sm mt-2 dark:text-cyan-400">{c.name}</p>
                </div>
              );
            })}
      </div> */}

      <div
  className="
    container
    mx-auto
    px-2
    min-[300px]:px-3
    sm:px-4
    py-2
    my-2
    grid
    grid-cols-3
    min-[400px]:grid-cols-4
    sm:grid-cols-5
    md:grid-cols-8
    lg:grid-cols-10
    gap-x-2
    gap-y-4
    min-w-0
    max-w-full
  "
>
  {loadingCategory
    ? new Array(12).fill(null).map((_, index) => {
        return (
          <div
            key={index + "loadingcategory"}
            className="
              bg-gray-100
              rounded
              p-2
              sm:p-4
              min-h-32
              sm:min-h-36
              grid
              gap-2
              shadow
              animate-pulse
              min-w-0
              max-w-full
            "
          >
            <div className="bg-blue-200 min-h-20 sm:min-h-24 rounded"></div>
            <div className="bg-blue-200 h-8 rounded"></div>
          </div>
        );
      })
    : categoryData.map((c) => {
        return (
          <div
            key={c._id + "displayCategory"}
            className="
              w-full
              min-w-0
              max-w-full
              cursor-pointer
              overflow-hidden
            "
            onClick={() =>
              handleRedirectProductListpage(c._id, c.name)
            }
          >
            {/* Image */}
            <div
              className="
                w-full
                h-20
                min-[300px]:h-24
                sm:h-28
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >
              <img
                className="
                  max-w-full
                  max-h-full
                  object-contain
                  hover:scale-105
                  transition-transform
                  duration-200
                "
                src={c.image}
                alt={c.name}
              />
            </div>

            {/* Category name */}
            <p
              className="
                w-full
                min-w-0
                max-w-full
                text-center
                text-xs
                min-[300px]:text-sm
                mt-2
                px-1
                dark:text-cyan-400
                break-words
                whitespace-normal
                leading-tight
                overflow-wrap-anywhere
              "
            >
              {c.name}
            </p>
          </div>
        );
      })}
</div>

      {/* display category product */}
      {categoryData.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategoryWiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
