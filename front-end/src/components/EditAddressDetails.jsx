import React from 'react'
import Axios from '../utils/Axios';
import { useForm } from "react-hook-form"
import { IoClose } from "react-icons/io5";
import SummaryApi from './Common/SummerCommon';
import toast from "react-hot-toast";
import AxiosToastError from '../utils/AxiosToatsError';
import { useGlobalContext } from '../provider/GlobalProvider';


const EditAddressDetails = ({close, data}) => {
    const { register, handleSubmit,reset} = useForm({
        defaultValues: {
            _id : data._id,
            userId : data.userId,
            address_line : data.address_line,
            city : data.city,
            state : data.state,
            pincode : data.pincode,
            country : data.country,
            mobile : Number(data.mobile)
        }
    })
    const { fetchAddress } = useGlobalContext()
  const OnSubmit = async (data)=>{
    try{

    const response = await Axios({
      ...SummaryApi.updateAddress,
      data: {
        ...data,
        address_line : data.address_line,
        city : data.city,
        state : data.state,
        pincode : data.pincode,
        country : data.country,
        mobile : Number(data.mobile)
      }
    })
    const { data : responseData } = response
            
    if(responseData.success){
      toast.success(responseData.message)
        if(close){
            close()
            reset()
            fetchAddress()
            
        }
    }
} catch (error) {
  AxiosToastError(error)
}
}
  return (
    <section className='bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50 h-screen overflow-auto'>
       <div className='bg-white dark:text-sky-400 dark:bg-black p-4 w-full max-w-lg mt-8 mx-auto rounded'>
           <div className='flex justify-between items-center'>
           {/* <div className='flex justify-between items-center'> */}
              <h2 className='font-semibold'>Edit Address</h2>
              <button className='cursor-pointer hover:text-red-500' onClick={close}>
                <IoClose size={25}/>
              </button>
           </div>
           {/* <button onClick={close} className='cursor-pointer'>
           <IoClose size={25} />

           </button> */}
           {/* </div> */}
            <form action="" className='mt-4 grid gap-4' onSubmit={handleSubmit(OnSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor="addressline">Address Line :</label>
                    <input type="text"
                    id='addressline'
                    required
                    className='border bg-blue-50 p-2 rounded dark:bg-gray-800 border-blue-200 outline-0'
                 {...register("address_line",{required: true})}
                />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="city">City :</label>
                    <input type="text"
                    required
                    id='city'
                    className='border bg-blue-50 p-2 dark:bg-gray-800 rounded border-blue-200 outline-0'
                 {...register("city",{required: true})}
                />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="state">State :</label>
                    <input type="text"
                    required
                    id='state'
                    className='border bg-blue-50 p-2 dark:bg-gray-800 rounded border-blue-200 outline-0'
                 {...register("state",{required: true})}
                />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="pincode">Pincode :</label>
                    <input type="text"
                    id='pincode'
                    required
                    className='border bg-blue-50 p-2 dark:bg-gray-800 rounded border-blue-200 outline-0'
                 {...register("pincode",{required: true})}
                />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="country">Country :</label>
                    <input type="text"
                    required
                    id='country'
                    className='border bg-blue-50 p-2 dark:bg-gray-800 rounded border-blue-200 outline-0'
                 {...register("country",{required: true})}
                />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="mobile">Mobile Num :</label>
                    <input type="text"
                    id='mobile'
                    required
                    className='border bg-blue-50 p-2 dark:bg-gray-800 rounded border-blue-200 outline-0'
                 {...register("mobile",{required: true})}
                />
                </div>


                <button type='submit' className='bg-yellow-500 cursor-pointer dark:bg-blue-800 dark:hover:bg-sky-700 font-semibold da mt-4 hover:bg-yellow-400 dark:text-white py-2 w-full'>Submit</button>
            </form>
       </div>
    </section>
  )
}

export default EditAddressDetails