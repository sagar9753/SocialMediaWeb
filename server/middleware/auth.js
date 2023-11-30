import jwt from "jsonwebtoken";

export const check_token = async(req,res,next)=>{
    try{
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }

        const verify = jwt.verify(token,process.env.JWT_SEC_KRY);
        req.user = verify;
        next();
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}