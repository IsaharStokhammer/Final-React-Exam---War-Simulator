import { IOrganization } from "../models/OrganizationModel";
import { ILaunchedRocket } from "./lounchedRocket";

import { IResource } from "./resource";



export interface IUser {
    userName: string;
    password: string;
    organization: IOrganization | string;
    location: "North" | "South" | "Center" | "West Bank" | "null";
    resources : IResource[] | null;
    lounchedRockets? : ILaunchedRocket[] | null;

}

export { IResource };
