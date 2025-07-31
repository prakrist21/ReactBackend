
import { Category } from "@models/category.model";
import { Request,Response } from "express"
interface CategoryRequest{
    name:string
    title:string
}
export class CategoryController{
    async getCategory(req:Request,res:Response){

        const getAllCategory=await Category.findAll();
        res.send({data: getAllCategory,
        message: "Categories has been fetched successfully.",
        status: true,})
    }

    async saveCategory(req:Request,res:Response){
        const request:CategoryRequest=req.body;
        const newCategory=await Category.create();
        
        newCategory.name=request.name;
        newCategory.title=request.title;
        newCategory.save();
        res.send(newCategory);
    }   

    // async getCategoryById(req:Request,res:Response){
    //         const roleId=req.params.id;
    //         const getUserById=await User.findByPk(roleId);
    //         res.send({data: getUserById,
    //       message: "Users has been fetched successfully.",
    //       status: true,});
    // }

}

export default new CategoryController();