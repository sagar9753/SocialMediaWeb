import express from "express";
import {login} from "../controllers/auth.js";

const router = express.Router();

router.post("/register",(req,res)=>{
    res.json({message : req.body});
    console.log(req.body);
})

router.post("/login",login);

export default router; 