import Post from "../models/Post.js";
import User from "../models/User.js";

// create function

export const createPost = async(req,res) => {
    try{
        const { userId,description,pic_path} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description ,
            pic_path,
            userPic_path : user.pic_path,
            likes : {},
            comments : []
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post); 
    }
    catch(err){
        res.status(409).json({message : err.message})
    }
}

// Read 

export const getFeedPosts = async(req,res) =>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
}

export const getUserPosts = async(req,res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
}
export const deletePost = async(req,res) => {
    try{
        const {userId,id} = req.params; 
        await Post.deleteOne({_id :id});
        const post = await Post.find({userId});

        res.status(201).json(post);

    }
    catch(err){
        res.status(403).json({message : err.message});
    }
}

// Upadet 

export const likePost = async(req,res) =>{
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId,true); 
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,{likes : post.likes},{new:true}
        );
        res.status(200).json(updatePost); 
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
}
export const doComment = async(req,res) =>{
    try{
        const { id } = req.params;
        const { commUser,comment } = req.body;
        const user = await User.findById(commUser);
        console.log(user,comment,id);
        const post = await Post.findById(id);

        
        await post.comments.push({
            commUser:user,
            comment:comment
        })
        post.save();

        res.status(200).json(post); 
        console.log(post.comments);
    }
    catch(err){
        res.status(404).json({message : err.message});
    }
}