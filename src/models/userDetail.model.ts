import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";
import { User } from "./user.model";


@Table({
    tableName: "userdetails",
    createdAt: "created_at",
    updatedAt: "updated_at"
    
})
export class UserDetails extends Model<UserDetails>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id!:number;

    @Column
    email!:string;

    @Column({field:"first_name",type:DataType.STRING(100)})
    firstname!:string

    @Column({field:"middle_name",type:DataType.STRING(100)})
    middlename!:string
   
    @Column({field:"last_name",type:DataType.STRING(100)})
    lastname!:string

    @Column({type:DataType.STRING(250)})
    addredd!:string;

    @Column({field:"Phone_number",type:DataType.STRING(100)})
    phoneNumber!:string

    // Foreign key
    @ForeignKey(()=>User)
    @Column({field:"user_id"})
    userId!:number;

    @BelongsTo(()=>User)
    user!:User
}