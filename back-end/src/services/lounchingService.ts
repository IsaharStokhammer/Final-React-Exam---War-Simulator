import UserModel from "../models/UserModel";
import { ILaunchedRocket } from "../types/lounchedRocket";
import { IUser } from "../types/user";


export const lounchedRockets = async (user : IUser, rocket: ILaunchedRocket) => { 
    if (!user.resources || !user.resources.find(resource => resource.name === rocket.name
    )) {
        throw new Error("The user does not have the required resource");
    }
    else{
        try{
UserModel.findOneAndUpdate({ userName: user.userName }, { $push: { lounchedRockets: { rocket: rocket } } });
        }
        catch(error){
            console.error(error);
        }
    }

    return ;
}