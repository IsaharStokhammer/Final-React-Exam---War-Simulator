import mongoose, { Schema, Document, Types } from "mongoose";
import { IResource, IUser } from "../types/user";

import {ILaunchedRocket} from '../types/lounchedRocket'


const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "User name must be at least 3 characters long"],
    maxlength: [20, "User name must be at most 20 characters long"],
  },
  password: {
    type: String,
    required: true,
  },
  organization: {
    type: String
  },
  location: {
    type: String,
    enum: ["North", "South", "Center", "West Bank", "null"],
  },
  lounchedRockets: {
    type: Array<ILaunchedRocket>,
    default: []
  },
  resources: {
    type: Array<IResource>,
    default: [] 
  }
});

export default mongoose.model<IUser>("User", UserSchema);
