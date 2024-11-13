import { Request,Response } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken"
const SECRET_KEY:string = process.env.SECRET_KEY || " my_secret"

//GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//LOGIN
export const login = async (req:Request,res:Response)=>{
    const {userName,password} =req.body;
  
    try{
        const findUser = await UserModel.findOne({userName: userName,password:password});
        if(!findUser){
            throw new Error()
        }
        const userId =findUser?._id
        const token = jwt.sign({userId},SECRET_KEY,{expiresIn :"1h"})
        res.status(200).json({user:findUser, token:token})
    }
    catch{
        res.status(400).json("The username or password is incorrect")
    }
    
}

//REGISTER
export const createUser =async (req:Request,res:Response):Promise<void>=>{
    const user =req.body
    const findUserName = await UserModel.findOne({userName: user.userName});
    if(findUserName){
        res.status(400).json({message:"User name already exists"}) 
            return
    }
    try{
    const newUser =  new UserModel ({
        userName :user.userName,
        password:user.password,
        location:user.location,
        organization:user.organization
    } )
    const registedUser = await UserModel.create(newUser)
    res.status(201).json({id: registedUser._id})
    }
    catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}
