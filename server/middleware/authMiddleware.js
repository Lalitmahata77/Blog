import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncHandler from "./catchAsyncHandler.js";
import jwt from "jsonwebtoken"
export const isAthenticated = catchAsyncHandler(async(req, res, next)=>{
const {token} = req.cookies;
if (!token) {
    return next(new ErrorHandler("Invalid token", 401))
}
const decoded = jwt.verify(token,process.env.JWT_SECRET)
req.user = await User.findById(decoded.id)
next()
})