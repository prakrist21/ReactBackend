import multer from "multer";
import path from "path"
import * as fs from 'fs'
import { Request } from "express";
const storage=multer.diskStorage({
    destination: function(req,file,callback){
        console.log('hello world')
        const destination=path.join(__dirname,"../public/uploads");
        if (!fs.existsSync(destination)){
            fs.mkdirSync(destination,{recursive: true});
        }
        callback(null,destination);
    },
    filename:function(req,file,callback){
        console.log('hello world')
        const filename=new Date().getTime();
        const extension=file.originalname.split('.');

        callback(null,`${filename}.${extension[extension.length-1]}`);
    },
})



const fileFilter=(req:Request,file:Express.Multer.File,callback:any)=>{
    if(file.mimetype=='image/jpg'){
        callback(null,true)
    }
    else{
        callback(new Error("File format not supported"))
    }
}
export const upload=multer({storage:storage,fileFilter:fileFilter,});