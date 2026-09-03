// import React from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import { FaCartShopping } from 'react-icons/fa6'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { Link } from 'react-router-dom'
// import { FaCaretRight } from "react-icons/fa";
// import { useSelector } from 'react-redux'

// const CartMobileLink = () => {
//     const {totalPrice,totalQty} = useGlobalContext()
//     const cartItem = useSelector(state => state.cartItem.cart) 
//   return (

//     <>
//     {
//       cartItem[0] && (
//           <div className='sticky py-4 bg-blue-100 dark:bg-black'>
//               <div className="bg-green-700 dark:bg-blue-800 px-2 py-2 rounded text-neutral-100 text-sm flex justify-between items-center gap-3 lg:hidden">
//               <div className='flex items-center gap-2'>
//                 <div className='p-2 bg-green-600 dark:bg-blue-600/90 rounded w-fit'>
//                   <FaCartShopping />
//                 </div>
//                 <div className='text-xs'>
//                         <p>{totalQty} items</p>
//                         <p>{DisplayPriceInRupees(totalPrice)}</p>
//                 </div>
//               </div>
                

//                 <Link to={"/cart"} className='flex items-center gap-1'>
//                   <span className='text-sm'>View Cart</span>
//                   <FaCaretRight />
//                 </Link>
//               </div>
//           </div>
   
//       )
//     }
//     </>
 
//   )
// }

// export default CartMobileLink















import React from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// Component to display a floating cart summary link on mobile
const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  if (cartItem.length === 0) return null;

  return (
    <div className="sticky py-4 bg-blue-100 dark:bg-black">
      <div className="bg-green-700 dark:bg-blue-800 px-2 py-2 rounded text-neutral-100 text-sm flex justify-between items-center gap-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-600 dark:bg-blue-600/90 rounded w-fit">
            <FaCartShopping />
          </div>
          <div className="text-xs">
            <p>{totalQty} items</p>
            <p>{DisplayPriceInRupees(totalPrice)}</p>
          </div>
        </div>

        <Link to="/cart" className="flex items-center gap-1">
          <span className="text-sm">View Cart</span>
          <FaCaretRight />
        </Link>
      </div>
    </div>
  );
};

export default CartMobileLink;
