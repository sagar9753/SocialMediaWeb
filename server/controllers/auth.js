import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register user
export const register = async(req,res)=>{
    try{
        const{ firstName,lastName,email,password,pic_path,friends,location,occupation} = req.body;
        const user = await User.findOne({email : email});
        if(user)
            return res.status(400).json({ msg : "Email is Already used"});

        const salt = await bcrypt.genSalt();
        const pass_hash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : pass_hash,
            pic_path,
            friends,
            location,
            occupation,
            viewed_profile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000),
        });
        const save_user = await newUser.save();
        res.status(201).json(save_user);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
};

//  login

export const login = async(req,res)=>{
    try{
        const { email,password } = req.body;
        const user = await User.findOne({email : email});
        if(!user)
            return res.status(400).json({ msg : "Invalid email or password"});
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(400).json({ msg : "Invalid email or password"}); 

        const token = jwt.sign({id : user._id},process.env.JWT_SEC_KRY);
        delete user.password;

        res.status(200).json({token,user})
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}
