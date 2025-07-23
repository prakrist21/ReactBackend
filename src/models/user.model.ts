import { AutoIncrement, Column, CreatedAt, HasOne, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { UserDetails } from "./userDetail.model";


@Table({
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at"
    
})
export class User extends Model<User>{
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

    @HasOne(()=>UserDetails)
    userDetails!:UserDetails;

}