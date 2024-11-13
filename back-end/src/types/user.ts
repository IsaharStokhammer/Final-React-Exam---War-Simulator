import { IOrganization } from "../models/OrganizationModel";
import { ILaunchedRocket } from "./lounchedRocket";

export interface IResource{
    name : string,
    amount : number
}

export interface IUser {
    userName: string;
    password: string;
    organization: IOrganization | string;
    location: "North" | "South" | "Center" | "West Bank" | "null";
    resources : IResource[] | null;
    lounchedRockets? : ILaunchedRocket[] | null;

}