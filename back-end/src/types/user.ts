import { IOrganization } from "../models/OrganizationModel";


export interface IUser {
    userName: string;
    password: string;
    organization: IOrganization | string;
    location: "North" | "South" | "Center" | "West Bank" | "null";
}