// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import SummaryApi from "../components/Common/SummerCommon";
// import AxiosToastError from "../utils/AxiosToatsError";
// import Axios from "../utils/Axios";
// import { FaAngleRight } from "react-icons/fa";
// import { FaAngleLeft } from "react-icons/fa";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import Divider from "../components/Divider";
// import image1 from "../assets/minute_delivery.png"
// import image2 from "../assets/Best_Prices_Offers.png"
// import image3 from "../assets/Wide_Assortment.png"
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import AddToCartButton from "../components/AddToCartButton";
// import { formatProductDate } from "../utils/FormatDate";
// const ProductDisplayPage = () => {

//   // const {product} = useParams()
//   // const decodedProduct = decodeURIComponent(product)
//   // console.log(decodedProduct)

//   const params = useParams();
//   let producrId = params?.product?.split("-")?.slice(-1)[0];
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//   })
//   const [image,setImage] = useState(0)
//   const [loading, setLoading] = useState(false);
//   const imageContainer = useRef()
//   const fetchProductDetails = async()=> {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProductDetails,
//         data : {
//           productId : producrId
//         }
//       })

//       const { data : responseData } = response

//       if (responseData.success) {
//         setData(responseData.data)
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(()=>{
//    fetchProductDetails()
//   },[params])

// const handleScrollRight = ()=>{
//   imageContainer.current.scrollLeft += 100
// }

// const handleScrollLeft = ()=>{
//   imageContainer.current.scrollLeft -= 100
// }
// // console.log("product data", data)
//   return (
//    <section className="container mx-auto p-4 grid lg:grid-cols-2">
//         <div className="">
//            <div id="boss" className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
//              <img src={data.image[image]}
//               alt=""
//               className="h-full w-full object-scale-down"/>

//            </div>
//            <div className="flex items-center justify-center gap-3 my-2">
//             {
//               data.image.map((img,index)=>{
//                 return(
//                  <div key={img+index+"point"} className={`bg-slate-100 my-2 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}>

//                  </div>
//                 )
//               })
//             }
//            </div>
//            <div className="grid relative">
//               <div ref={imageContainer} className="flex gap-4 justify-center items-center z-10 relative w-full overflow-x-auto scrollbar-none">
//                   {
//                   data.image.map((img,index)=>{
//                     return(
//                    <div id="div-nono-imgs" className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img+index}>
//                     <img src={img}
//                     alt="min-product"
//                     onClick={()=>setImage(index)}
//                     className="h-full w-full object-scale-down"
//                     id="imgs-nono"
//                      />

//                    </div>
//                     )
//                   })
//                   }
//               </div>
//               <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center">
//                 <button onClick={handleScrollLeft} className="z-10 bg-white relative p-1 rounded-full shadow-lg cursor-pointer">
//                 <FaAngleLeft />

//                 </button>
//                 <button onClick={handleScrollRight} className="z-10 bg-white relative p-1 rounded-full shadow-lg cursor-pointer">
//                   <FaAngleRight />
//                 </button>
//               </div>
//            </div>
//            <div>

//            </div>

//            <div className="dark:text-cyan-200 my-4 hidden lg:grid gap-3">
//              <div>
//                 <p className="font-semibold">Description</p>
//                 <p className="text-base">{data.description}</p>
//              </div>
//              <div>
//                 <p className="font-semibold">Unit</p>
//                 <p className="text-base">{data.unit}</p>
//              </div>
//              {
//               data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
//                 return(
//                   <div key={element+"more_details"+index}>
//                       <p className="font-semibold">{element}</p>
//                       <p className="text-base">{data?.more_details[element]}</p>
//                   </div>
//                 )
//               })
//              }
//            </div>
//         </div>

//         <div className="p-4 lg:pl-7 text-base lg:text-lg flex justify-center items-center flex-col">
//           <p className="bg-green-300 w-fit px-2 py-2 rounded-full dark:bg-sky-400">
//             {formatProductDate(data.createdAt)}
//           </p>
//             <h2 className="text-lg font-semibold lg:text-3xl dark:text-white">{data.name}</h2>
//             <p className="dark:text-white">{data.unit}</p>
//             <Divider/>
//             <div className="">
//               <p className="dark:text-blue-400">Price</p>
//             <div className="flex items-center gap-2 lg:gap-4 col">
//                 <div className="border border-green-500 dark:border-sky-300 px-4 py-2 bg-green-200 dark:bg-black/40 rounded w-fit">
//                       <p className="font-semibold text-lg lg:text-xl dark:text-white">{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
//                 </div>
//                 {
//                   data.discount && (
//                     <p className="line-through dark:text-white/60">{DisplayPriceInRupees(data.price)}</p>
//                   )
//                 }
//                 {
//                   data.discount && (
//                     <p className="font-bold text-green-600 dark:text-sky-300 lg:text-2xl">{data.discount}% <span className="text-base text-neutral-500 dark:text-gray-500">Discount</span></p>

//                   )
//                 }
//             </div>

//             </div>
//              {
//               data.stock === 0 ? (
//                 <p className="text-lg text-red-500 my-2">Out Of stock</p>
//               ) : (
//                 // <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded">Add</button>
//                 <div className="my-4">
//                   <AddToCartButton data={data}/>

//                 </div>
//               )
//              }
//             <h2 className="font-semibold dark:text-white/70">Why shop from Marmar?</h2>
//             <div>
//                 <div className="flex items-center gap-4 my-4">
//                     <img src={image1}
//                     alt="superfast delivery"
//                      className="h-20 w-20"
//                     />
//                     <div className="dark:text-white/60">
//                       <div className="font-semibold">Superfast Delivery</div>
//                       <p>Get your order delivered to your doorstep at the earliest frpm dark stores near you..</p>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-4 my-4">
//                     <img src={image2}
//                     alt="Best prices offers"
//                      className="h-20 w-20"
//                     />
//                     <div className="dark:text-white/60">
//                       <div className="font-semibold">Best Prices & Offers</div>
//                       <p>Best price destination with offers directly from the nanufacturers.</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-4 my-4">
//                     <img src={image3}
//                     alt="Wide Assortment"
//                      className="h-20 w-20"
//                     />
//                     <div className="dark:text-white/60">
//                       <div className="font-semibold">Wide Assortment</div>
//                       <p>Choose from 5000+ products across food personal care, household & other categories</p>
//                     </div>
//                 </div>
//             </div>

//             {/* only mobile */}
//             <div className="dark:text-cyan-200 my-4 grid gap-3">
//              <div>
//                 <p className="font-semibold">Description</p>
//                 <p className="text-base">{data.description}</p>
//              </div>
//              <div>
//                 <p className="font-semibold">Unit</p>
//                 <p className="text-base">{data.unit}</p>
//              </div>
//              {
//               data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
//                 return(
//                   <div key={element+"more_details"+index}>
//                       <p className="font-semibold">{element}</p>
//                       <p className="text-base">{data?.more_details[element]}</p>
//                   </div>
//                 )
//               })
//              }
//            </div>

//         </div>
//   </section>
//   )
// };

// export default ProductDisplayPage;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../components/Common/SummerCommon";
import AxiosToastError from "../utils/AxiosToatsError";
import Axios from "../utils/Axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";
import { formatProductDate } from "../utils/FormatDate";

const ProductDisplayPage = () => {
  const params = useParams();

  const producrId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const imageContainer = useRef(null);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: producrId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft += 100;
    }
  };

  const handleScrollLeft = () => {
    if (imageContainer.current) {
      imageContainer.current.scrollLeft -= 100;
    }
  };

  return (
    <section
      className="
        w-full
        max-w-full
        overflow-x-hidden
        container
        mx-auto
        px-2
        min-[300px]:px-3
        sm:px-4
        py-2
        sm:py-4
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-4
        lg:gap-6
      "
    >
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full min-w-0 max-w-full">
        {/* Main Image */}
        <div
          className="
            bg-white
            rounded
            w-full
            max-w-full
            min-w-0
            h-56
            min-[300px]:h-64
            sm:h-72
            lg:min-h-[65vh]
            lg:max-h-[65vh]
            lg:h-full
            overflow-hidden
          "
        >
          {data.image?.length > 0 && (
            <img
              src={data.image[image]}
              alt={data.name || "product"}
              className="h-full w-full max-w-full object-scale-down"
            />
          )}
        </div>

        {/* Dots */}
        <div
          className="
            flex
            items-center
            justify-center
            flex-wrap
            gap-2
            min-[300px]:gap-3
            my-2
          "
        >
          {data.image?.map((img, index) => (
            <button
              type="button"
              key={img + index + "point"}
              onClick={() => setImage(index)}
              aria-label={`Show image ${index + 1}`}
              className={`
                bg-slate-100
                w-3
                h-3
                sm:w-5
                sm:h-5
                rounded-full
                shrink-0
                ${index === image ? "bg-slate-300" : ""}
              `}
            />
          ))}
        </div>

        {/* Thumbnail Slider */}
        {/* <div className="relative w-full min-w-0 max-w-full">
          <div
            ref={imageContainer}
            className="
              flex
              gap-2
              sm:gap-4
              items-center
              w-full
              max-w-full
              min-w-0
              overflow-x-auto
              overflow-y-hidden
              scrollbar-none
              px-1
              py-1
              scroll-smooth
            "
          >
            {data.image?.map((img, index) => (
              <button
                type="button"
                onClick={() => setImage(index)}
                className="
                  w-16
                  h-16
                  min-w-16
                  min-h-16
                  sm:w-20
                  sm:h-20
                  sm:min-w-20
                  sm:min-h-20
                  shrink-0
                  cursor-pointer
                  shadow-md
                  bg-slate-50
                  rounded
                  overflow-hidden
                "
                key={img + index}
              >
                <img
                  src={img}
                  alt={`product thumbnail ${index + 1}`}
                  className="h-full w-full object-scale-down"
                />
              </button>
            ))}
          </div>

          {/* Desktop arrows */}
        <div
          className="
              hidden
              lg:flex
              absolute
              inset-y-0
              left-0
              right-0
              items-center
              justify-between
              pointer-events-none
            "
        >
          <button
            type="button"
            onClick={handleScrollLeft}
            className="
                pointer-events-auto
                bg-white
                p-2
                rounded-full
                shadow-lg
                cursor-pointer
              "
          >
            <FaAngleLeft />
          </button>

          <button
            type="button"
            onClick={handleScrollRight}
            className="
                pointer-events-auto
                bg-white
                p-2
                rounded-full
                shadow-lg
                cursor-pointer
              "
          >
            <FaAngleRight />
          </button>
        </div>
        {/* </div>  */}

        {/* Thumbnail Slider */}
        <div className="relative w-full min-w-0 max-w-full">
          <div
            ref={imageContainer}
            className="
      w-full
      min-w-0
      max-w-full
      overflow-x-auto
      overflow-y-hidden
      scrollbar-none
      scroll-smooth
      py-1
    "
          >
            <div
              className="
        flex
        w-max
        min-w-full
        items-center
        justify-center
        gap-2
        sm:gap-4
        px-1
      "
            >
              {data.image?.map((img, index) => (
                <button
                  type="button"
                  onClick={() => setImage(index)}
                  className="
            w-16
            h-16
            min-w-16
            min-h-16
            sm:w-20
            sm:h-20
            sm:min-w-20
            sm:min-h-20
            shrink-0
            cursor-pointer
            shadow-md
            bg-slate-50
            rounded
            overflow-hidden
            border
            border-transparent
            hover:border-green-400
            transition-colors
          "
                  key={img + index}
                >
                  <img
                    src={img}
                    alt={`product thumbnail ${index + 1}`}
                    className="h-full w-full object-scale-down"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop arrows */}
          <div
            className="
      hidden
      lg:flex
      absolute
      inset-y-0
      left-0
      right-0
      items-center
      justify-between
      pointer-events-none
    "
          >
            <button
              type="button"
              onClick={handleScrollLeft}
              className="
        pointer-events-auto
        bg-white
        p-2
        rounded-full
        shadow-lg
        cursor-pointer
      "
            >
              <FaAngleLeft />
            </button>

            <button
              type="button"
              onClick={handleScrollRight}
              className="
        pointer-events-auto
        bg-white
        p-2
        rounded-full
        shadow-lg
        cursor-pointer
      "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop Details */}
        <div className="dark:text-cyan-200 my-4 hidden lg:grid gap-3 min-w-0">
          <div className="min-w-0">
            <p className="font-semibold">Description</p>
            <p className="text-base break-words whitespace-normal">
              {data.description}
            </p>
          </div>

          <div className="min-w-0">
            <p className="font-semibold">Unit</p>
            <p className="text-base break-words">{data.unit}</p>
          </div>

          {data?.more_details &&
            Object.keys(data.more_details).map((element, index) => (
              <div key={element + "more_details" + index} className="min-w-0">
                <p className="font-semibold break-words">{element}</p>

                <p className="text-base break-words whitespace-normal">
                  {data.more_details[element]}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div
        className="
          w-full
          min-w-0
          max-w-full
          px-1
          min-[300px]:px-2
          sm:p-4
          lg:pl-7
          text-sm
          min-[300px]:text-base
          lg:text-lg
          flex
          justify-center
          items-center
          flex-col
          overflow-hidden
        "
      >
        {/* Date */}
        <p
          className="
            bg-green-300
            w-fit
            max-w-full
            px-2
            py-1
            sm:py-2
            rounded-full
            dark:bg-sky-400
            text-center
            break-words
          "
        >
          {formatProductDate(data.createdAt)}
        </p>

        {/* Product name */}
        <h2
          className="
            w-full
            min-w-0
            text-center
            text-lg
            sm:text-xl
            lg:text-3xl
            font-semibold
            dark:text-white
            break-words
            whitespace-normal
            overflow-wrap-anywhere
            my-1
          "
        >
          {data.name}
        </h2>

        <p className="w-full text-center dark:text-white break-words">
          {data.unit}
        </p>

        <div className="w-full my-2">
          <Divider />
        </div>

        {/* Price */}
        <div className="w-full min-w-0">
          <p className="dark:text-blue-400 mb-1">Price</p>

          <div
            className="
              flex
              items-start
              flex-wrap
              gap-2
              sm:gap-4
              w-full
              min-w-0
            "
          >
            {/* Current price */}
            <div
              className="
                border
                border-green-500
                dark:border-sky-300
                px-2
                min-[300px]:px-3
                sm:px-4
                py-2
                bg-green-200
                dark:bg-black/40
                rounded
                max-w-full
                min-w-0
              "
            >
              <p
                className="
                  font-semibold
                  text-base
                  sm:text-lg
                  lg:text-xl
                  dark:text-white
                  break-words
                "
              >
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount),
                )}
              </p>
            </div>

            {/* Old price */}
            {data.discount && (
              <p
                className="
                  line-through
                  dark:text-white/60
                  break-words
                  max-w-full
                  pt-2
                "
              >
                {DisplayPriceInRupees(data.price)}
              </p>
            )}

            {/* Discount */}
            {data.discount && (
              <p
                className="
                  font-bold
                  text-green-600
                  dark:text-sky-300
                  lg:text-2xl
                  break-words
                  pt-2
                "
              >
                {data.discount}%
                <span
                  className="
                    text-xs
                    sm:text-base
                    text-neutral-500
                    dark:text-gray-500
                    ml-1
                  "
                >
                  Discount
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Add to cart */}
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2 text-center">Out Of stock</p>
        ) : (
          <div className="my-4 max-w-full">
            <AddToCartButton data={data} />
          </div>
        )}

        {/* Why Marmar */}
        <h2 className="font-semibold dark:text-white/70 text-center break-words">
          Why shop from Marmar?
        </h2>

        <div className="w-full min-w-0">
          {/* Feature 1 */}
          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-4
              my-3
              sm:my-4
              min-w-0
              w-full
            "
          >
            <img
              src={image1}
              alt="superfast delivery"
              className="
                h-14
                w-14
                sm:h-20
                sm:w-20
                shrink-0
                object-contain
              "
            />

            <div className="dark:text-white/60 min-w-0 flex-1">
              <div className="font-semibold break-words">
                Superfast Delivery
              </div>

              <p className="break-words whitespace-normal">
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-4
              my-3
              sm:my-4
              min-w-0
              w-full
            "
          >
            <img
              src={image2}
              alt="Best prices offers"
              className="
                h-14
                w-14
                sm:h-20
                sm:w-20
                shrink-0
                object-contain
              "
            />

            <div className="dark:text-white/60 min-w-0 flex-1">
              <div className="font-semibold break-words">
                Best Prices & Offers
              </div>

              <p className="break-words whitespace-normal">
                Best price destination with offers directly from the
                manufacturers.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-4
              my-3
              sm:my-4
              min-w-0
              w-full
            "
          >
            <img
              src={image3}
              alt="Wide Assortment"
              className="
                h-14
                w-14
                sm:h-20
                sm:w-20
                shrink-0
                object-contain
              "
            />

            <div className="dark:text-white/60 min-w-0 flex-1">
              <div className="font-semibold break-words">Wide Assortment</div>

              <p className="break-words whitespace-normal">
                Choose from 5000+ products across food, personal care, household
                & other categories.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Details */}
        <div className="w-full min-w-0 dark:text-cyan-200 my-4 grid gap-3 lg:hidden">
          <div className="min-w-0">
            <p className="font-semibold">Description</p>

            <p className="text-sm sm:text-base break-words whitespace-normal">
              {data.description}
            </p>
          </div>

          <div className="min-w-0">
            <p className="font-semibold">Unit</p>

            <p className="text-sm sm:text-base break-words">{data.unit}</p>
          </div>

          {data?.more_details &&
            Object.keys(data.more_details).map((element, index) => (
              <div
                key={element + "mobile_more_details" + index}
                className="min-w-0"
              >
                <p className="font-semibold break-words">{element}</p>

                <p className="text-sm sm:text-base break-words whitespace-normal">
                  {data.more_details[element]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
