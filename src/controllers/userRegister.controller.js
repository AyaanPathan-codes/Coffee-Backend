import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"

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

})

export default registerUser;