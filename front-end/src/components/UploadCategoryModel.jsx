// import React, { useState } from "react";
// import { IoClose } from "react-icons/io5";
// import uploadImage from "../utils/UploadImage";
// import Axios from "../utils/Axios";
// import SummaryApi from "./Common/SummerCommon";
// import toast from "react-hot-toast";
// import AxiosToastError from "../utils/AxiosToatsError";

// const UploadCategoryModel = ({ close, fetchData }) => {
//   const [data, setData] = useState({
//     name: "",
//     image: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const response = await Axios({
//         ...SummaryApi.addCategory,
//         data: data
//       });

//       console.log("Response:", response); // تحقق من الاستجابة في الكونسول

//       const { data: responseData } = response;

//       if (responseData.success) {
//         toast.success(responseData.message);
//         close();
//         fetchData();
//       } else {
//         toast.error(responseData.message || "Failed to add category");
//       }
//     } catch (error) {
//       console.error("Error:", error); // طباعة الخطأ في الكونسول
//       AxiosToastError(error)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUploadCategoryImage = async (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }

//     try {
//       const response = await uploadImage(file);
//       console.log("Image Upload Response:", response); // تحقق من الاستجابة

//       const { data: ImageResponse } = response;

//       setData((preve) => {
//         return {
//           ...preve,
//           image: ImageResponse.data.url,
//         };
//       });
//     } catch (error) {
//       console.error("Image Upload Error:", error);
//       toast.error("Failed to upload image");
//     }
//   };

//   return (
//     <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
//       <div className="bg-white max-w-4xl w-full p-4 rounded">
//         <div className="flex items-center justify-between">
//           <h1 className="font-semibold">Category</h1>
//           <button onClick={close} className="w-fit block ml-auto">
//             <IoClose size={25} />
//           </button>
//         </div>
//         <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label id="categoryName">Name</label>
//             <input
//               type="text"
//               id="categoryName"
//               placeholder="Enter category name"
//               value={data.name}
//               name="name"
//               onChange={handleOnChange}
//               className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
//             />
//           </div>
//           <div className="grid gap-1">
//             <p>Image</p>
//             <div className="flex gap-4 flex-col lg:flex-row items-center">
//               <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
//                 {data.image ? (
//                   <img
//                     alt="category"
//                     src={data.image}
//                     className="w-full h-full object-scale-down"
//                   />
//                 ) : (
//                   <p className="text-sm text-neutral-500">No Image</p>
//                 )}
//               </div>
//               <label htmlFor="uploadCategoryImage">
//                 <div
//                   className={`
//                             ${
//                               !data.name
//                                 ? "bg-gray-300"
//                                 : "border-green-300 hover:bg-green-400"
//                             }
//                                 px-4 py-2 rounded cursor-pointer border font-medium
//                             `}
//                 >
//                   Upload Image
//                 </div>

//                 <input
//                   disabled={!data.name}
//                   onChange={handleUploadCategoryImage}
//                   type="file"
//                   id="uploadCategoryImage"
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           <button
//             className={`
//                     ${
//                       data.name && data.image
//                         ? "bg-green-400 hover:bg-green-300"
//                         : "bg-gray-300 "
//                     }
//                     py-2
//                     font-semibold
//                     cursor-pointer
//                     `}
//           >
//             Add Category
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UploadCategoryModel;

// import React, { useState } from "react";
// import { IoClose } from "react-icons/io5";
// import uploadImage from "../utils/UploadImage";
// import Axios from "../utils/Axios";
// import SummaryApi from "../components/Common/SummerCommon";
// import toast from "react-hot-toast"
// import AxiosToatsError from "../utils/AxiosToatsError";

// const UploadCategoryModel = ({ close, fetchData }) => {
//   const [data, setData] = useState({
//     name: "",
//     image: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     setLoading(true);
//   //     const response = await Axios({
//   //       ...SummaryApi.addCategory,
//   //       data: data,
//   //     });
//   //     const { data: responseData } = response;

//   //     if (responseData.success) {
//   //       toast.success(responseData.message);
//   //       close();
//   //       fetchData();
//   //     }
//   //   } catch (error) {
//   //     AxiosToatsError(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       setLoading(true);
//       const response = await Axios({
//         ...SummaryApi.addCategory,
//         data: data,
//       });
  
//       console.log("API Response:", response); // تحقق من الاستجابة
  
//       const { data: responseData } = response;
  
//       if (responseData.success) {
//         toast.success(responseData.message);
//         close();
//         fetchData();
//       } else {
//         toast.error(responseData.message || "Failed to add category");
//       }
//     } catch (error) {
//       console.error("API Error:", error); // طباعة الخطأ في الكونسول
//       AxiosToatsError(error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   // const handleUploadCategoryImage = async (e) => {
//   //   const file = e.target.files[0];

//   //   if (!file) {
//   //     return;
//   //   }

//   //   const response = await uploadImage(file);
//   //   const { data: ImageResponse } = response;

//   //   setData((preve) => {
//   //     return {
//   //       ...preve,
//   //       image: ImageResponse.data.url,
//   //     };
//   //   });
//   // };


//   const handleUploadCategoryImage = async (e) => {
//     const file = e.target.files[0];
  
//     if (!file) return;
  
//     try {
//       const response = await uploadImage(file);
//       console.log("Image Upload Response:", response); // تحقق من الاستجابة
  
