
import { Blog } from "@models/blogs.model";
import { Category } from "@models/category.model";
import { Document } from "@models/document.model";
import { PostImage } from "@models/postImage.models";
import { Role } from "@models/role.model";
import { User } from "@models/user.model";
import { UserDetails } from "@models/userDetail.model";
import { Sequelize } from "sequelize-typescript"

const sequelize=new Sequelize({
    dialect: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "Demo",
    logging: true,
    models:[Role,User,UserDetails,Category,Blog,Document,PostImage],
}); 
 
export default sequelize;