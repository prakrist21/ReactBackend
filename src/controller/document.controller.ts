
// import { Document } from "@models/Document.model";

import { Document } from "@models/document.model";
import { Request,Response } from "express"
interface DocumentRequest{
    path:string
    original_name:string
    size:number
    mime_type:string

}
export class DocumentController{
    async getDocument(req:Request,res:Response){

        const getAllDocument=await Document.findAll();
        res.send({data: getAllDocument,
        message: "Categories has been fetched successfully.",
        status: true,})
    }

    async saveDocument(req:Request,res:Response){
        const request:DocumentRequest=req.body;
        const newDocument=await Document.create();
        
        newDocument.path=request.path;
        newDocument.original_name=request.original_name;
        newDocument.size=request.size;
        newDocument.mime_type=request.mime_type
        newDocument.save();
        res.send(newDocument);
    }


}

export default new DocumentController();