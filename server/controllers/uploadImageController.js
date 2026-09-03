// const uploadImageController = async (req,res)=>{
//     try{
//     const file = req.file
//     const uploadImage = await uploadImageController(file)
    
//     return  res.json({
//         message: "upload done",
//         data: uploadImage,
//         success: true,
//         error: false
    
//     })
//     }
//     catch(error){
//         return res.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         })
//     }
//     }
    
//     export default uploadImageController



// دالة تقوم برفع الصورة إلى Cloudinary
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error("No file uploaded");
    }

    // هنا نستدعي الدالة التي ترفع الصورة فعليًا
    const uploadResult = await uploadImageCloudinary(file);

    return res.json({
      message: "upload done",
      data: uploadResult,
      success: true,
      error: false
    });

   

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export default uploadImageController;