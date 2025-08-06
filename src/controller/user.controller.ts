import { User } from "@models/user.model"
import { UserDetails } from "@models/userDetail.model"
import { Request,Response } from "express"
import * as bcrypt from "bcrypt";
interface UserRequest{
    username:string
    password:string
    isActive:boolean
    email:string
    firstname:string
    middlename:string
    lastname:string
    addredd:string
    phoneNumber:string
    UserId:number
}
export class UserController{
    async getUser(req:Request,res:Response){

        const getAllUser=await User.findAll({include:[UserDetails]});
        res.send({data: getAllUser,
        message: "Users has been fetched successfully.",
        status: true,})
    }

    async saveUser(req:Request,res:Response){
        const request:UserRequest=req.body;
        const newUser=await User.create();
        const newUserDetails=await UserDetails.create();
        newUser.username=request.username;
        const hashpassword = await bcrypt.hash(request.password, 10);
        newUser.password=hashpassword;
        newUser.isActive=request.isActive;
        newUser.email=request.email;
        await  newUser.save();


        newUserDetails.email=request.email;
        newUserDetails.firstname=request.firstname;
        newUserDetails.middlename=request.middlename;
        newUserDetails.addredd=request.addredd;
        newUserDetails.phoneNumber=request.phoneNumber;
        newUserDetails.userId=request.UserId;

        // const hashpassword = await bcrypt.hash(payload.password, 10);
        // user.password = hashpassword;
      await newUserDetails.save()
      res.send({message:"User and userdetails saved", status: true});

        

    }

    async getUserById(req:Request,res:Response){
            const roleId=req.params.id;
            const getUserById=await User.findByPk(roleId);
            res.send({data: getUserById,
          message: "Users has been fetched successfully.",
          status: true,});
    }

}



export default new UserController();