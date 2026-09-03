import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "./Common/SummerCommon.js";
import AxiosToastError from "../utils/AxiosToatsError.js";
import { updateAvatar } from "../store/UserSlice.js";
import { IoMdClose } from "react-icons/io";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
 
 
  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];
  
 if(!file){
 return 
 }
    const formData = new FormData();
    formData.append("avatar", file);
  

   
  try{
    setLoading(true)

    const response = await Axios({
      ...SummaryApi.uploadAvatar,
      data: formData
    })
    const { data: responseData } = response
    dispatch(updateAvatar(responseData.data.avatar))
  }
  catch(error){
    AxiosToastError(error)
  } finally{
    setLoading(false)
  }

    
 


};
  return (
    <section
      className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/90 
       0 p-4 flex items-center justify-center"
    >
      
      <div className="bg-white dark:bg-gray-700 max-w-sm w-full rounded p-4 flex flex-col gap-2.5 justify-center items-center">
      <button onClick={(close)} className="text-neutral-900 cursor-pointer w-fit block ml-auto dark:text-white">
      <IoMdClose size={22}/>

      </button>
        <div
          className="w-16 h-16 bg-neutral-200 dark:bg-black items-center justify-center
                            rounded-full overflow-hidden drop-shadow-md"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full opacity-100 object-cover"
            />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">

          <div className="border cursor-pointer px-2 rounded hover:text-white text-sm py-1 border-green-300 hover:bg-green-400">
          
          {
           loading ? "Loading..." : "Upload"
          }
        </div>
        <input
            type="file"
            id="uploadProfile"
            className="hidden"
            onChange={handleUploadAvatarImage}
          />
          </label>

          
        </form>
       
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
