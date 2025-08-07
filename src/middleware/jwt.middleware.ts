import { decodeToken } from "@utils/jwt";
import { NextFunction, Response, Request } from "express";

export const jwtMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    console.log("------------------------------------------------------------------------",req.path)
    const publicPath=["/api/auth/login"]
    if (publicPath.includes(req.path)){
        next();
    }
    else{
        console.log(req.headers.authorization)
    console.log(req.path);
    const token=req.headers.authorization?.split(" ")[1] as string;
    if (!token){
        res.status(401).json({
            message: "Unathorized",
            status: false,
        });
    }
   
    console.log(token)
    try{
        const verifiedToken=decodeToken(token)

        // @ts-ignore
        req.user=verifiedToken;
        next();
    }
    catch(error){
        res.status(401).json({
            message: "Unathorized",
            status: false,
        });
    }
    }
    
    
    

}