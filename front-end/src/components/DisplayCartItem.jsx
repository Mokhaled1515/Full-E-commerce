import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from "../assets/empty_cart.webp"
import toast from 'react-hot-toast'
const DisplayCartItem = ({close}) => {
   const { notDiscountTotalPrice, totalPrice,totalQty } = useGlobalContext()
   const cartItem = useSelector(state => state.cartItem.cart)
   const user = useSelector(state => state.user)
   const navigate = useNavigate()
   const RedirectToCheakOutPage = ()=>{
     if(user?._id){
         navigate("/cheakout")
         if(close){
            close()
         }
         return
     }  
      toast("please Login")
   }
   return (
    <section className='bg-neutral-900/50 fixed top-0 bottom-0 right-0 left-0 z-50 '>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto dark:bg-gray-900 dark:text-white'>
            <div className='flex items-center p-4 shadow-xl dark:bg-gray-950 gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                <IoMdClose size={20}/>
                </Link>
                <button onClick={close} className='cursor-pointer hidden lg:block'>
                    <IoMdClose size={20}/>
                </button>
            </div>
            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 dark:bg-gray-900 p-2 flex flex-col gap-4'>
                {/* display items */}
                {
                    cartItem[0] ? (
                                <>
     
                                            <div className='flex items-center justify-between px-2 py-2 bg-blue-100 dark:bg-blue-500 dark:text-blue-100 text-blue-500 rounded-full '>
                                                <p>Your total savings</p>
                                                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                            </div>
                                            <div className='bg-white dark:bg-transparent rounded-lg p-4 grid gap-6 overflow-auto scrollcarCustome'>
                                            {
                                                cartItem[0] && (
                                                    cartItem.map((item,index)=>{
                                                    return (
                                                        <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-4'>
                                                            <div className='w-16 h-16 min-h-16 min-w-16 bg-white border border-gray-300 rounded'>
                                                                <img src={item?.productId?.image[0]}
                                                                className='object-scale-down w-full h-full'
                                                                />
                                                            </div>
                                                            <div className='w-full max-w-sm text-xs'>
                                                                <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                                <p className='text-slate-400 dark:text-slate-400 '>{item?.productId?.unit}</p>
                                                                <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                                            </div>
                                                            <div>
                                                                <AddToCartButton data={item?.productId}/>
                                                            </div>
                                                        </div>
                                                    )
                                                    })
                                                )
                                            }
                                            </div>
                                            <div className='bg-white p-4 dark:bg-black w-full'>
                                                 <h3 className='font-semibold'>Bill Details</h3>
                                                 <div className='flex gap-4 justify-between ml-1'>
                                                    <p>Items total</p>
                                                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>{DisplayPriceInRupees(totalPrice)}<span></span></p>
                                                 </div>
                                                 <div className='flex gap-4 justify-between ml-1'>
                                                    <p>Quntity total</p>
                                                    <p className='flex items-center gap-2'>{totalQty} item</p>
                                                 </div>
                                                 <div className='flex gap-4 justify-between ml-1'>
                                                    <p>Delivery Charge</p>
                                                    <p className='flex items-center gap-2'>Free</p>
                                                 </div>
                                                 <div  className='font-semibold flex items-center justify-between gap-4'>
                                                    <p>Grand total</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                 </div>
                                            </div>
           
                                </>
                    ) : (
                                <div className='bg-white flex flex-col justify-center items-center'>
                               <img 
                               src={imageEmpty}
                               className='w-full h-full object-scale-down'
                               />
                               <Link onClick={close} to={"/"} className='cursor-pointer block dark:bg-black bg-green-600 hover:bg-green-500 dark:hover:bg-neutral-800 px-4 py-2 text-white rounded my-1'>Shop Now</Link>
                                </div>
                    )
                }
      


            
            </div>
               {
                cartItem[0] && (
                    <div className='p-2'>
            
                            <div className='bg-green-700 dark:bg-blue-800 text-neutral-200 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                                <div>
                                    {DisplayPriceInRupees(totalPrice)}
                                </div>
                              
                                <button onClick={RedirectToCheakOutPage} className='flex items-center gap-1 cursor-pointer'>
                                    Proceed
                                    <span>
                                        <FaCaretRight/>
                                    </span>
                                </button>
                            </div>
                    </div>
                )
               }
       
      </div>
 </section>
   )  
   
}

export default DisplayCartItem