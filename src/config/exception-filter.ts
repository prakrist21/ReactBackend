import { NextFunction, Response,Request } from "express";

export const exceptionHandler=(error:any,req:Request,res:Response,next:NextFunction)=>{
    res.status(error?.statusCode||500).json({
        message:error?.message||'internal server error',
        status: false,
    })

};