import { AutoIncrement, Column,DataType, PrimaryKey,Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
// import { Model } from "sequelize";


    @Table({
        tableName:'blogs',
        createdAt:"created_at",
        updatedAt:"updated_at"
    })
export class Blog extends Model<Blog>{

    @AutoIncrement
    @PrimaryKey
    @Column

    public id!:number;

    @Column({ field: 'slug', type: DataType.STRING, unique: true })
    public slug!: string;

    @Column({ field: 'title', type: DataType.STRING })
    public title!: string;

    @Column({ field: 'description', type: DataType.STRING })
    public description!: string;
    
    @Column({ field: 'hashtag', type: DataType.STRING })
    public hashtag!: string;

    @ForeignKey(()=>User)
    @Column({field:"posted_by"})
    userId!:number;


    @BelongsTo(()=>User)
    user!:User
    
    @ForeignKey(()=>User)
    @Column({field:"category_id"})
    categoryId!:number;

    @BelongsTo(()=>User)
    category!:Category






}