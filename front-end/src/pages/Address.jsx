import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAdress from '../components/AddAdress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../components/Common/SummerCommon';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToatsError';
import { useGlobalContext } from '../provider/GlobalProvider';


const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const {fetchAddress} = useGlobalContext()

  const handleDisableAddress = async (id)=>{
     try {
      const response = await Axios({
         ...SummaryApi.deleteAddress,
         data: {
          _id : id
         }
      })
      const {data: responseData } = response
      if(responseData.success){
          toast.success("Address Remove")
          if(fetchAddress){
            fetchAddress()
          }

      }
     } catch (error) {
       AxiosToastError(error)
     }
  }
  return (
    
    <div className=''>
            <div className='bg-blue-50 dark:bg-black shadow-md px-2 py-2 flex justify-between gap-4 items-center'>
               <h2 className='font-semibold text-ellipsis dark:text-blue-400 line-clamp-1'>Address</h2>
               <button onClick={()=>setOpenAddress(true)}
                className='cursor-pointer border border-green-400
                 text-green-400 px-3 hover:bg-green-400
                  hover:text-black py-1 rounded-full
                  dark:bg-blue-400
                  dark:text-black
                  dark:border-sky-200
                  dark:hover:bg-blue-500
                  '>
                 Add Address
               </button>
            </div>
            <div className="bg-white dark:bg-transparent p-2 grid gap-4">
                {
                  addressList.map((address,index)=>{
                    return (
                     
                      <div key={address+"addressList"+index} 
                       className={`border border-gray-300 rounded 
                       p-3 flex gap-3 hover:bg-blue-50
                       dark:text-blue-100
                        dark:hover:bg-gray-800
                        ${!address.status && 'hidden'}
                        `}>
                                
                                <div className='w-full'>
                                    <p>{address.address_line}</p>
                                    <p>{address.city}</p>
                                    <p>{address.state}</p>
                                    <p>{address.country} - {address.pincode}</p>
                                    <p>{address.mobile}</p>
                                </div>
                                <div className='grid gap-10'>
                                   <button 
                                   onClick={()=> {
                                    setOpenEdit(true)
                                    setEditData(address)                                  
                                  }}
                                    className='cursor-pointer bg-green-200 p-1 dark:text-black rounded hover:text-white hover:bg-green-600'>
                                   <MdEdit size={20}/>
                                   </button>
                                   <button onClick={()=>
                                       handleDisableAddress(address._id)
                                   } className='cursor-pointer p-1 dark:text-black bg-red-200 rounded hover:text-white hover:bg-red-600'>
                                   <MdDelete size={20}/>
                                   </button>
                                  
                                </div> 
                          </div>
                     
                    )
                  })
                }
                 <div onClick={()=>setOpenAddress(true)} className="h-16 dark:text-blue-700 font-semibold cursor-pointer bg-green-50 dark:bg-gray-900 border-2 border-dashed flex justify-center items-center border-gray-300">
                       Add address
                 </div>

           </div>

           {
            openAddress && (
              <AddAdress close={()=>setOpenAddress(false)}/>
            )
           }


           {
            OpenEdit && (
              <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
            )
           }
    </div>
  )
}

export default Address