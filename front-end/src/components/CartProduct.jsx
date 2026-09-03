import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { validURLConvert } from "../utils/ValidUrlConverter";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
// import { formatTimeAgo } from "../utils/FormatTimeAgo";
import { formatProductDate } from "../utils/FormatDate";

const CartProduct = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;

  return (
    <Link
      to={url}
      className="border py-2 px-1 lg:p-4 gap-2 dark:bg-gray-500/30 border-gray-300 dark:border-transparent lg:min-w-56 grid lg:gap-4 min-w-auto rounded cursor-pointer bg-white"
    >
      {/* Product Image */}
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>

      {/* Delivery time and discount */}
      <div className="flex items-center gap-1 flex-col">
        <div className="rounded text-xs w-fit p-[1px] px-1 py-2 text-green-600 bg-green-100 dark:bg-blue-200 dark:text-blue-600">
         {formatProductDate(data.createdAt)}
        </div>
        {data.discount > 0 && (
          <p className="text-green-700 dark:bg-blue-600 dark:text-teal-50 font-medium bg-green-200 px-2 py-1 w-fit text-xs rounded-full">
            {data.discount}% discount
          </p>
        )}
      </div>

      {/* Product Name */}
      <div className="px-2 lg:px-0 font-medium text-ellipsis lg:text-base text-sm line-clamp-2 dark:text-blue-600">
        {data.name}
      </div>

      {/* Product Unit */}
      <div className="w-fit gap-1 lg:px-0 px-2 text-sm lg:text-base dark:text-white">
        {data.unit}
      </div>

      {/* Price and Cart Action */}
      <div className="px-2 lg:px-0 flex justify-between items-center gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="font-semibold dark:text-neutral-100">
          {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
        </div>
        <div>
          {data.stock === 0 ? (
            <p className="text-xs text-center text-red-600 dark:text-red-600">
              Out Of Stock
            </p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartProduct;
















// import React from "react";
// import { Link } from "react-router-dom";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import { validURLConvert } from "../utils/ValidUrlConverter";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import AddToCartButton from "./AddToCartButton";
// import { formatProductDate } from "../utils/FormatDate";

// const CartProduct = ({ data }) => {
//   const url = `/product/${validURLConvert(data.name)}-${data._id}`;

//   return (
//     <Link
//       to={url}
//       className="
//         w-full min-w-0
//         h-full
//         grid grid-rows-[auto_auto_1fr_auto_auto]
//         gap-2
//         rounded-lg
//         border border-gray-300
//         bg-white
//         px-2 py-3
//         shadow-sm
//         cursor-pointer
//         overflow-hidden
//         transition
//         hover:shadow-md
//         dark:bg-gray-500/30
//         dark:border-transparent
//       "
//     >
//       {/* Product Image */}
//       <div
//         className="
//           w-full
//           h-28
//           sm:h-32
//           lg:h-36
//           rounded-md
//           overflow-hidden
//           flex items-center justify-center
//         "
//       >
//         <img
//           src={data.image?.[0]}
//           alt={data.name}
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Date + Discount */}
//       <div className="w-full min-w-0 flex items-center gap-1 overflow-hidden">
//         <div
//           className="
//             min-w-0
//             max-w-full
//             rounded-md
//             px-2 py-1
//             text-[10px] sm:text-xs
//             text-green-600
//             bg-green-100
//             dark:bg-blue-200
//             dark:text-blue-600
//             truncate
//           "
//         >
//           {formatProductDate(data.createdAt)}
//         </div>

//         {data.discount > 0 && (
//           <p
//             className="
//               shrink-0
//               rounded-full
//               bg-green-200
//               px-2 py-1
//               text-[10px] sm:text-xs
//               font-medium
//               text-green-700
//               dark:bg-blue-600
//               dark:text-teal-50
//               whitespace-nowrap
//             "
//           >
//             {data.discount}% OFF
//           </p>
//         )}
//       </div>

//       {/* Product Name */}
//       <div
//         className="
//           min-w-0
//           px-1
//           font-medium
//           text-sm
//           lg:text-base
//           leading-5
//           line-clamp-2
//           break-words
//           dark:text-blue-600
//         "
//       >
//         {data.name}
//       </div>

//       {/* Product Unit */}
//       <div
//         className="
//           min-w-0
//           px-1
//           text-xs
//           sm:text-sm
//           lg:text-base
//           truncate
//           dark:text-white
//         "
//       >
//         {data.unit}
//       </div>

//       {/* Price + Cart Action */}
//       <div
//         className="
//           min-w-0
//           w-full
//           flex
//           items-center
//           justify-between
//           gap-2
//           px-1
//         "
//       >
//         {/* Price */}
//         <div
//           className="
//             min-w-0
//             flex-1
//             font-semibold
//             text-sm
//             sm:text-base
//             lg:text-lg
//             truncate
//             dark:text-neutral-100
//           "
//         >
//           {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//         </div>

//         {/* Cart Button */}
//         <div className="shrink-0">
//           {data.stock === 0 ? (
//             <p className="text-[10px] sm:text-xs text-center text-red-600 dark:text-red-600 whitespace-nowrap">
//               Out Of Stock
//             </p>
//           ) : (
//             <AddToCartButton data={data} />
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CartProduct;
