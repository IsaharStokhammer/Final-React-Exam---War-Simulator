import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "../types/user";



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
});

export default mongoose.model<IUser>("User", UserSchema);
