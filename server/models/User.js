import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName :{
            type : String,
            required : true,
            min : 2,
            max : 50
        },
        lastName :{
            type : String,
            required : true,
            min : 2,
            max : 50
        },
        email :{
            type : String,
            required : true,
            unique : true,
            max : 50
        }, 
        password :{
            type : String,
            required : true,
            min : 5
        },
        pic_path :{
            type : String,
            default : "",
        },
        friends : {
            type : Array,  
            default : []
        },
        emailToken:{
            type : String,
        },
        isVerified:{
            type:Boolean,
        },
        location : String,
        occupation : String,
        viewed_profile : Number,
        impressions : Number
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User",userSchema);
export default User;