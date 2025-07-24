import { AutoIncrement, Column,DataType, PrimaryKey,Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Category } from "./category.model";
// import { Model } from "sequelize";


    @Table({
        tableName:'documents',
        createdAt:"created_at",
        updatedAt:"updated_at"
    })
export class Document extends Model<Document>{

    @AutoIncrement
    @PrimaryKey
    @Column

    public guid!:number;

    @Column//({ field: 'path', type: DataType.STRING, unique: true })
    public path!: string;

    @Column({ field: 'original_name', type: DataType.STRING })
    public original_name!: string;

    @Column({ field: 'size', type: DataType.STRING })
    public size!: number;
    
    @Column({ field: 'mime_type', type: DataType.STRING })
    public mime_type!: string;








}