import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToatsError'
import Axios from '../utils/Axios'
import SummaryApi from '../components/Common/SummerCommon'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from "@tanstack/react-table"
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete  } from "react-icons/md";

import ViewImage from '../components/ViewImage'
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
const SubCategory = () => {
  const [openAddCategory,setopenAddCategory] = useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setopenEdit] = useState(false);
  const [editData, seteditData] = useState({
    _id: ""
  })

  const [deleteSubcategory,setdeleteSubcategory] = useState({
    _id: ""

  })
 const [openDeletConfirmBox,setopenConfirmBoxDelete] = useState(false)

  const fetchSubCategory = async ()=>{
    try{
      setLoading(true)
     const response = await Axios({
      ...SummaryApi.getSubCategory
     })
     const {data: responseData} = response
     if(responseData.success){
        setData(responseData.data)
     } 
    }
    catch(error){;
    AxiosToastError(error)
  }
  finally{
    setLoading(false)
  }
}
useEffect(()=>{
  fetchSubCategory()
},[])

const column = [
columnHelper.accessor('name',{
  header: 'Name'
}),
columnHelper.accessor('image',{
  header: 'Image',
  cell : ({row})=>{
    // console.log("row")
    return <div className='flex justify-center items-center '> 
          <img 
        src={row.original.image}
        alt={row.original.name}
        className='w-8 h-10 cursor-pointer object-cover'
        onClick={()=>{
          setImageURL(row.original.image)
        }}
        />
    </div>
  }
}),
columnHelper.accessor('category',{
  header: "Category",
  cell: ({row}) =>{
    return (
      <>
       {
        row.original.category.map((c,index)=>{
          return (
            <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
          )
        })
       }
      </>
    )
  }
}),
columnHelper.accessor('_id',{
  header: "Action",
  cell: ({row})=>{
    return(
      <div className='flex items-center justify-center gap-3'>
        <button onClick={()=>{
          setopenEdit(true)
          seteditData(row.original)
        }} className='cursor-pointer p-2 text-green-400 bg-green-200 rounded-full hover:text-green-600'>
        <BiSolidPencil size={20}/>
        </button>
        <button onClick={()=>{
          setopenConfirmBoxDelete(true)
          setdeleteSubcategory(row.original)
          }} className='cursor-pointer p-2 bg-red-200 text-red-500 rounded-full hover:text-red-600'>
        <MdDelete  size={20}/>
        </button>
      </div>
    )
  }
})
]

const handleDeleteSubCategory = async ()=>{
 try{
 const response = await Axios({
  ...SummaryApi.deleteSubCategory,
  data: deleteSubcategory
 })
 const { data : responseData} = response
 if(responseData.success){
 toast.success(responseData.message)
 fetchSubCategory()
 setopenConfirmBoxDelete(false)
 setdeleteSubcategory({_id: ""})
 }
 }
 catch(error){
  AxiosToastError(error)
 }
}
return (
    <section className="">
    <div className="p-2 shadow-md flex justify-between items-center">
      <h2 className="font-semibold ">Sub Category</h2>
      <button
        onClick={()=>setopenAddCategory(true)}
        className="text-sm border border-green-300 cursor-pointer
         hover:bg-green-400 px-3 py-1 rounded
         dark:text-white dark:hover:bg-black
         "
      >
        Add Sub Category
      </button>
    </div>
    
    <div className='overflow-auto w-full max-w-[95vw]'>
      <DisplayTable
      data={data}
      column={column}
      />
    </div>


    {
      openAddCategory && (
        <UploadSubCategoryModel
         close={()=>setopenAddCategory(false)}
         fetchData={fetchSubCategory}
        />
      )
    }

    {
       ImageURL &&
      <ViewImage url={ImageURL} close={()=>setImageURL('')}/>
    }

    {
      openEdit &&
     <EditSubCategory
      data={editData}
       close={()=> setopenEdit(false)}
       fetchData={fetchSubCategory}
       />
    }

    {
      openDeletConfirmBox && (
        <ConfirmBox
        cancel={()=>setopenConfirmBoxDelete(false)}
        close={()=>setopenConfirmBoxDelete(false)}
        confirm={handleDeleteSubCategory}
        />
      )
    }

    </section>
  )
}

export default SubCategory