//       const { data: ImageResponse } = response;
  
//       setData((preve) => ({
//         ...preve,
//         image: ImageResponse.data.url,
//       }));
//     } catch (error) {
//       console.error("Image Upload Error:", error);
//       toast.error("Failed to upload image");
//     }
//   };



//   return (
//     <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
//       <div className="bg-white max-w-4xl w-full p-4 rounded">
//         <div className="flex items-center justify-between">
//           <h1 className="font-semibold">Category</h1>
//           <button onClick={close} className="w-fit block ml-auto">
//             <IoClose size={25} />
//           </button>
//         </div>
//         <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label id="categoryName">Name</label>
//             <input
//               type="text"
//               id="categoryName"
//               placeholder="Enter category name"
//               value={data.name}
//               name="name"
//               onChange={handleOnChange}
//               className="bg-blue-50 p-2 border border-blue-100 focus-within:border-green-200 outline-none rounded"
//             />
//           </div>
//           <div className="grid gap-1">
//             <p>Image</p>
//             <div className="flex gap-4 flex-col lg:flex-row items-center">
//               <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
//                 {data.image ? (
//                   <img
//                     alt="category"
//                     src={data.image}
//                     className="w-full h-full object-scale-down"
//                   />
//                 ) : (
//                   <p className="text-sm text-neutral-500">No Image</p>
//                 )}
//               </div>
//               <label htmlFor="uploadCategoryImage">
//                 <div
//                   className={`
//                             ${
//                               !data.name
//                                 ? "bg-gray-300"
//                                 : "border-green-400 hover:bg-green-300"
//                             }  
//                                 px-4 py-2 rounded cursor-pointer border font-medium
//                             `}
//                 >
//                   Upload Image
//                 </div>

//                 <input
//                   disabled={!data.name}
//                   onChange={handleUploadCategoryImage}
//                   type="file"
//                   id="uploadCategoryImage"
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           <button
//             className={`
//                     ${
//                       data.name && data.image
//                         ? "bg-green-400 hover:bg-green-200"
//                         : "bg-gray-300"
//                     }
//                     py-2    
//                     font-semibold 
//                     `}
//           >
//             Add Category
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UploadCategoryModel;


import React, { useState } from "react";

import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage"
import Axios from "../utils/Axios";
import SummaryApi from "./Common/SummerCommon";
import toast from "react-hot-toast";
import AxiosToatsError from "../utils/AxiosToatsError";
const UploadCategoryModel = ({close, fetchData}) =>{
  const testToast = ()=>{
    toast.success("done")
  }
  const [data,setData] = useState({
    name: "",
    image: ""
  })
const [loading,setLoading] = useState(false)
  const handleOnChange = (e) =>{
    const {name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data
      })
      // console.log(response)
      const {data: responseData} = response
    
     if(responseData.succuss){
      const message = responseData.message || "Category Added Succussfully"
      toast.success(message)
      
   
    close();
    fetchData()
     }

    }
    catch(error) {
      AxiosToatsError(error)
    }
    finally{
      setLoading(false)
    }
  }

  const handleUploadCategoryImage = async (e)=>{
    const file = e.target.files[0]

    if(!file){
      return
    }
  
    const response = await uploadImage(file)
   const {data: Imageresponse } = response

   setData((preve)=>{
    return {
      ...preve,
      image: Imageresponse.data.url
    }

   })

  }
  return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/80 bg-opacity-60 flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full p-4 rounded dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Category</h1>
              <button onClick={close} className="w-fit block ml-auto cursor-pointer">
                <IoClose size={25} />
              </button>
            </div>
            
            <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label id="categoryName">Name</label>
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"

                  value={data.name}
                  name="name"
                  onChange={handleOnChange}
                  className="bg-blue-50 p-2 border dark:bg-transparent border-blue-100 focus-within:border-green-200 outline-none rounded"
                />
              </div>
              <div className="grid gap-1">
                <p>Image</p>
                <div className="flex gap-4 flex-col lg:flex-row items-center">
                  <div className="border bg-blue-50 h-36 w-full lg:w-36 flex dark:bg-gray-700
                  items-center justify-center rounded">
                    {data.image ? (
                      <img
                        alt="category"
                        src={data.image}
                        className="w-full h-full object-scale-down"
                      />
                    ) : (
                      <p className="text-sm text-neutral-500">No Image</p>
                    )}
                  </div>
                  <label htmlFor="uploadCategoryImage">
                    <div
                      className={`
                                ${!data.name
                                    ? "bg-gray-300 dark:bg-gray-500"
                                    : "border-green-400 hover:bg-green-300 dark:hover:bg-green-800"
                                }  
                                    px-4 py-2 rounded cursor-pointer border font-medium
                                `}
                    >
                      Upload Image
                    </div>
    
                    <input
                      disabled={!data.name}
                      onChange={handleUploadCategoryImage}
                      type="file"
                      id="uploadCategoryImage"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
    
              <button
                className={`
                        ${data.name && data.image
                            ? "bg-green-400 hover:bg-green-300 "
                            : "bg-gray-300 dark:bg-gray-700"
                        }
                        py-2    
                        font-semibold
                        cursor-pointer 
                        dark:bg-gray-700
                        `}
              >
                Add Category
              </button>
            </form>
          </div>
        </section>
  )
  

}



export default UploadCategoryModel