import { AllowNull, AutoIncrement, Column, CreatedAt, ForeignKey, HasOne, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { UserDetails } from "./userDetail.model";
import { Blog } from "./blogs.model";
import { Document } from "./document.model";


@Table({
    tableName: "post_image",
    createdAt: "created_at",
    updatedAt: "updated_at"
    
})
export class PostImage extends Model<PostImage>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id?:number;

    @ForeignKey(()=>Blog)
    @Column({field:"post_id",allowNull:false})
    postId?:string;

    @ForeignKey(()=>Document)
    @Column({field:"document_id",allowNull:false})
    documentId?:string
}