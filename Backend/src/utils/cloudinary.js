import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

  
//  const uploadOnClodinary = async (localFilePath) => {
//     try {
//       if(!localFilePath) return null;

//        const response = await cloudinary.uploader.upload(localFilePath, {
//           resource_type: 'auto'
//        })

//        fs.unlinkSync(localFilePath) //To remove the file from local once uploaded on cloudinary

//        return response

//     } catch (error) {
//       fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//       return null
//     }
//  }

const destroyCloudVideo = async (localFilePath) => {
    try {
       const result = await cloudinary.uploader.destroy(localFilePath, {resource_type: "video"})

       return true || result

    } catch (error) {
      console.error('Error deleting video:', error);
    }     
}


const destroyCloudImage = async (localFilePath)=>{
  try{
      await cloudinary.uploader.destroy(localFilePath)
      return true
  }catch (error){
    console.error('Error deleting video:', error);
  }
}


const uploadOnClodinary = async (localFilePath)=>{
  try{
      if(!localFilePath) return null

      if(localFilePath.fieldname === "avatar" || localFilePath.fieldname === "coverImage"){
          const localPath = localFilePath.path;
          const response = await cloudinary.uploader.upload(localPath, {
              resource_type: "auto",
                  folder: "videoweb",
                  width: 150,
                  crop: "scale",
          })
          fs.unlinkSync(localFilePath.path);
          return response
      }

          // upload the file on cloudinay
          const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type: "auto",
                  folder: "videoweb",
                  crop: "scale",

          })
      // file has been uploaded successfully
      // console.log("file is uploaded or cloudinary", response.url);
      fs.unlinkSync(localFilePath);
      return response
    }
    catch(error){
      if(localFilePath.fieldname === "avatar" || localFilePath.fieldname === "coverImage"){
      fs.unlinkSync(localFilePath.path) // remove the locally saved temporary file as the upload operation got failed
      }else{
          fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
      }
      return null
  }
}


 export { uploadOnClodinary, destroyCloudVideo, destroyCloudImage }