import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToatsError";
import toast from "react-hot-toast";
import { setUserDeatils } from "../store/UserSlice";
import fetchUserDetails from "../utils/fetchUserDetails";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
 
useEffect(()=>{
 setUserData({
  name: user.name,
    email: user.email,
    mobile: user.mobile,
 })
},[user])

 
const handleSubmit = async (e) => {
e.preventDefault()
try{
  setLoading(true)
  // const response = await Axios({  
  //   ...SummaryApi.upadteUserDetails,
  //   data: userData,
  // })
  const response = await Axios.put('/api/user/update-user', userData);
  // console.log(response)
  const { data : responseData } = response

  if(responseData.success){
    toast.success(responseData.message)
    const userData = await fetchUserDetails();
    dispatch(setUserDeatils(userData.data));
  }
}
catch(error){
AxiosToastError(error)
} finally{
  setLoading(false)
}
}
const handelOnChange = (e) => {
  const { name, value } = e.target;

  setUserData((preve) => {
    return {
      ...preve,
      [name]: value,
    };
  });
};
  return (
    <div className="p-4">
      <div
        className="w-20 h-20 bg-neutral-200 dark:bg-gray-900 items-center flex justify-center
       rounded-full overflow-hidden drop-shadow-sm"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"/>
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm cursor-pointer border-1 px-3 py-1 rounded-full
       border-blue-300 hover:border-blue-600 hover:bg-blue-400
        hover:text-white mt-3 min-w-20"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}
      <form action="" className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="p-2 bg-green-200 outline-none border
             border-gray-400 rounded-sm focus-within:border-yellow-400
             dark:bg-gray-800
             "
            value={userData.name}
            onChange={handelOnChange}
            name="name"
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="p-2 bg-green-200 outline-none border
             border-gray-400 rounded-sm focus-within:border-yellow-400
             dark:bg-gray-800"
            value={userData.email}
            onChange={handelOnChange}
            name="email"
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Your Mobile"
            className="p-2 bg-green-200 outline-none border
             border-gray-400 rounded-sm focus-within:border-yellow-400
             dark:bg-gray-800
             "
            value={userData.mobile}
            onChange={handelOnChange}
            name="mobile"
            required
          />
        </div>
        <button
          className="border border-gray-300 py-2 font-semibold
      hover:bg-blue-600 bg-blue-500 cursor-pointer
       rounded-sm dark:text-black focus-within:border-sky-800"
        >
          
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  );
};

export default Profile;
