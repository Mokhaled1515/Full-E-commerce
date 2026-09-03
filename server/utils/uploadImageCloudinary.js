// import { v2 as cloudinary } from 'cloudinary';
// cloudinary.config({
//     cloud_name : process.env.CLOUDNAIRY_CLOUD_NAME,
//     api_key: process.env.CLOUDNAIRY_API_KEY,
//     api_secret: process.env.CLOUDNAIRY_API_SECRET_KEY
// })
// const uploadImageCloudinary = async (image) => {
//     const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
  



// const uploadImage = await new Promise((resolve,reject)=>{
// cloudinary.uploader.upload_stream({ folder: "Marmar"},(error,uploadResult)=>{
// return resolve(uploadResult)    
// }).end(buffer)
// })
// return uploadImage
// }

// export default uploadImageCloudinary




import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAIRY_CLOUD_NAMEE,
  api_key: process.env.CLOUDNAIRY_API_KEYY,
  api_secret: process.env.CLOUDNAIRY_API_SECRET_KEYY,
});

const uploadImageCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Marmar" },
      (error, uploadResult) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        return resolve(uploadResult);
      }
    );
    stream.end(buffer);
  });
};

export default uploadImageCloudinary;