import catchAsyncHandler from "../middleware/catchAsyncHandler.js";
import User from "../models/userModel.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const register = catchAsyncHandler(async(req,res)=>{
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(200).json({message : "User already exist"})
    }
    
    if (password.length < 6) {
      return  res.status(400).json({message : "Password must be at least 6 character"})
    }

    const user = new User({
        name,
        email,
        password
    })
    if (user) {
        const token =  sendToken(user, 201, res)
            user.save()
            res.status(200).json({
               _id : user._id,
               name : user.name,
               email : user.email,
               password :user.password,
               token
            })
        } else{
            res.status(400).json({ error: "Invalid user data" });
        }
})

export const login =catchAsyncHandler(async(req, res, next)=>{
    const{email, password} = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email or password", 400))
    }

    const user = await User.findOne({email}).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatch = await user.isPasswordCorrect(password)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

sendToken(user, 201, res)
})

export const logout = catchAsyncHandler(async(req, res, next)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({message : "Logout successfully"})
})

//upload avatar

export const avatar = catchAsyncHandler(async(req, res)=>{
    const avatarResponse = await upload_file(req.body.avatar, "shopit/avatars")
    //remove previous avatar
    if (req?.user?.avatar?.url) {
        await delete_file(req?.user?.avatar?.public_id)
    }
    const user = await User.findByIdAndUpdate(req?.body?._id, {
        avatar : avatarResponse
    })
    res.status(200).json({user})
})


