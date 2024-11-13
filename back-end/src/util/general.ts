import jwt from "jsonwebtoken";
import Users from "../models/UserModel";

const SECRET_KEY: string = process.env.SECRET_KEY || " my_secret";


export const getUserByToken = async (token:string)=>{

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        const userFind = await Users.findById(decoded.userId);
        if(!userFind){
            throw new Error()
        }
       return userFind
    } catch (error) {
       console.error(error)
    }
}