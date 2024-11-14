import { Document } from "mongoose";
export interface User {
  userName: string;
  password: string;
}

export interface IUser {
  userName: string;
  password: string;
  organization: IOrganization | string;
  location: "North" | "South" | "Center" | "West Bank" | "null";
  resources: IResource[] | null;
  lounchedRockets?: ILaunchedRocket[] | null;
}

export interface IResource {
  name: string;
  amount: number;
}
export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

export interface CandidateInterface {
  _id?: string;
  name: string;
  image: string;
  votes: number;
}

export interface IOrganization extends Document {
  name: string;
  resourses: {
    name: string;
    amount: number;
  };
  budget: number;
}

export interface ILaunchedRocket {
  name: string;
  timeToHit_in_sec: number;
  status: "Launched" | "Hit" | "Intercepted";
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected";

export interface Iattack {
  attackerUserName: string;
  targetName: string;
  timeToHit_in_sec : number;
  status: "Launched" | "Hit" | "Intercepted";
}
