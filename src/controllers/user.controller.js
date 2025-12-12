import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import {User} from '../models/user.model.js';
import { uploadImageToCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user data from req body
  const { fullName, email, username, password } = req.body;

  // validation
  if ([fullName, email, username, password].some(field => !field || field.trim() === "")) {
    throw new apiError(400, "All fields are required to register");
  }
 const exitedUser= User.findOne({
    $or: [{ email: email }, { username: username }]
  })

  if(exitedUser){
    throw new apiError(409,"User already exists with this email or username");
  }
  const avatarLocalPath=req.files?.avatar?.[0]?.path;
  const coverImageLocalPath=req.files?.coverImages?.[0]?.path;
  if(!avatarLocalPath){
    throw new apiError(400,"Avatar image is required");
  }
 
  const avatar=await uploadOnCloudinary(avatarLocalPath)
  await uploadOnCloudinary(coverImageLocalPath)
  if(!avatar){
    throw new apiError(500,"Unable to upload avatar image");
  }
  const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url ||'',
    email,
    
    password,
    username:username.toLowerCase()
  })


  // TODO: Add remaining logic here
  // - Check if user exists
  // - Validate username/email
  // - Upload avatar if exists
  // - Hash password
  // - Save user to DB
  // - Return response
 const createdUser= await User.findById(user._id).select('-password  -refreshToken')//no need of password in response
 if(!createdUser){
    throw new apiError(500,"Unable to create user");
 }
 return res.status(201).json(new ApiResponse(200,"User registered successfully",createdUser));
});

export { registerUser };
