import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";


@Table({
    tableName: "userrole",
    createdAt: "created_at",
    updatedAt: "updated_at"
    
})
export class UserRole extends Model<UserRole>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id!:number;

    @Column
    email!:string;

    @Column
    username!:string

    @Column
    password!:string;

    @Column({field:'is_active'})
    isActive!:boolean


}