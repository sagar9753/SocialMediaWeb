import express from "express";
import {login,verifyMail} from "../controllers/auth.js";

const router = express.Router();

router.post("/register",(req,res)=>{
    res.json({message : req.body});
    console.log(req.body);
})

router.post("/login",login);

router.get("/verify-email",verifyMail)

export default router; 