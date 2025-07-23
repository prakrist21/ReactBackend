import multer from "multer";
import path from "path"
import * as fs from 'fs'
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

export const upload=multer({storage:storage});