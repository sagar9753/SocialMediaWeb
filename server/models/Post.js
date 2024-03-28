import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        location: String,
        description: String,
        pic_path: String,
        userPic_path: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: [
            {
                commUser:{
                    type:Object,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                }
            }
        ]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;