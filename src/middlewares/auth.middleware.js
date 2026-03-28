import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.utils.js";

import ApiError from "../utils/apiError.utils.js";

import User from "../models/user.model.js";


const protect = asyncHandler (async (req, res,next )=>{
   let token;
   if(req.headers.authorization?.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
   }

   if(!token){
    throw new ApiError(401,"Not authorized ,please login");
   }

   const decoded = jwt.verify(token , process.env.JWT_SECRET);

   const user = await User.findById(decoded._id).select('-password');

   if(!user){
    throw new ApiError(404,"user not found")
   }

   req.user = user;

   next();
});

export default protect;