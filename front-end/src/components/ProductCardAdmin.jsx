import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import { IoClose } from 'react-icons/io5'
import SummaryApi from './Common/SummerCommon'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToatsError'
import toast from 'react-hot-toast'
const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen,setEditOpen] = useState(false)
  const [openDelete,setOpenDelete] = useState(false)
  const handleDeleteCanel = ()=>{
    setOpenDelete(false)
  }
  const handleDelete = async ()=>{
try{
const response = await Axios({
  ...SummaryApi.deleteProduct,
  data: {
    _id: data._id
  }
})

const {data: responseData } = response
if(responseData.success){
toast.success(responseData.message)
if(fetchProductData){
  fetchProductData()
}
setOpenDelete(false)
}
}
catch(error){
AxiosToastError(error)
}
  }
  return (
    <div className='w-36 p-4 bg-white  rounded'id='nono-Card'>
        <div className=''>
            <img src={data?.image[0]} alt={data?.name}
            // loading='lazy'
            className='w-full h-full object-scale-down dark:rounded'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-500 dark:text-slate-300'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-2 py-2 forme'>
          <button onClick={()=>setEditOpen(true)} className='cursor-pointer border dark:bg-green-600 dark:text-white dark:border-green-300 dark:hover:bg-green-500 border-green-600 hover:bg-green-300 rounded text-green-800 bg-green-100 px-1 py-1 text-sm'>Edit</button>
          <button onClick={()=>setOpenDelete(true)} className='cursor-pointer border dark:bg-red-800 dark:text-white dark:hover:bg-red-700 border-red-400 hover:bg-red-300 rounded text-red-700 bg-red-200 px-1 py-1 text-sm'>Delete</button>
        </div>
        {
          editOpen && (
            <EditProductAdmin fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)}/>

          )
        }
       {
        openDelete && (
          <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600/80 z-50 p-4 flex justify-center items-center'>
              <div className='bg-white p-4 w-full max-w-md dark:bg-black rounded'>
                  <div className='flex justify-between items-center gap-4'>
                    <h3 className='font-semibold'>Permanent Delete</h3>
                    <button className='cursor-pointer' onClick={()=>setOpenDelete(false)}>
                        <IoClose size={25}/>
                    </button>
                  </div>
                  <p>Are You Sure want to delete permanent ?</p>
                  <div className='flex justify-end gap-5 py-4'>
                    <button onClick={handleDeleteCanel} className='cursor-pointer border px-3 py-1 rounded bg-red-100 text-red-600 border-red-400 hover:bg-red-200'>Cancel</button>
                    <button onClick={handleDelete} className='cursor-pointer border px-3 py-1 rounded bg-green-100 text-green-600 border-green-400 hover:bg-green-200'>Delete</button>
                  </div>
              </div>
          </section>
        )
       }
    </div>
  )
}

export default ProductCardAdmin