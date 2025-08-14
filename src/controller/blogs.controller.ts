
import { Blog } from "@models/blogs.model";
import { Document } from "@models/document.model";
import { PostImage } from "@models/postImage.models";
import { Role } from "@models/role.model";
import { request, Request,Response } from "express"
import { QueryTypes } from "sequelize";
interface blogRequest{
    slug:string
    title:string
    description: string
    hashtag: string
    category: number
    user: number
}
export class BlogController{
    async getBlog(req:Request,res:Response){
    const path='http://localhost:5000/uploads/'
    console.log(req.query)
    const pageNumber:number=parseInt((req.query.pageNumber as string)||'1')
    const pageSize:number=parseInt(req.query.perPage as string)||10
    const offset=(pageNumber-1)*pageSize;
    console.log(req.query)
    console.log(pageNumber,pageSize,offset)

        const getAllBlog=await Blog.sequelize?.query(`select b.id, b.title,b.slug,b.description,b.hashtag,c.name as categoryName,u.email as userEmail,u.username,
json_agg(concat(:path,d.file_name)) as images from blogs b
left join categories c on c.id=b.category_id
left join users u on u.id=b.posted_by
left join post_image pi on pi.post_id=b.id
left join documents d on d.doc_guid=pi.document_id::uuid
group by 1,2,3,4,5,6,7,8
limit :limit offset :offset;`,{
    type:QueryTypes.SELECT,replacements:{path,limit:pageSize,offset}
});

        const totalPost=await Blog.count()
        res.send({
        message: "Categories has been fetched successfully.",
        status: true,
        data: {item:getAllBlog,count:totalPost}})
    }

    async saveBlog(req:Request,res:Response){
        const request:blogRequest=req.body;
        const newBlog=await Blog.create();
        let slug=request.title.toLowerCase().split(" ").join("-")
        const alreadyExist:any=await Blog.sequelize?.query(`select count(slug) from blogs b where b.slug like :slug`,{
            replacements:{slug:slug+'%'},
            type:QueryTypes.SELECT
        })
        console.log("beore saving post----------------")
        console.log(alreadyExist)
        const counts=parseInt(alreadyExist[0].count)
        if (counts>0){
            slug=slug.concat(`-${+counts+1}`)
        }
        console.log(alreadyExist[0].count)
        newBlog.slug=slug;
        newBlog.title=request.title;
        newBlog.description=request.description;
        newBlog.hashtag=request.hashtag;
        newBlog.userId=request.user;
        newBlog.categoryId=request.category;
        await newBlog.save();

        console.log("post saved -------------------")


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

console.log("image saved-----------------")

        res.send({
            message:"Post has been saved",
            status: true,
            data: Role,
        });
    }

}

export default new BlogController();