import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : "sr982729@gmail.com",
        pass : "lgyn tyrr krzk wkop"
    },
    tls:{
        rejectUnauthorized : false
    }
})

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
            emailToken:firstName+email+lastName,
            isVerified:false,
            location,
            occupation,
            viewed_profile : Math.floor(Math.random() * 10000),
            impressions : Math.floor(Math.random() * 10000),
        });
        const save_user = await newUser.save();
        console.log("jjhjjj");
        // send email for verification
        const mailOption = {
            from : ' "Verify your Email" <verifymail@gmail.com> ',
            to : newUser.email,
            subject : 'verifymail -verify your mail',
            html: `<h2>${newUser.firstName} thanks for registration</h2>
                    <h4>Plz verify your mail to continue....</h4>
                    <a href="http://localhost:3001/auth/verify-email?token=${newUser.emailToken}">Verify Your Mail</a>`
        }

        transporter.sendMail(mailOption,(err,info)=>{
            if(err)
                console.log(err);
            else
                console.log("Verification mail is sent to your email account");
        })

        res.status(201).json(save_user);
    }
    catch(err){
        res.status(500).json({error : err.message}); 
    }
};

export const verifyMail = async(req,res)=>{
    try{
        const token = req.query.token
        const user = await User.findOne({emailToken:token})
        if(user){
            user.emailToken = null
            user.isVerified = true
            await user.save()
        }
        else{
            console.log("Email is not verified....");
        }
    }
    catch{
        res.status(501).json({Error : err.message}); 
    }
}
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
