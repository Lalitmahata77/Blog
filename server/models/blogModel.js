import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true,
        index: true,
        
    },
    content : {
        type : String,
        required : true,
        trim: true,
        index: true,
    },
    tags : [{
        type : String,
        index : true
    }],
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    comment :{
        type : String,
        required : true,
        index : true,
        trim : true
    }

}, {timestamps : true})

const Blog = mongoose.model("Blog", blogSchema)
export default Blog