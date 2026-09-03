import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAdress from "../components/AddAdress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToatsError";
import Axios from "../utils/Axios";
import SummaryApi from "../components/Common/SummerCommon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";

const CheakoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()
  
  const handleCashOnDeliverry = async ()=>{

    try {
       const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data : {
          list_items : cartItemsList,
          addressId : addressList[selectAddress]?._id, 
          subTotalAmt : totalPrice,
          totalAmt : totalPrice,
           
        }
       })

        const { data:responseData } = response

        if(responseData.success){
             toast.success(responseData.message)
             if(fetchCartItem){
              fetchCartItem()
              
             }
             if(fetchOrder){
              fetchOrder()
             }
             
             navigate('/success',{
              state: {
                text: 'Order'
              }
             })
        }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  
   const handleOnlinePayment = async ()=>{
        try {
          toast.loading("Loading...")
          const stripePublic_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY
          const stripePromise = await loadStripe(stripePublic_key)




          const response = await Axios({
            ...SummaryApi.payment_url,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id, 
              subTotalAmt : totalPrice,
              totalAmt : totalPrice,
            }
          })

         const { data: responseData } = response

      
        stripePromise.redirectToCheckout({ sessionId : responseData.id })

        if(fetchCartItem){
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }

        } catch (error) {
          AxiosToastError(error)
        }
   }

  return (
    <section className="bg-blue-50 dark:bg-transparent dark:text-amber-300">
      <div className="container mx-auto p-4 flex lg:flex-row w-full gap-4 flex-col justify-between">
        <div className="w-full">
          {/* address */}
          <h3 className="text-lg font-semibold dark:text-white">
            Choose your address
          </h3>
          <div className="bg-white dark:bg-transparent p-2 grid gap-4">
            {addressList.map((address, index) => {
              return (
                <label
                  key={address + index}
                  htmlFor={"address" + index}
                  className={!address.state && "hidden"}
                >
                  <div
                    key={address + "addressList" + index}
                    className="border dark:text-sky-300 border-gray-300 rounded p-3 flex gap-3 hover:bg-blue-50 dark:hover:bg-neutral-900"
                  >
                    <div>
                      <input
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectAddress(e.target.value)}
                        name="address"
                        className="cursor-pointer"
                        id={"address" + index}
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 font-semibold cursor-pointer dark:text-sky-500 bg-green-50 dark:bg-neutral-700 border-2 border-dashed flex justify-center items-center border-gray-300"
            >
              Add address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2 dark:bg-transparent">
          {/* summary */}
          <h3 className="text-lg font-semibold dark:text-white">Summary</h3>
          <div className="bg-white p-4 dark:text-white dark:bg-black w-full">
            <h3 className="font-semibold ">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                {DisplayPriceInRupees(totalPrice)}
                <span></span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Quntity total</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <button 
            onClick={handleOnlinePayment}
            className="cursor-pointer py-2 px-4 bg-green-600
             hover:bg-green-700 rounded w-full
              dark:bg-blue-900 dark:hover:bg-blue-950
               text-white font-semibold">
              Online Payment
            </button>
            <button
              
              className="cursor-pointer py-2 px-4 border-2
               border-green-600 font-semibold text-green-600
                hover:bg-green-600 hover:text-white
                 dark:hover:bg-blue-900
                  dark:border-blue-400 dark:text-white"
                  onClick={handleCashOnDeliverry}
            >
              
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>
      {openAddress
      && <AddAdress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheakoutPage;
