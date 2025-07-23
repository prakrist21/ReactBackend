
import { Blog } from "@models/blogs.model";
import { Request,Response } from "express"
import { QueryTypes } from "sequelize";
interface blogRequest{
    slug:string
    title:string
    description: string
    hastag: string
    categoryId: number
    userId: number
}
export class BlogController{
    async getBlog(req:Request,res:Response){

        const getAllBlog=await Blog.findAll();
        res.send({data: getAllBlog,
        message: "Categories has been fetched successfully.",
        status: true,})
    }

    async saveBlog(req:Request,res:Response){
        const request:blogRequest=req.body;
        const newBlog=await Blog.create();
        let slug=request.title.toLowerCase().split(" ").join("-")
        const alreadyExist:any=await Blog.sequelize?.query(`select count(slug) from blogs b where b.slug like :slug`,{
            replacements:{slug:slug+'%'},
            type:QueryTypes.SELECT
        })
        console.log(alreadyExist)
        const counts=parseInt(alreadyExist[0].count)
        if (counts>0){
            slug=slug.concat(`-${+counts+1}`)
        }
        console.log(alreadyExist[0].count)
        newBlog.slug=slug;
        newBlog.title=request.title;
        newBlog.description=request.description;
        newBlog.hashtag=request.hastag;
        newBlog.userId=request.userId;
        newBlog.categoryId=request.categoryId;
        await newBlog.save();
        res.send(newBlog);
    }

}

export default new BlogController();