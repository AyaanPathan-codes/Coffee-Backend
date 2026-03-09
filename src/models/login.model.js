import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    isLoggedIn : {
        type : Boolean,
        default : false,
    }
},{timestamps:true});