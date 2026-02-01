import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js" 
import { ApiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    //email,fullName,password
    const {email,fullName,password,username} = req.body
    console.log("email :", email),
    console.log("passowrd :", password),
    console.log("username :", username)

    if (
  !fullName?.trim() ||
  !email?.trim() ||
  !password?.trim() ||
  !username?.trim()
) {
  throw new ApiError(400, "All fields are required");
}

   const existedUser =  user.findOne({
      $or: [{email},{username}]
    }) // return 

    if(existedUser){
      throw new ApiError(409,"User already exists")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if(!avatarLocalPath ){{
      throw new ApiError(400,"Avatar and Cover image are required");
    }}


    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
       throw new ApiError(400,"Avatar and Cover image are required");
    }

  const user = await user.create({

    fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),

   })
   
   const createdUser = await user.findById(user._id).select("-password  -refreshToken")

   if(!createdUser){
    throw new ApiError (500,"User registration failed, please try again")
   }

   return res.status(201).json(
    new ApiResponse(201,createdUser,"User registered successfully")
   )
})



export default registerUser;