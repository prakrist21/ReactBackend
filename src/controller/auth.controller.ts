import { LoginDto } from "@dto/auth.dto";
import { NotFoundException } from "@exception/NotFoundException";
import { User } from "@models/user.model";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { generateToken } from "@utils/jwt";
import { UserDetails } from "@models/userDetail.model";

export class AuthController{
    async login(req:Request,res:Response){
        const loginDot=plainToInstance(LoginDto,req.body)
        const error=await validate(loginDot)
        if (error.length>0){
             res.status(400).json({
                message:"Validation Error",
                errors:error.map((data)=>{
                    return{
                        // field: data.property,
                        // constraints: data.constraints,
                        [data.property]:data.constraints,   
                    };
                }),
            })
        }
        else{
            const user=await User.findOne({
                where:{
                    email:loginDot.email,
                }
            })
            if(!user){
                throw new NotFoundException("user not found")
            }
            const isvalidPassword=await bcrypt.compare(loginDot.password,user.password)
            if(!isvalidPassword){
                throw new NotFoundException("Password did not match");
            }
            const token=generateToken({id:user.id,email:user.email});
            res.send({
                message:"Success",
                token,
            })
        }

    }
    async init(req:Request,res:Response){
        //@ts-ignore
        const user=req.user;
        const currentUser=await User.findOne({
            where:{
                id:user.id
            },
            attributes: {exclude: ["password"]},
            include: [UserDetails],
        })

        // const userDetail=UserDetails.findOne({
        //     where:{
        //         userId:user.id;
        //     }
        // })

        //@ts-ignore
        delete currentUser.password;

        if(!currentUser){
            throw new NotFoundException("User not found")
        }
        res.status(200).send({
            user:currentUser
        })
        console.log(user)
    }
}

export default new AuthController();
