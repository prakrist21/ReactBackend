
import { Blog } from "@models/blogs.model";
import { Document } from "@models/document.model";
import { PostImage } from "@models/postImage.models";
import { Role } from "@models/role.model";
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
    const path='http://localhost:5000/uploads/'

        const getAllBlog=await Blog.sequelize?.query(`select b.id, b.title,b.slug,b.description,b.hashtag,c.name as categoryName,u.email as userEmail,u.username,
json_agg(concat(:path,d.file_name)) as images from blogs b
inner join categories c on c.id=b.category_id
inner join users u on u.id=b.posted_by
left join post_image pi on pi.post_id=b.id
left join documents d on d.doc_guid=pi.document_id::uuid
group by 1,2,3,4,5,6,7,8;`,{
    type:QueryTypes.SELECT,replacements:{path}
});
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



        const files=req?.files as Express.Multer.File[];

        // files?.map((file)=>{

        // })
        
        for (let i=0;i<files?.length;i++){
            const document=new Document();
            document.size=files[i].size;
            document.mime_type=files[i].mimetype;
            document.original_name=files[i].originalname;
            document.path=files[i].path;
            document.fileName=files[i].filename;
            await document.save();

            const postImage=new PostImage()
            postImage.postId=newBlog.id;
            postImage.documentId=document.guid;
            await postImage.save()   
        }



        res.send({
            message:"Post has been saved",
            status: true,
            data: Role,
        });
    }

}

export default new BlogController();